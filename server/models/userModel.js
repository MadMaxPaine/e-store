const { DataTypes } = require('sequelize');
const sequlize = require('../db');

const User = sequlize.define('user', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 email: { type: DataTypes.STRING, unique: true },
 password: { type: DataTypes.STRING },
 role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

module.exports = User;