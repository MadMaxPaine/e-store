const { DataTypes } = require('sequelize');
const sequlize = require('../db');

const Rating = sequlize.define('rating', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 rate: { type: DataTypes.INTEGER, allowNull: false },
});
module.exports = Rating;