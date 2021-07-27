const { DataTypes } = require('sequelize');
const sequlize = require('../db');

const TypeBrand = sequlize.define('typeBrand', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

module.exports = TypeBrand;