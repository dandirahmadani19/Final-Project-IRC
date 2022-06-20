"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("CrowdFundings", "hscode", Sequelize.STRING);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("CrowdFundings", "hscode");
  },
};
