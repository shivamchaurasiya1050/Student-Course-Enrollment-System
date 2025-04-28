'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      duration: {
        type: Sequelize.STRING,
        allowNull: false,
    },
      slug: {
        type: Sequelize.STRING,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.00,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};