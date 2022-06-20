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
const { sendPushNotif } = require("../helpers/pushNotification");

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
        order: [["startDate", "DESC"]],
      });
      //CRON JOB
      CronJob.schedule(
        "59 23 * * *",
        async () => {
          try {
            const dataJob = await CrowdFunding.findAll({});
            const result = dataJob.map((item) => {
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
            next(error);
          }
        },
        {
          scheduled: true,
          timezone: "Asia/Jakarta",
        }
      );
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
        status: "Pending",
      };

      const dataBalance = await Balance.findOne({
        where: {
          UserId: req.loginfo.id,
        },
      });

      if (dataBalance) {
        const { initialProductPrice, initialQuantity } = req.body;
        const minimumBalance = initialProductPrice * initialQuantity * 0.2;
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
      console.log(err);
      next(err);
    }
  }

  static async verifCrowdFunding(req, res, next) {
    try {
      const CrowdFundingId = +req.params.id;
      const productWeight = +req.body.productWeight;

      const verifDataCrowdFunding = {
        productName: req.body.productName,
        initialProductPrice: +req.body.initialProductPrice,
        initialQuantity: +req.body.initialQuantity,
        manufactureName: req.body.manufactureName,
        linkProduct: req.body.linkProduct,
        status: "pending",
        productImage: req.body.productImage,
        hscode: req.body.hscode,
        expiredDay: +req.body.expiredDay,
      };

      const { targetQuantity, totalProductPrice } = finalPrice(
        verifDataCrowdFunding.initialProductPrice,
        productWeight
      );

      const finalProductPrice = Math.ceil(totalProductPrice / targetQuantity);

      const verifiedCrowdFunding = await CrowdFunding.update(
        {
          ...verifDataCrowdFunding,
          targetQuantity,
          finalProductPrice,
          currentQuantity: verifDataCrowdFunding.initialQuantity,
        },
        { where: { id: CrowdFundingId }, returning: true }
      );
      const dataSubmit = verifiedCrowdFunding[1][0];
      const data = {
        hscode: dataSubmit.hscode,
        productName: dataSubmit.productName,
        targetQuantity: dataSubmit.targetQuantity,
        finalProductPrice: dataSubmit.finalProductPrice,
        productImage: dataSubmit.productImage,
        currentQuantity: dataSubmit.currentQuantity,
        expiredDay: dataSubmit.expiredDay,
      };

      const notifPayload = {
        title: "Submission Accepted",
        body: "Your submission crowd funding has been verified. Please complete your payment !",
        data: { screen: "ConfirmationSubmit", data },
      };

      if (verifiedCrowdFunding[0]) {
        sendPushNotif(
          [
            "ExponentPushToken[_YVlfiB-tM6Y64hANSXml0]",
            "ExponentPushToken[LrpW_1OELUN8zPf8D3VmHi]",
            "ExponentPushToken[pToQipDEWHZagTFFdfCjmU]",
            "ExponentPushToken[RkSS6NDnv0yZ1YPneQIqbz]",
          ],
          notifPayload
        );
      }

      res.status(200).json({
        message: "Crowd Funding verified, waiting approval from User",
        data: verifiedCrowdFunding[1][0],
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async approvalCrowdFunding(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const CrowdFundingId = req.params.id;
      const dataOpenCrowdFunding = {
        status: "Open",
        startDate: new Date(),
      };

      const crowdFunding = await CrowdFunding.findOne(
        {
          where: { id: CrowdFundingId },
        },
        { transaction: t }
      );

      const needToPay =
        crowdFunding.currentQuantity * crowdFunding.finalProductPrice;

      const currentBalance = await Balance.findOne(
        {
          where: { UserId: req.loginfo.id },
        },
        { transaction: t }
      );

      let currentAmount = currentBalance.amount;

      currentAmount -= needToPay;
      await Balance.update(
        {
          amount: currentAmount,
        },
        { where: { UserId: req.loginfo.id }, returning: true },
        { transaction: t }
      );

      await CrowdFunding.update(
        {
          status: dataOpenCrowdFunding.status,
          startDate: dataOpenCrowdFunding.startDate,
        },
        { where: { id: CrowdFundingId }, returning: true },
        { transaction: t }
      );

      await t.commit();

      res.status(200).json({
        message: "Crowd Funding success to open",
      });
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
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

  // GET DATA DARI TABEL CROWDFUNDING PRODUCT
  static async getAllCrowdFundingProduct(req, res, next) {
    try {
      const data = await CrowdFundingProduct.findAll({});
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getAllHistoryCrowdFunding(req, res, next) {
    try {
      const id = req.loginfo.id;
      const data = await CrowdFunding.findAll({
        where: {
          UserId: id,
        },
        attributes: [
          "id",
          "productName",
          "targetQuantity",
          "finalProductPrice",
          "status",
          "currentQuantity",
          "productImage",
          "initialQuantity",
          "expiredDay",
          "hscode",
          "createdAt",
        ],
        include: [
          {
            model: CrowdFundingProduct,
            attributes: ["totalPrice", "quantityToBuy"],
            include: [
              {
                model: User,
                attributes: ["firstName", "lastName"],
              },
            ],
          },
          {
            model: User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
        ],
      });

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAllHistoryCrowdFundingById(req, res, next) {
    try {
      const id = req.loginfo.id;
      const data = await CrowdFundingProduct.findOne({
        where: {
          UserId: id,
        },
        include: [
          {
            model: CrowdFunding,
            include: [
              {
                model: User,
                attributes: { exclude: ["password"] },
              },
              {
                model: CrowdFundingProduct,
                include: [
                  {
                    model: User,
                    attributes: { exclude: ["password"] },
                  },
                ],
              },
            ],
          },
        ],
      });

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = CrowdFundingController;
