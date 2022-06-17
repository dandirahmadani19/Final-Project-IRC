const { CrowdFunding } = require('../models');

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

      const newCrowdfunding = 
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
