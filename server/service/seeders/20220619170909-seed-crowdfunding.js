"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const crowdfunding = [
      {
        productName:
          "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
        UserId: 1,
        targetQuantity: 1000,
        initialProductPrice: 100000,
        finalProductPrice: 125000,
        manufactureName: "Dongyang Huanyao Industry And Trade Co",
        linkProduct:
          "https://indonesian.alibaba.com/p-detail/Fitness-1600249994724.html?spm=a27aq.14175334.4.1.c0817df4ll96H6",
        status: "Open",
        currentQuantity: 100,
        startDate: "2022-06-19T16:14:16.940Z",
        productImage:
          "https://s.alicdn.com/@sc04/kf/H8d66d54811d44603a199cfbcf6ac9439r.jpg_960x960.jpg",
        initialQuantity: 100,
        expiredDay: 10,
        hscode: "62111100",
        createdAt: "2022-06-18T16:14:16.940Z",
        updatedAt: "2022-06-18T16:14:16.940Z",
      },
    ];
    await queryInterface.bulkInsert("CrowdFundings", crowdfunding, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CrowdFundings", null, {});
  },
};
