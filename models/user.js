// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db.js');
const User =  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
  },
  {
    tableName: 'user',
    timestamps: false,
});


User.sync();
module.exports = User;
// return User;s

  
