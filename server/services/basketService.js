const {Basket,BasketDevice,Device} = require('../models/models');
const ApiError = require("../error/ApiErrors");

class BasketService {
  // Отримання всіх товарів у корзині користувача
  async getAll(userId) {  
    const basket = await Basket.findOne({ 
      where: { userId },
      include: [{ model: BasketDevice, as: "items" }]  // Використовуйте правильне ім'я асоціації
    });
    if (!basket) throw ApiError.notFound("Корзина не знайдена");   
    return basket.items;  // Використовуємо "items", оскільки це асоціація
  }

  // Додавання товару до корзини
  async addDevice(userId, deviceId, quantity) {
    try {
      console.log("Attempting to add device to basket:", { userId, deviceId, quantity });
      
      // Знаходимо або створюємо кошик для користувача
      let basket = await Basket.findOne({ where: { userId } });
  
      if (!basket) {
        console.log("No basket found, creating new basket for user:", userId);
        basket = await Basket.create({ userId });
      }
  
      // Отримуємо інформацію про товар, щоб отримати ціну
      const device = await Device.findOne({ where: { id: deviceId } });
  
      if (!device) {
        throw new Error("Device not found");
      }
  
      const price = device.price; // Отримуємо ціну товару
  
      // Спробуємо знайти товар у кошику або створимо новий запис
      const [basketDevice, created] = await BasketDevice.findOrCreate({
        where: { basketId: basket.id, deviceId },
        defaults: { quantity, price }, // Тепер передаємо price
      });
  
      // Якщо товар вже існує, оновлюємо кількість
      if (!created) {
        console.log("Device already in basket, updating quantity");
        basketDevice.quantity += +quantity;
        await basketDevice.save(); // Зберігаємо оновлену кількість
      }
  
      console.log("Device successfully added to basket");
      return { message: "Товар успішно додано до корзини" };
    } catch (error) {
      console.error("Error while adding device to basket:", error);
      throw new Error("Failed to add device to basket");
    }
  }
  // Видалення товару з корзини
  async removeDevice(userId, deviceId) {
    const basket = await Basket.findOne({ where: { userId } });
    if (!basket) throw ApiError.notFound("Корзина не знайдена");

    const deleted = await BasketDevice.destroy({ where: { basketId: basket.id, deviceId } });
    if (!deleted) throw ApiError.notFound("Товар не знайдено у корзині");

    return { message: "Товар успішно видалено з корзини" };
  }
 
  // Очищення корзини
  async clearBasket(userId) {
    console.log(userId);
    
    const basket = await Basket.findOne({ where: { userId } });
    if (!basket) throw ApiError.notFound("Корзина не знайдена");

    await BasketDevice.destroy({ where: { basketId: basket.id } });
    return { message: "Корзина успішно очищена" };
  }
}

module.exports = new BasketService;