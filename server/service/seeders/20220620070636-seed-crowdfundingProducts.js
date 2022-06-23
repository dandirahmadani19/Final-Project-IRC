"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const crowdFundingProducts = [
      {
        CrowdFundingId: 1,
        UserId: 3,
        quantityToBuy: 20,
        totalPrice: 2500000,
        paymentStatus: "Success",
        createdAt: "2022-06-20T16:14:16.940Z",
        updatedAt: "2022-06-20T16:14:16.940Z",
      },
      {
        CrowdFundingId: 1,
        UserId: 4,
        quantityToBuy: 50,
        totalPrice: 6250000,
        paymentStatus: "Success",
        createdAt: "2022-06-20T16:14:16.940Z",
        updatedAt: "2022-06-20T16:14:16.940Z",
      },
      {
        CrowdFundingId: 3,
        UserId: 1,
        quantityToBuy: 10,
        totalPrice: 2320000,
        paymentStatus: "Success",
        createdAt: "2022-06-20T16:14:16.940Z",
        updatedAt: "2022-06-20T16:14:16.940Z",
      },
      {
        CrowdFundingId: 3,
        UserId: 3,
        quantityToBuy: 15,
        totalPrice: 3480000,
        paymentStatus: "Success",
        createdAt: "2022-06-20T16:14:16.940Z",
        updatedAt: "2022-06-20T16:14:16.940Z",
      },
      {
        CrowdFundingId: 3,
        UserId: 4,
        quantityToBuy: 5,
        totalPrice: 1160000,
        paymentStatus: "Success",
        createdAt: "2022-06-20T16:14:16.940Z",
        updatedAt: "2022-06-20T16:14:16.940Z",
      },
      // {
      //   CrowdFundingId: 5,
      //   UserId: 4,
      //   quantityToBuy: 500,
      //   totalPrice: 3250000,
      //   paymentStatus: "Success",
      //   createdAt: "2022-06-06T16:14:16.940Z",
      //   updatedAt: "2022-06-06T16:14:16.940Z",
      // },
      // {
      //   CrowdFundingId: 5,
      //   UserId: 2,
      //   quantityToBuy: 600,
      //   totalPrice: 3900000,
      //   paymentStatus: "Success",
      //   createdAt: "2022-06-06T16:14:16.940Z",
      //   updatedAt: "2022-06-06T16:14:16.940Z",
      // },
    ];
    await queryInterface.bulkInsert(
      "CrowdFundingProducts",
      crowdFundingProducts,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CrowdFundingProducts", null, {});
  },
};
