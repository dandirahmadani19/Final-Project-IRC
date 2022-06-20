const { Balance } = require('../models');

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
      const { userId } = req.params;
      const balance = await Balance.findOne({
        where: {
          UserId: id,
        },
      });
      res.status(200).json(balance);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = BalanceController;
