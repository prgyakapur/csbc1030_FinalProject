//comments.js(model)
const { DataTypes } = require('sequelize');
const sequelize = require('./db.js');

const Comments = sequelize.define('Comments', {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    post_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
         model: 'posts', 
         key: 'post_id',
            }
           },
},
    {
        tableName: 'comments',
        timestamps: false,
    
  });
//   return Comments;
  Comments.sync();
  module.exports = Comments;
