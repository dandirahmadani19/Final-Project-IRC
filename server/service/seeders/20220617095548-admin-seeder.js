'use strict';

const { passwordEncryptor } = require('../helpers/helperBcrypt');

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
      'Admins',
      [
        {
          username: 'admin',
          email: 'admin@mail.com',
          password: passwordEncryptor('admin123'),
          phoneNumber: '081234567890',
          address: 'Jl. Kebon Kacang',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Admins', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
