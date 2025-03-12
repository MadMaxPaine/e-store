const BasketService = require("../services/basketService");
const ApiError = require("../error/ApiErrors");

class BasketController {
  // Отримання всіх товарів в корзині
  async getAll(req, res, next) {
    console.log(req.params.userId);
    try {
      const userId = req.user.id;  // отримуємо ID користувача з автентифікації    
      const basketItems = await BasketService.getAll(userId); // Викликаємо сервіс для отримання товарів
      res.status(200).json(basketItems); // Повертаємо всі товари в корзині
    } catch (error) {
      next(error); // Передаємо помилку в обробник помилок
    }
  }

  // Додавання товару до корзини
  async addDevice(req, res, next) {
    try {
      const userId = req.user.id; 
      console.log("Request body:", req.body); // Логуємо тіло запиту, щоб побачити deviceId та quantity       
      console.log(req.body.quantity);     
      const deviceId = req.body.deviceId;
      const quantity = req.body.quantity;
      console.log(userId,
        deviceId,
        quantity);
      
      const message = await BasketService.addDevice(
        userId,
        deviceId,
        quantity
      );
       // Перевіряємо, чи дійсно функція повернула повідомлення
    if (!message || !message.message) {
      return res.status(500).json({ message: "Failed to add device to basket" });
    }
    console.log(message);
    
    // Повертаємо успішну відповідь з повідомленням
    return res.status(200).json(message); // Повертаємо повідомлення
    } catch (error) {
      console.error("Error in addDevice:", error);
      next(error);
    }
  }

  // Видалення товару з корзини
  async removeDevice(req, res, next) {
    try {
      const userId = req.user.id; // отримуємо ID користувача з автентифікації
      const { deviceId } = req.params; // отримуємо ID товару з параметрів URL
      console.log(userId,deviceId);
      
      const message = await BasketService.removeDevice(userId, deviceId); // Викликаємо сервіс для видалення товару
      res.status(200).json(message); // Повертаємо повідомлення про успішне видалення
    } catch (error) {
      next(error); // Передаємо помилку в обробник помилок
    }
  }

  
  // Очищення корзини
  async clearBasket(req, res, next) {
    try {
      const userId = req.params.userId; // отримуємо ID користувача з автентифікації
      const message = await BasketService.clearBasket(userId); // Викликаємо сервіс для очищення корзини
      res.status(200).json(message); // Повертаємо повідомлення про успішне очищення
    } catch (error) {
      next(error); // Передаємо помилку в обробник помилок
    }
  }
}

module.exports = new BasketController();
