//posts model
const { DataTypes } = require('sequelize');
const sequelize = require('./db.js');

const Posts =  sequelize.define('Posts', {
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    post_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    id:{
     type: DataTypes.INTEGER,
     allowNull: false,
     references: {
      model: 'user', 
      key: 'id',
         }
        },},
{
    tableName: 'posts',
    timestamps: false,
  });

  Posts.sync();
module.exports = Posts;
// return Posts;
