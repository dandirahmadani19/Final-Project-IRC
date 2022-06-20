"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CrowdFunding extends Model {
    static associate(models) {
      CrowdFunding.belongsTo(models.User);
      CrowdFunding.hasMany(models.CrowdFundingProduct);
    }
  }
  CrowdFunding.init(
    {
      productName: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      targetQuantity: DataTypes.INTEGER,
      initialProductPrice: DataTypes.INTEGER,
      finalProductPrice: DataTypes.INTEGER,
      manufactureName: DataTypes.STRING,
      linkProduct: DataTypes.STRING,
      status: DataTypes.STRING,
      currentQuantity: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      productImage: DataTypes.STRING,
      initialQuantity: DataTypes.INTEGER,
      expiredDay: DataTypes.INTEGER,
      hscode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CrowdFunding",
    }
  );
  return CrowdFunding;
};
