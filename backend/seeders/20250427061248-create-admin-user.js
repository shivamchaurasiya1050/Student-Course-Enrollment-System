'use strict';
const bcrypt= require("bcryptjs")
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    return queryInterface.bulkInsert('Users', [{
      id:uuidv4(),
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
