const e = require("express");
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
      next(err);
    }
  }

  static async joincrowdfunding(req, res, next) {
    const t = await sequelize.transaction()
    try {
      const { id } = req.params
      const { quantityToBuy, totalPrice, paymentStatus } = req.body
      const { targetQuantity, currentQuantity } = await CrowdFunding.findByPk(id)
      let updatequantity;
      const sumQty = targetQuantity - currentQuantity
      if (+quantityToBuy > sumQty) {
        throw { name: "QTY_EXCEEDED" }
      }
      const createQty = await CrowdFundingProduct.create({
        CrowdFundingId: id,
        UserId: 1,
        quantityToBuy,
        totalPrice,
        paymentStatus
      }, { transaction: t })
      
      const nUpdated = await CrowdFunding.update({
        currentQuantity: createQty.quantityToBuy + currentQuantity
      }, {
        where: {
          id
        }
      }, { transaction: t })

      const { currentQuantity: nowQuantity, targetQuantity: target, initialQuantity: initial } = await CrowdFunding.findByPk(id)
      if (nowQuantity === target) {
        await CrowdFunding.update({
          status: "Success"
        }, {
          where: {
            id
          }
        }, { transaction: t })
      }
      await t.commit()

      //update currentQuantity
      //push notif ke admincms
      //GW MAU KASIH PUSH NOTIF KE YANG JOIN

      res.status(200).json({
        message: "success join crowdfunding"
      })
    } catch (err) {
      next(err)
      t.rollback()
    }

  }
}

module.exports = CrowdFundingController
