const { DataTypes } = require("sequelize");
const sequelize  = require("../db");
const User = require("./userModel"); // Імпорт моделі User

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { 
      model: User, // Використання моделі User
      key: "id" 
    },
    onDelete: "CASCADE", // Якщо користувача видалено, видаляємо його замовлення
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
    validate: {
      isIn: [["pending", "processing", "shipped", "delivered", "canceled"]],
    },
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "credit_card",
    validate: {
      isIn: [["credit_card", "paypal", "bank_transfer", "cash_on_delivery"]],
    },
  },
  shippingAddress: {
    type: DataTypes.JSON, // Використання JSON замість JSONB для MySQL
    allowNull: false,
  },
}, {
  timestamps: true, // Sequelize автоматично додасть createdAt та updatedAt
});

module.exports = Order;
