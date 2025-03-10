const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Basket = sequelize.define('basket', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  status: { 
    type: DataTypes.ENUM('open', 'completed', 'abandoned'),
    allowNull: false,
    defaultValue: 'open',
  },
  userId: { 
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    allowNull: false,
  },
  orderId: { 
    type: DataTypes.INTEGER,
    references: {
      model: 'orders',
      key: 'id',
    },
    allowNull: true,
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Basket;
