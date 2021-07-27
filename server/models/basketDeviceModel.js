const { DataTypes } = require('sequelize');
const sequlize = require('../db');

const BasketDevice = sequlize.define('basket_device', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
module.exports = BasketDevice;