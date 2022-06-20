const e = require("express");

const { Op } = require("sequelize");
const {
  CrowdFunding,
  CrowdFundingProduct,
  sequelize,
  User,
  Balance,
} = require("../models");

const expiredDate = require("../helpers/expiredDate");
const CronJob = require("node-cron");
const finalPrice = require("../helpers/helperFinalPrice");

class CrowdFundingController {
  static async getAllCrowdFunding(req, res, next) {
    try {
      const data = await CrowdFunding.findAll({
        where: {
          [Op.or]: [
            { status: "Open" },
            { status: "Failed" },
            { status: "Success" },
          ],
        },
        include: [
          {
            model: CrowdFundingProduct,
            attributes: {
              exclude: [
                "CrowdFundingId",
                "quantityToBuy",
                "totalPrice",
                "paymentStatus",
              ],
            },
          },
          {
            model: User,
            attributes: {
              exclude: ["email", "password", "phoneNumber", "address"],
            },
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createCrowdFunding(req, res, next) {
    try {
      let code = 200;
      let message = "";
      let data = {};

      const inputDataCrowdFunding = {
        UserId: req.loginfo.id,
        productName: req.body.productName,
        initialProductPrice: req.body.initialProductPrice,
        initialQuantity: req.body.initialQuantity,
        manufactureName: req.body.manufactureName,
        linkProduct: req.body.linkProduct,
        status: "pending",
      };

      const dataBalance = await Balance.findOne({
        where: {
          UserId: req.body.UserId,
        },
      });

      if (dataBalance) {
        const { initialProductPrice } = req.body;
        const minimumBalance = initialProductPrice * 0.2;
        if (dataBalance.amount < minimumBalance) {
          code = 400;
          message = "Balance is not enough";
        } else {
          const newCrowdFunding = await CrowdFunding.create(
            inputDataCrowdFunding
          );
          code = 201;
          message = "CrowdFunding created";
          data = newCrowdFunding;
        }
      } else {
        code = 400;
        message = "Balance is not enough";
      }

      res.status(code).json({
        message: message,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async verifCrowdFunding(req, res, next) {
    try {
      const CrowdFundingId = req.params.id
      const productWeight = req.body.productWeight

      const verifDataCrowdFunding = {
        productName: req.body.productName,
        UserId: req.loginfo.id,
        initialProductPrice: req.body.initialProductPrice,
        initialQuantity: req.body.initialQuantity,
        manufactureName: req.body.manufactureName,
        linkProduct: req.body.linkProduct,
        status: "pending",
        productImage: req.body.productImage,
        hscode: req.body.hscode,
        expiredDay: req.body.expiredDay,
        hscode: req.body.hscode
      }

      const {targetQuantity, totalProductPrice} = finalPrice(verifDataCrowdFunding.initialProductPrice, productWeight)

      const verifiedCrowdFunding = await CrowdFunding.update({
        ...verifDataCrowdFunding,
        targetQuantity,
        finalProductPrice : totalProductPrice / targetQuantity,
        currentQuantity: verifDataCrowdFunding.initialQuantity
      }, {where: {id: CrowdFundingId}, returning: true})

      res.status(200).json({
        message: 'Crowd Funding verified, waiting approval from User',
        data: verifiedCrowdFunding[1][0]
      })
    } catch (error) {
      next(error)
    }
  }

  static async approvalCrowdFunding(req, res, next) {
    try {
      const CrowdFundingId = req.params.id
      const dataOpenCrowdFunding = {
        status : 'open',
        startDate : new Date().toISOString().split("T")[0]
      }

      const openedCrowdFunding = await CrowdFunding.update(
        {
          status: dataOpenCrowdFunding.status,
          startDate: dataOpenCrowdFunding.startDate
        }, 
        {where: {id: CrowdFundingId}, returning: true}
      )
      res.status(200).json({
        message: 'Crowd Funding success to open',
        data: openedCrowdFunding[1][0]
      })
    } catch (error) {
      next(error)
    }
  }

  static async joincrowdfunding(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { quantityToBuy, totalPrice, paymentStatus } = req.body;
      const { targetQuantity, currentQuantity } = await CrowdFunding.findByPk(
        id
      );
      const sumQty = targetQuantity - currentQuantity;
      if (+quantityToBuy > sumQty) {
        throw { name: "QTY_EXCEEDED" };
      }
      const createQty = await CrowdFundingProduct.create(
        {
          CrowdFundingId: id,
          UserId: 1,
          quantityToBuy,
          totalPrice,
          paymentStatus,
        },
        { transaction: t }
      );

      const nUpdated = await CrowdFunding.update(
        {
          currentQuantity: createQty.quantityToBuy + currentQuantity,
        },
        {
          where: {
            id,
          },
        },
        { transaction: t }
      );

      const {
        currentQuantity: nowQuantity,
        targetQuantity: target,
        initialQuantity: initial,
      } = await CrowdFunding.findByPk(id);
      if (nowQuantity === target) {
        await CrowdFunding.update(
          {
            status: "Success",
          },
          {
            where: {
              id,
            },
          },
          { transaction: t }
        );
      }
      await t.commit();

      //update currentQuantity
      //push notif ke admincms
      //GW MAU KASIH PUSH NOTIF KE YANG JOIN

      res.status(200).json({
        message: "success join crowdfunding",
      });
    } catch (err) {
      next(err);
      t.rollback();
    }
  }

  static async expiredTime(req, res, next) {
    try {
      CronJob.schedule("59 23 * * *", async () => {
        try {
          const data = await CrowdFunding.findAll({});
          const result = data.map((item) => {
            if (
              item.expiredDay > 0 &&
              item.status === "Open" &&
              item.startDate !== null
            ) {
              const datadate = expiredDate(item.expiredDay, item.startDate);
              const dateNow = new Date().toISOString().split("T")[0];
              if (datadate === dateNow) {
                CrowdFunding.update(
                  {
                    status: "Failed",
                  },
                  { where: { id: item.id } }
                );
              }
            }
          });
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CrowdFundingController;
