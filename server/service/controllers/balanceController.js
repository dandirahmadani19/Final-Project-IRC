const {
  Balance,
  CrowdFunding,
  CrowdFundingProduct,
  User,
  sequelize,
} = require("../models");

class BalanceController {
  static async getBalance(req, res) {
    try {
      //   const { id } = req.loginfo;
      const balance = await Balance.findAll();
      res.status(200).json(balance);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getBalanceByUserId(req, res) {
    try {
      const { id } = req.loginfo;
      const { totalPrice } = req.params;
      const { amount } = await Balance.findOne({
        where: {
          UserId: id,
        },
        attributes: ["amount"],
      });
      if (+amount >= +totalPrice) {
        res.status(200).json({ isEnough: true });
      } else {
        res.status(200).json({ isEnough: false });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async refundBalance(req, res) {
    const t = await sequelize.transaction();
    try {
      const id = req.params.id;
      const failedCF = await CrowdFunding.findOne(
        {
          where: { id },
          attributes: [
            "UserId",
            "productName",
            "targetQuantity",
            "finalProductPrice",
            "status",
            "currentQuantity",
            "initialQuantity",
            "startDate",
            "expiredDay",
            "hscode",
          ],
          order: [["UserId", "ASC"]],
          include: [
            {
              model: CrowdFundingProduct,
              attributes: ["totalPrice", "UserId"],
            },
            {
              model: User,
              attributes: ["id"],
              include: [
                {
                  model: Balance,
                  attributes: ["amount"],
                },
              ],
            },
          ],
        },
        { transaction: t }
      );

      const userJoinCF = failedCF.dataValues.CrowdFundingProducts.map(
        (e) => e.UserId
      );

      const amountJoinCF = failedCF.dataValues.CrowdFundingProducts.map(
        (e) => e.totalPrice
      );

      console.log(userJoinCF, amountJoinCF);
      const preBalance = await Balance.findAll(
        {
          where: { id: userJoinCF },
          attributes: ["amount"],
          order: [["UserId", "ASC"]],
        },
        { transaction: t }
      );

      const pascaAmountJoinCF = preBalance.map(
        (e, i) => e.dataValues.amount + amountJoinCF[i]
      );
      console.log(pascaAmountJoinCF);

      for (let i = 0; i < userJoinCF.length; i++) {
        await Balance.update(
          { amount: pascaAmountJoinCF[i] },
          { where: { UserId: userJoinCF[i] } },
          { transaction: t }
        );
      }

      const totalPriceUserWhoSubmit =
        failedCF.dataValues.initialQuantity *
        failedCF.dataValues.finalProductPrice;
      const pascaAmountUserWhoSubmit = failedCF.dataValues.User.Balance.amount;

      const update = await Balance.update(
        { amount: pascaAmountUserWhoSubmit + totalPriceUserWhoSubmit },
        { where: { UserId: failedCF.dataValues.UserId } },
        { transaction: t }
      );

      if (update) {
        userJoinCF.push(failedCF.dataValues.UserId);
        const tokens = await getRelevantToken(userJoinCF);

        const notifPayload = {
          title: "Notification",
          body: "Your balance success to refund, please check now",
          data: { screen: "Home", data: {} },
          priority: "high",
        };

        sendPushNotif(tokens, notifPayload);
      }

      await t.commit();
      res.status(200).json({
        message: "Successfully refund balance to each user",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
      t.rollback();
    }
  }
}

module.exports = BalanceController;
