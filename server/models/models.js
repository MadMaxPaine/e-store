const { DataTypes } = require('sequelize');
const sequlize = require('../db');

const User = sequlize.define('user', {
 user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 email: { type: DataTypes.STRING, unique: true },
 password: { type: DataTypes.STRING },
 role: { type: DataTypes.STRING, defaultValue: 'USER' }
});

const Basket = sequlize.define('basket', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketDevice = sequlize.define('basket_device', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Device = sequlize.define('device', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 name: { type: DataTypes.STRING, unique: true, allowNull: false },
 price: { type: DataTypes.INTEGER, unique: true, allowNull: false },
 rating: { type: DataTypes.INTEGER, unique: true, allowNull: false },
 img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequlize.define('type', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequlize.define('brand', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequlize.define('rating', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 rate: { type: DataTypes.INTEGER, allowNull: false },
});

const DeviceInfo = sequlize.define('device_info', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 title: { type: DataTypes.STRING, allowNull: false },
 description: { type: DataTypes.STRING, allowNull: false },
});

const TypeBrand = sequlize.define('typeBrand', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

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
Device.hasMany(DeviceInfo);
DeviceInfo.belongsTo(Device);

//To many
Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

module.exports = {
 User,
 Basket,
 BasketDevice,
 Device, Brand,
 Type, Rating,
 TypeBrand,
 DeviceInfo
};

