const { DataTypes } = require('sequelize');
const sequlize = require('../db');

const DeviceInfo = sequlize.define('device_info', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 title: { type: DataTypes.STRING, allowNull: false },
 description: { type: DataTypes.STRING, allowNull: false },
});
module.exports = DeviceInfo;