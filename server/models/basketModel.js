const { DataTypes } = require('sequelize');
const sequlize = require('../db');

const Basket = sequlize.define('basket', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = Basket;