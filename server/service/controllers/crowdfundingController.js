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

  static async targetQuantity(req, res, next) {
    try {
      const t = await sequelize.transaction()
      const { id } = req.params
      const { quantityToBuy, totalPrice, paymentStatus } = req.body
      const { targetQuantity, initialQuantity, currentQuantity } = await CrowdFunding.findByPk(id)
      let sumQty;
      let updatequantity;
      if (currentQuantity === 0) {
        sumQty = targetQuantity - (initialQuantity + currentQuantity)
      } else {
        sumQty = targetQuantity - currentQuantity
      }

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
      if (currentQuantity === 0) {
        updatequantity = initialQuantity + createQty.quantityToBuy
      } else {
        updatequantity = currentQuantity + createQty.quantityToBuy
      }
      const nUpdated = await CrowdFunding.update({
        currentQuantity: updatequantity
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
