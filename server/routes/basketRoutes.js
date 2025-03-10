const Router = require('express');
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');
const { body, query } = require('express-validator');
const validateQuery = require('../middleware/validateQuery'); // Middleware для валідації запитів

const router = new Router();

// Отримання всіх товарів в корзині
router.get(
  '/:id',
  authMiddleware,
  basketController.getAll
);

// Додавання товару до корзини
router.post(
  '/add',
  authMiddleware,
  body('deviceId').isInt().withMessage('deviceId must be an integer'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  validateQuery,  // Middleware для валідації
  basketController.addDevice
);

// Видалення товару з корзини
router.delete(
  '/remove',
  authMiddleware,
  body('deviceId').isInt().withMessage('deviceId must be an integer'),
  validateQuery,  // Middleware для валідації
  basketController.removeDevice
);

// Оновлення кількості товару в корзині
router.put(
  '/update',
  authMiddleware,
  body('deviceId').isInt().withMessage('deviceId must be an integer'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  validateQuery,  // Middleware для валідації
  basketController.updateDeviceQuantity
);

// Очищення корзини
router.delete(
  '/clear',
  authMiddleware,
  basketController.clearBasket
);

module.exports = router;
