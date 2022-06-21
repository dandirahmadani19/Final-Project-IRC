'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatusTracking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StatusTracking.belongsTo(models.CrowdFunding, {
        foreignKey: 'CrowdFundingId',
      });
    }
  }
  StatusTracking.init(
    {
      CrowdFundingId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'StatusTracking',
    }
  );
  return StatusTracking;
};
