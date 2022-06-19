const e = require("express");
const { Op } = require("sequelize");
const { CrowdFunding, CrowdFundingProduct, sequelize, User } = require("../models");
const expiredDate = require("../helpers/expiredDate");
const CronJob = require('node-cron')

class CrowdFundingController {
  static async getAllCrowdFunding(req, res, next) {
    try {
      const data = await CrowdFunding.findAll({
        where: {
          [Op.or]: [{ status: 'Open' }, { status: 'Failed' }, { status: 'Success' }]
        },
        include: [{
          model: CrowdFundingProduct,
          attributes: {
            exclude: ['CrowdFundingId', 'quantityToBuy', 'totalPrice', 'paymentStatus']
          },
        },
        {
          model: User,
          attributes: {
            exclude: ['email', 'password', 'phoneNumber', 'address']
          }
        }],
      })
      res.status(200).json(data)
    } catch (error) {
      next(error);
    }
  }


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

  static async expiredTime(req, res, next) {
    try {
      CronJob.schedule('59 23 * * *', async () => {
        try {
          const data = await CrowdFunding.findAll({})
          const result = data.map(item => {
            if (item.expiredDay > 0 && item.status === "Open" && item.startDate !== null) {
              const datadate = expiredDate(item.expiredDay, item.startDate)
              const dateNow = new Date().toISOString().split('T')[0]
              if (datadate === dateNow) {
                CrowdFunding.update({
                  status: "Failed",
                }, { where: { id: item.id } })
              }

            }
          })
        } catch (error) {
          console.log(error);
        }
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CrowdFundingController
