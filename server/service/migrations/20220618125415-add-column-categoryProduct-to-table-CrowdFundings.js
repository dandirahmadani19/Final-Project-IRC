"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "CrowdFundings",
      "categoryProduct",
      Sequelize.STRING
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("CrowdFundings", "categoryProduct", {});
  },
};
