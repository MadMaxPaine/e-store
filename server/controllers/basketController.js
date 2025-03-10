const  BasketService  = require("../services/basketService");
const ApiError = require("../error/ApiErrors");

class BasketController {
  // Отримання всіх товарів в корзині
  async getAll(req, res, next) {
    try {
      const userId = req.user.id;                               // отримуємо ID користувача з автентифікації
      const basketItems = await BasketService.getAll(userId); // Викликаємо сервіс для отримання товарів
      res.status(200).json(basketItems);                    // Повертаємо всі товари в корзині
    } catch (error) {
      next(error);                                        // Передаємо помилку в обробник помилок
    }
  }

  // Додавання товару до корзини
  async addDevice(req, res, next) {
    try {
      const userId = req.user.id;                                                      // отримуємо ID користувача з автентифікації
      const { deviceId, quantity } = req.body;                                      // отримуємо ID товару та кількість з тіла запиту
      const message = await BasketService.addDevice(userId, deviceId, quantity); // Викликаємо сервіс для додавання товару
      res.status(200).json(message);                                         // Повертаємо повідомлення про успішне додавання
    } catch (error) {
      next(error);                                                       // Передаємо помилку в обробник помилок
    }
  }

  // Видалення товару з корзини
  async removeDevice(req, res, next) {
    try {
      const userId = req.user.id;                                             // отримуємо ID користувача з автентифікації
      const { deviceId } = req.params;                                      // отримуємо ID товару з параметрів URL
      const message = await BasketService.removeDevice(userId, deviceId); // Викликаємо сервіс для видалення товару
      res.status(200).json(message);                                    // Повертаємо повідомлення про успішне видалення
    } catch (error) {
      next(error);                                                   // Передаємо помилку в обробник помилок
    }
  }

  // Оновлення кількості товару в корзині
  async updateDeviceQuantity(req, res, next) {
    try {
      const userId = req.user.id;                                                           // отримуємо ID користувача з автентифікації
      const { deviceId } = req.params;                                                      // отримуємо ID товару з параметрів URL
      const { quantity } = req.body;                                                        // отримуємо нову кількість товару з тіла запиту
      const message = await BasketService.updateDeviceQuantity(userId, deviceId, quantity); // Викликаємо сервіс для оновлення кількості
      res.status(200).json(message);                                                        // Повертаємо повідомлення про успішне оновлення
    } catch (error) {
      next(error);                                                                          // Передаємо помилку в обробник помилок
    }
  }

  // Очищення корзини
  async clearBasket(req, res, next) {
    try {
      const userId = req.user.id;                               // отримуємо ID користувача з автентифікації
      const message = await BasketService.clearBasket(userId); // Викликаємо сервіс для очищення корзини
      res.status(200).json(message);                          // Повертаємо повідомлення про успішне очищення
    } catch (error) {
      next(error);                                          // Передаємо помилку в обробник помилок
    }
  }
}

module.exports = new BasketController();
