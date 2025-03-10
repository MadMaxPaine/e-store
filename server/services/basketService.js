const Basket = require("../models/basketModel");
const Device = require("../models/deviceModel");
const BasketDevice = require('../models/basketDeviceModel')
const ApiError = require("../error/ApiErrors"); // Імпортуємо ваш клас ApiError

class BasketService {
  // Отримання всіх товарів в корзині
  async getAll(userId) {
      // Знаходимо кошик користувача
      const basket = await Basket.findOne({ where: { userId, status: 'open' } });
      if (!basket) throw new Error('Кошик порожній');
  
      // Отримуємо всі товари в кошику
      const items = await BasketDevice.findAll({
          where: { basketId: basket.id },
          include: [{ model: Device, as: 'device' }] // Підключаємо дані про товар
      });
  
      return items.map(item => ({
          id: item.id,
          name: item.device.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
      }));
  }

  // Додавання товару до корзини
  async addDevice(userId, deviceId, quantity) {
    try {
      const basketItem = await BasketDevice.findOne({ 
        where: { basketId: basket.id, deviceId } 
    });

    if (basketItem) {
        basketItem.quantity += quantity;
        await basketItem.save();
    } else {
        const device = await Device.findByPk(deviceId);
        if (!device) throw new Error('Товар не знайдено');

        await BasketDevice.create({ 
            basketId: basket.id, 
            deviceId, 
            quantity, 
            price: device.price 
        });
    }

    return { message: "Товар додано в кошик" };
    } catch (error) {
      console.error("Error in addDevice:", error);
      throw error instanceof ApiError
        ? error
        : ApiError.internalError("Error adding device to basket");
    }
  }

  // Видалення товару з корзини
  async removeDevice(userId, deviceId) {
    try {
      await BasketDevice.destroy({ 
        where: { basketId: basket.id, deviceId } 
    });

    return { message: "Товар видалено з кошика" };
    } catch (error) {
      console.error("Error in removeDevice:", error);
      throw error instanceof ApiError
        ? error
        : ApiError.internalError("Error removing device from basket");
    }
  }

  // Оновлення кількості товару в корзині
  async updateDeviceQuantity(userId, deviceId, quantity) {
    try {
      const item = await Basket.findOne({
        where: { userId, deviceId },
      });

      if (!item) {
        throw ApiError.notFound("Device not found in basket");
      }

      if (quantity < 1) {
        throw ApiError.badRequest("Quantity must be at least 1");
      }

      item.quantity = quantity;
      await item.save();

      return { message: "Device quantity updated" };
    } catch (error) {
      console.error("Error in updateDeviceQuantity:", error);
      throw error instanceof ApiError
        ? error
        : ApiError.internalError("Error updating device quantity");
    }
  }

  // Очищення корзини
  async clearBasket(userId) {
    try {
      const clearBasket = await Basket.findOne({
        where: { userId },
      });
      clearBasket.status="open";
      clearBasket.save();
      return { message: "Basket cleared" };
    } catch (error) {
      console.error("Error in clearBasket:", error);
      throw error instanceof ApiError
        ? error
        : ApiError.internalError("Error clearing basket");
    }
  }
}

module.exports = new BasketService();
