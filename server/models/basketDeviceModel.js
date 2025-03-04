const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const BasketDevice = sequelize.define('basket_device', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
module.exports = BasketDevice;