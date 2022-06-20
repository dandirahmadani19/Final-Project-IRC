"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const balanceUsers = [
      {
        UserId: 1,
        amount: 8000000,
      },
      {
        UserId: 2,
        amount: 4000000,
      },
      {
        UserId: 3,
        amount: 5000000,
      },
      {
        UserId: 4,
        amount: 5000000,
      },
    ];
    await queryInterface.bulkInsert("Balances", balanceUsers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Balances", null, {});
  },
};
