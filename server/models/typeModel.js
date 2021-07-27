const { DataTypes } = require('sequelize');
const sequlize = require('../db');

const Type = sequlize.define('type', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
module.exports = Type;