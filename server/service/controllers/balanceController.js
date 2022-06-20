const { Balance } = require("../models");

class BalanceController {
  static async getBalance(req, res) {
    try {
      //   const { id } = req.loginfo;
      const balance = await Balance.findAll();
      res.status(200).json(balance);
    } catch (error) {
      console.log(error);
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
}

module.exports = BalanceController;
