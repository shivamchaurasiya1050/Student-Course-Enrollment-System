'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
       
      });
      this.belongsTo(models.Course, {
        foreignKey: 'courseId',
        onDelete: 'CASCADE'
      });
    }
  }

  Enrollment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      
    },
    courseId: {
      type: DataTypes.UUID,
      references: {
        model: 'Courses',
        key: 'id',
      },
      onDelete: 'CASCADE', 
      allowNull: false,
      
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
 
  }, {
    sequelize,
    modelName: 'Enrollment',
    tableName: 'Enrollments',
    timestamps: true,
   
  });

  return Enrollment;
};