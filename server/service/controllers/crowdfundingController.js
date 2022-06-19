const e = require("express");
const { CrowdFunding, CrowdFundingProduct, sequelize } = require("../models");
const expiredDate = require("../helpers/expiredDate");
const CronJob = require("node-cron");

class CrowdFundingController {
  static async create(req, res, next) {
    try {
      const inputDataCrowdFunding = {
        UserId: req.body.UserId,
        productName: req.body.productName,
        targetQuantity: req.body.targetQuantity,
        initialProductPrice: req.body.initialProductPrice,
        initialQuantity: req.body.initialQuantity,
        expiredDay: req.body.expiredDay,
        manufactureName: req.body.manufactureName,
        linkProduct: req.body.linkProduct,
        status: "pending",
      };

      const newCrowdFunding = await CrowdFunding.create(inputDataCrowdFunding);

      res.status(200).json({
        message: "success create crowdfunding",
        data: newCrowdFunding,
      });
    } catch (err) {
      next(err);
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
      CronJob.schedule("25 14 * * *", async () => {
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
