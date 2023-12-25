// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('csbc1030', 'root', 'Madhu@2610', { //modify your creds 
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = 
  sequelize;
