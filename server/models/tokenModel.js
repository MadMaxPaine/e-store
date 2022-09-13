const { DataTypes } = require('sequelize');
const sequlize = require('../db');

const Token = sequlize.define('token', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 userId: { type: DataTypes.INTEGER, allowNull: false },
 refreshToken: { type: DataTypes.TEXT, allowNull: false },
});

module.exports = Token;