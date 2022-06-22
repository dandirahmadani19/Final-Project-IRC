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
const { getRelevantToken } = require("../redisconfig/redismodel");

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
      const dataJob = await CrowdFunding.findAll({});
      const result = dataJob.map((item) => {
        if (
          item.expiredDay > 0 &&
          item.status === "Open" &&
          item.startDate !== null
        ) {
          const datadate = expiredDate(item.expiredDay, item.startDate);
          const dateNow = new Date().toLocaleString().split(",")[0];
          console.log(dateNow);
          console.log(datadate);
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
      //CRON JOB
      CronJob.schedule(
        "30 00 * * *",
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
                const dateNow = new Date().toLocaleString().split(",")[0];
                console.log(dateNow);
                console.log(datadate);
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
        status: "Pending",
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
        priority: "high",
      };
      const expoToken = await getRelevantToken([dataSubmit.UserId]);
      if (verifiedCrowdFunding[0]) {
        sendPushNotif(expoToken, notifPayload);
      }

      res.status(200).json({
        message: "Crowd Funding verified, waiting approval from User",
        data: verifiedCrowdFunding[1][0],
      });
    } catch (error) {
      next(error);
    }
  }

  static async approvalCrowdFunding(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const CrowdFundingId = req.params.id;

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
      if (currentAmount >= 0) {
        await Balance.update(
          {
            amount: currentAmount,
          },
          { where: { UserId: req.loginfo.id }, returning: true },
          { transaction: t }
        );

        await CrowdFunding.update(
          {
            status: "Open",
            startDate: new Date(),
          },
          { where: { id: CrowdFundingId }, returning: true },
          { transaction: t }
        );
      }

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
      const { quantityToBuy, totalPrice } = req.body;
      const { currentQuantity } = await CrowdFunding.findByPk(id);
      const data = await CrowdFundingProduct.findOne(
        {
          where: {
            [Op.and]: [
              {
                CrowdFundingId: +id,
              },
              {
                UserId: +req.loginfo.id,
              },
            ],
          },
        },
        { transaction: t }
      );

      if (data) {
        await CrowdFundingProduct.update(
          {
            quantityToBuy: +data.quantityToBuy + +quantityToBuy,
            totalPrice: +data.totalPrice + +totalPrice,
          },
          {
            where: {
              [Op.and]: [
                {
                  CrowdFundingId: +id,
                },
                {
                  UserId: +req.loginfo.id,
                },
              ],
            },
          }
        );
      } else {
        await CrowdFundingProduct.create(
          {
            CrowdFundingId: id,
            UserId: req.loginfo.id,
            quantityToBuy,
            totalPrice,
            paymentStatus: "Success",
          },
          { transaction: t }
        );
      }

      const { amount } = await Balance.findOne(
        {
          where: {
            UserId: req.loginfo.id,
          },
        },
        { transaction: t }
      );

      const newAmount = amount - totalPrice;

      await Balance.update(
        {
          amount: newAmount,
        },
        {
          where: {
            UserId: req.loginfo.id,
          },
        },
        { transaction: t }
      );

      await CrowdFunding.update(
        {
          currentQuantity: +quantityToBuy + +currentQuantity,
        },
        {
          where: {
            id,
          },
        },
        { transaction: t }
      );

      const { currentQuantity: nowQuantity, targetQuantity: target } =
        await CrowdFunding.findByPk(id);
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

      const response = await CrowdFundingProduct.findAll({
        where: { CrowdFundingId: req.params.id },
        attributes: ["UserId"],
      });

      const UserId = response.map((e) => e.UserId);
      const tokens = await getRelevantToken(UserId);

      const notifPayload = {
        title: "Notification",
        body: "New User Has Joined",
        data: { screen: "HistorySubmit", data: {} },
        priority: "high",
      };

      sendPushNotif(tokens, notifPayload);

      const tokensSubmit = await getRelevantToken([req.loginfo.id]);

      const notifPayloadSubmit = {
        title: "Notification",
        body: "New User Has Joined",
        data: { screen: "HistoryJoin", data: {} },
        priority: "high",
      };

      sendPushNotif(tokensSubmit, notifPayloadSubmit);
      // //update currentQuantity
      // //push notif ke admincms
      // //GW MAU KASIH PUSH NOTIF KE YANG JOIN

      res.status(200).json({
        status: true,
        message: "success join crowdfunding",
      });
    } catch (err) {
      console.log(err);
      next(err);
      t.rollback();
    }
  }

  static async detailCrowdFund(req, res, next) {
    try {
      const id = req.params.id;
      const dataCF = await detailCrowdFunding.findOne({
        where: { id },
        attributes: {
          exclude: [
            "initialProductPrice",
            "initialQuantity",
            "createdAt",
            "updatedAt",
          ],
        },
      });
      res.status(200).json(dataCF);
    } catch (error) {
      next(error);
    }
  }

  static async allCrowdFundAdmin(req, res, next) {
    try {
      const listCF = await adminCrowdFunding.findAll({
        attributes: {
          exclude: [
            "initialProductPrice",
            "initialQuantity",
            "createdAt",
            "updatedAt",
          ],
        },
      });
      res.status(200).json(listCF);
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
          "startDate",
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
      next(error);
    }
  }

  static async getAllHistoryCrowdFundingByUserJoin(req, res, next) {
    try {
      const id = req.loginfo.id;
      let data = await CrowdFundingProduct.findAll({
        where: {
          UserId: id,
        },
        include: [
          {
            model: CrowdFunding,
            attributes: [
              "id",
              "productName",
              "targetQuantity",
              "finalProductPrice",
              "status",
              "currentQuantity",
              "productImage",
              "initialQuantity",
              "startDate",
              "expiredDay",
              "hscode",
              "createdAt",
            ],
            include: {
              model: User,
              attributes: ["firstName", "lastName"],
            },
          },
          {
            model: User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
        ],
      });
      // data = data.map((item) => {
      //   return item.CrowdFunding;
      // });

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = CrowdFundingController;
