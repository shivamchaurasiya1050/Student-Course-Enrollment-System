'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      this.hasMany(models.Enrollment, {
        foreignKey: 'courseId',
        onDelete: 'CASCADE', 
      });

    }
  }

  Course.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Course',
    tableName:"Courses",
    timestamps: true,
  });

  return Course;
};