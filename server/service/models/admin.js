'use strict';
const { Model } = require('sequelize');
const { passwordEncryptor } = require('../helpers/helperBcrypt');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      // define association here
    }
  }
  Admin.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Admin',
    }
  );
  Admin.beforeCreate((instance, option) => {
    instance.password = passwordEncryptor(instance.password);
  });
  return Admin;
};
