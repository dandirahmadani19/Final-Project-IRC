const { CrowdFunding, CrowdFundingProduct, sequelize } = require("../models");


class CrowdFundingController {
  static async create(req, res, next) {
    try {
      const {
        productName,
        targetQuantity,
        initialProductPrice,
        initialQuantity,
        expiredDay,
        manufactureName,
        linkProduct,
        imageProduct,
      } = req.body;

      const newCrowdfunding = CrowdFunding.create({
        productName,
        targetQuantity,
        initialProductPrice,
        initialQuantity,
        expiredDay,
        manufactureName,
        linkProduct,
        imageProduct,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async targetQuantity(req, res, next) {
    try {
      const t = await sequelize.transaction()
      const { id } = req.params
      const {quantityToBuy, totalPrice, paymentStatus } = req.body
      const { currentQuantity, targetQuantity } = await CrowdFunding.findByPk(id)
      const sumQty = targetQuantity - currentQuantity 
      if (+quantityToBuy > sumQty) {
        throw {name :  "QTY_EXCEEDED"}
      }
      //update currentQuantity
      const createQty = await CrowdFundingProduct.create({
        CrowdFundingId : id,
        UserId : 1,
        quantityToBuy,
        totalPrice,
        paymentStatus
      }, {transaction : t})
      
      const nUpdated = await CrowdFunding.update({
        currentQuantity: currentQuantity + (+quantityToBuy)
      }, {
        where: {
          id: id
        }
      }, {transaction : t})
      const { currentQuantity: nowQuantity, targetQuantity : target } = await CrowdFunding.findByPk(id)
      if(nowQuantity === target) {
        await CrowdFunding.update({
          status: "Success"
        },{
          where: {
            id
          }
        }, {transaction : t})
      }
      await t.commit()
      //push notif ke admincms
      //GW MAU KASIH PUSH NOTIF KE YANG JOIN
      res.status(200).json({
        message: "success join crowdfunding"
      })
    } catch (err) {
      t.rollback()
      next(err)
    }

  }
}

module.exports = CrowdFundingController
