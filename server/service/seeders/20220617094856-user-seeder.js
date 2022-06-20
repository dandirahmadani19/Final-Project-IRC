"use strict";

const { passwordEncryptor } = require("../helpers/helperBcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "John",
          lastName: "Doe",
          email: "jhon@mail.com",
          password: passwordEncryptor("12345"),
          phoneNumber: "081234567890",
          address: "Jl. Kebon Kacang",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Dandi",
          lastName: "Rahmadani",
          email: "dannyholewa@gmail.com",
          password: passwordEncryptor("12345"),
          phoneNumber: "081234567890",
          address: "Jl. Kebon Kacang",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Josua",
          lastName: "William",
          email: "josua@mail.com",
          password: passwordEncryptor("12345"),
          phoneNumber: "081234567890",
          address: "Jl. Kebon Kacang",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Begawan",
          lastName: "Diaz",
          email: "begawandiaz@mail.com",
          password: passwordEncryptor("12345"),
          phoneNumber: "081234567890",
          address: "Jl. Kebon Kacang",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
