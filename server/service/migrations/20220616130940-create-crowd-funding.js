"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CrowdFundings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      targetQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      initialProductPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      finalProductPrice: {
        type: Sequelize.INTEGER,
      },
      manufactureName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      linkProduct: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currentQuantity: {
        type: Sequelize.INTEGER,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      productImage: {
        type: Sequelize.STRING,
      },
      initialQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      expiredDay: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("CrowdFundings");
  },
};
