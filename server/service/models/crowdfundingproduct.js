"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CrowdFundingProduct extends Model {
    static associate(models) {
      CrowdFundingProduct.belongsTo(models.CrowdFunding);
      CrowdFundingProduct.belongsTo(models.User);
    }
  }
  CrowdFundingProduct.init(
    {
      CrowdFundingId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      quantityToBuy: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      paymentStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CrowdFundingProduct",
    }
  );
  return CrowdFundingProduct;
};
