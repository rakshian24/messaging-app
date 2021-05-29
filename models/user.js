'use strict';
const { Model } = require('sequelize');
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      userPicUrl:{
        type: DataTypes.STRING,
        defaultValue: null,
      },
      createdAt: {
        defaultValue: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: DataTypes.DATE,
      },
      updatedAt: {
        defaultValue: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    },
  );
  return User;
};
