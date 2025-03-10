const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Basket = require("./basketModel");

const BasketDevice = sequelize.define("basket_device", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: { min: 1 },
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    validate: { min: 0 },
  },
  discount: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true,
    defaultValue: 0,
    validate: { min: 0 },
  },
  status: {
    type: DataTypes.ENUM("pending", "added", "confirmed", "shipped", "delivered"),
    allowNull: false,
    defaultValue: "pending",
  },
  basketId: {
    type: DataTypes.INTEGER,
    references: {
      model: Basket, 
      key: 'id',
    },
    allowNull: false,
  },
  deviceId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'devices',
      key: 'id',
    },
    allowNull: false,
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

Basket.hasMany(BasketDevice, { foreignKey: "basketId", as: "items" });
BasketDevice.belongsTo(Basket, { foreignKey: "basketId" });

module.exports = BasketDevice;
