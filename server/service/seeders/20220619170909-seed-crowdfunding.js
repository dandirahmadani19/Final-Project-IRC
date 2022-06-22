"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const crowdfunding = [
      {
        productName:
          "Hot Sale Industrial Shoes Anti Puncture anti Slip Men security boots Steel Toe sneakers Safety shoes Boots",
        UserId: 1,
        targetQuantity: 200,
        initialProductPrice: 100000,
        finalProductPrice: 125000,
        manufactureName: "Dongyang Huanyao Industry And Trade Co",
        linkProduct:
          "https://indonesian.alibaba.com/p-detail/Fitness-1600249994724.html?spm=a27aq.14175334.4.1.c0817df4ll96H6",
        status: "Open",
        currentQuantity: 170,
        startDate: "2022-06-19T16:14:16.940Z",
        productImage:
          "https://s.alicdn.com/@sc04/kf/H8d66d54811d44603a199cfbcf6ac9439r.jpg_960x960.jpg",
        initialQuantity: 100,
        expiredDay: 10,
        startDate: "2022-06-19T16:14:16.940Z",
        hscode: "62111100",
        createdAt: "2022-06-18T16:14:16.940Z",
        updatedAt: "2022-06-18T16:14:16.940Z",
      },
      {
        productName:
          "Men Autumn Winter Long Soft Loose Fit Quick Dry Dance Jogging Pants with Pockets",
        UserId: 1,
        targetQuantity: 210,
        initialProductPrice: 120000,
        finalProductPrice: 145000,
        manufactureName: "Yiwu Chuangyue Trade Co., Ltd.",
        linkProduct:
          "https://indonesian.alibaba.com/p-detail/Fitness-1600249994724.html?spm=a27aq.14175334.4.1.c0817df4ll96H6",
        status: "Failed",
        currentQuantity: 125,
        startDate: "2022-06-02T16:14:16.940Z",
        productImage:
          "https://sc04.alicdn.com/kf/Hf0d9c2ee83ec430b9672f092991b7d06p.jpg",
        initialQuantity: 125,
        expiredDay: 14,
        startDate: "2022-06-02T16:14:16.940Z",
        hscode: "62111100",
        createdAt: "2022-06-01T16:14:16.940Z",
        updatedAt: "2022-06-01T16:14:16.940Z",
      },
      {
        productName: "Promotional High Ankle Safety Shoes with Steel Toe Cap",
        UserId: 2,
        targetQuantity: 120,
        initialProductPrice: 210000,
        finalProductPrice: 232000,
        manufactureName: "Yiwu Ruitong Trade Co., Limited",
        linkProduct:
          "https://www.alibaba.com/product-detail/Promotional-High-Ankle-Safety-Shoes-with_62402150493.html",
        status: "Open",
        currentQuantity: 60,
        startDate: "2022-06-19T16:14:16.940Z",
        productImage:
          "https://s.alicdn.com/@sc04/kf/H15adb6fa25624c1e8b685b2b3b0f55a1C.png_960x960.png",
        initialQuantity: 30,
        expiredDay: 20,
        hscode: "64019990",
        createdAt: "2022-06-18T16:14:16.940Z",
        updatedAt: "2022-06-18T16:14:16.940Z",
      },
      {
        productName:
          "Baby girls winter coat rabbit ear hooded children jacket for girls outerwear",
        UserId: 2,
        targetQuantity: 810,
        initialProductPrice: 72000,
        finalProductPrice: 98000,
        manufactureName: "Yiwu Ruitong Trade Co., Limited",
        linkProduct:
          "https://www.alibaba.com/product-detail/Baby-girls-winter-coat-rabbit-ear_62350749916.html?spm=a27aq.14175334.42.1.c0817df4ll96H6",
        status: "Open",
        currentQuantity: 200,
        startDate: "2022-06-19T16:14:16.940Z",
        productImage:
          "https://s.alicdn.com/@sc04/kf/Hf9833324c7e94986ab810e9f3fce2631R.jpg_960x960.jpg",
        initialQuantity: 200,
        expiredDay: 15,
        hscode: "61119090",
        createdAt: "2022-06-18T16:14:16.940Z",
        updatedAt: "2022-06-18T16:14:16.940Z",
      },
      {
        productName:
          "Anti-Slip Baby Crawling Knee brace / Unisex Baby Toddlers Knee pads crawling support protector knee pads",
        UserId: 3,
        targetQuantity: 2000,
        initialProductPrice: 5000,
        finalProductPrice: 6500,
        manufactureName: "Manufacturer,Trading Company",
        linkProduct:
          "https://www.alibaba.com/product-detail/Anti-Slip-Baby-Crawling-Knee-brace_1600155438230.html?spm=a27aq.14175334.139.1.c0817df4ll96H6",
        status: "Success",
        currentQuantity: 2000,
        startDate: "2022-06-02T16:14:16.940Z",
        productImage:
          "https://sc04.alicdn.com/kf/H1512f77d70b64e42903c3ffa882abf72u.jpg",
        initialQuantity: 900,
        expiredDay: 15,
        hscode: "61119090",
        createdAt: "2022-06-01T16:14:16.940Z",
        updatedAt: "2022-06-02T16:14:16.940Z",
      },
    ];
    await queryInterface.bulkInsert("CrowdFundings", crowdfunding, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CrowdFundings", null, {});
  },
};
