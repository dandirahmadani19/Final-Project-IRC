"use strict";
const { Model } = require("sequelize");
const { passwordEncryptor } = require("../helpers/helperBcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Balance);
      User.hasMany(models.CrowdFunding);
      User.hasMany(models.CrowdFundingProduct);
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "First Name is required" },
          notEmpty: { args: true, msg: "First Name is required" },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "Last Name is required" },
          notEmpty: { args: true, msg: "Last Name is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { args: true, msg: "email must be in email format" },
          notNull: { args: true, msg: "email is required" },
          notEmpty: { args: true, msg: "email is required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: "password is required" },
          notEmpty: { args: true, msg: "password is required" },
          len: {
            args: [5, 10],
            msg: "password must be between 5 and 10 characters",
          },
        },
      },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((instance, option) => {
    instance.password = passwordEncryptor(instance.password);
  });
  return User;
};
