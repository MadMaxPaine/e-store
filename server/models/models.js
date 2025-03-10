const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Models import
const User = require("./userModel");
const Basket = require("./basketModel");
const BasketDevice = require("./basketDeviceModel");
const Device = require("./deviceModel");
const Type = require("./typeModel");
const Brand = require("./brandModel");
const Rating = require("./ratingModel");
const DeviceInfo = require("./deviceInfoModel");
const TypeBrand = require("./typeBrandModel");
const Comment = require("./commentModel");
const UserInfo = require("./userInfoModel");
const Token = require("./tokenModel");
const Order = require("./orderModel");

// Establish connections

// 📌 Один користувач → один кошик
User.hasOne(Basket, { onDelete: "CASCADE" });
Basket.belongsTo(User);

// 📌 Один користувач → багато рейтингів
User.hasMany(Rating, { onDelete: "CASCADE" });
Rating.belongsTo(User);

//basket
Basket.hasMany(BasketDevice, { onDelete: "CASCADE" });
BasketDevice.belongsTo(Basket);

//type
Type.hasMany(Device);
Device.belongsTo(Type);

//brand
Brand.hasMany(Device);
Device.belongsTo(Brand);

//basket_device
Device.hasMany(BasketDevice, { onDelete: "CASCADE" });
BasketDevice.belongsTo(Device);

//device_info
Device.hasMany(DeviceInfo, { as: "info" });
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

//Token
User.hasMany(Token);
Token.belongsTo(User);

// 📌 Зв’язок між користувачем і замовленням
User.hasMany(Order, { onDelete: "CASCADE" });
Order.belongsTo(User);

// 📌 Покращений зв’язок між кошиком та замовленням
Basket.belongsTo(Order, { foreignKey: 'orderId', onDelete: "SET NULL" });
Order.hasOne(Basket, { foreignKey: 'orderId' });

// 📌 Пристрої можуть бути в багатьох замовленнях через BasketDevice
Order.belongsToMany(Device, { through: BasketDevice });
Device.belongsToMany(Order, { through: BasketDevice });

// 📌 Кошик може містити багато пристроїв через BasketDevice
Basket.hasMany(BasketDevice, { onDelete: "CASCADE" });
BasketDevice.belongsTo(Basket);

Device.hasMany(BasketDevice, { onDelete: "CASCADE" });
BasketDevice.belongsTo(Device);

module.exports = {
  User,
  Basket,
  BasketDevice,
  Device,
  Brand,
  Type,
  Rating,
  TypeBrand,
  DeviceInfo,
  Token,
  UserInfo,
};
