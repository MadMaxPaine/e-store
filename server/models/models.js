const { DataTypes } = require('sequelize');
const sequlize = require('../db');
//Models import
const User = require('./userModel');
const Basket = require('./basketModel');
const BasketDevice = require('./basketDeviceModel');
const Device = require('./deviceModel');
const Type = require('./typeModel');
const Brand = require('./brandModel');
const Rating = require('./ratingModel');
const DeviceInfo = require('./deviceInfoModel');
const TypeBrand = require('./typeBrandModel');
const Comment = require('./commentModel');
const UserInfo = require('./userInfoModel');

// Establish connections

//user
User.hasOne(Basket);
Basket.belongsTo(User);
User.hasMany(Rating);
Rating.belongsTo(User);

//basket
Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

//type
Type.hasMany(Device);
Device.belongsTo(Type);

//brand
Brand.hasMany(Device);
Device.belongsTo(Brand);

//basket_device 
Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device)

//device_info
Device.hasMany(DeviceInfo, { as: 'info' });
DeviceInfo.belongsTo(Device);

//To many
Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

//Comment
User.hasMany(Comment);
Comment.belongsTo(User);
Device.hasMany(Comment);
Comment.belongsTo(Device);

//user_info
User.hasOne(UserInfo);
UserInfo.belongsTo(User);

module.exports = {
 User,
 Basket,
 BasketDevice,
 Device, Brand,
 Type, Rating,
 TypeBrand,
 DeviceInfo
};

