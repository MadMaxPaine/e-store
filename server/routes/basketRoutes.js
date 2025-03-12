const Router = require('express');
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');
const { body, param } = require('express-validator');
const validateQuery = require('../middleware/validateQuery'); // Middleware для валідації запитів

const router = new Router();

// Отримання всіх товарів в корзині
router.get(
  '/:userId',
  authMiddleware,
  basketController.getAll
);

// Додавання товару до корзини
router.post(
  '/add',
  authMiddleware,
   validateQuery,  
    basketController.addDevice   
);

// Видалення товару з корзини
router.delete(
  '/remove/:deviceId',
  authMiddleware,  
  validateQuery,
  basketController.removeDevice
);

// Очищення корзини
router.delete(
  '/clear/:userId',
  authMiddleware,
  basketController.clearBasket
);

module.exports = router;
