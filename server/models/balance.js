"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Balance extends Model {
    static associate(models) {
      Balance.belongsTo(models.User);
    }
  }
  Balance.init(
    {
      UserId: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Balance",
    }
  );
  return Balance;
};
