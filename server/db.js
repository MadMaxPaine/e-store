const { Sequelize } = require('sequelize');
const cfg= require('./configs/config');

module.exports = new Sequelize(
 cfg.database.name,
 cfg.database.user,
 cfg.database.password, 
 {
  dialect:cfg.database.dialect,
  host:cfg.database.host,
  port:cfg.database.port,  
 }

);

