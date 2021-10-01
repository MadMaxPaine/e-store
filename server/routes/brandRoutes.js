const Router = require('express');
const brandController = require('../controllers/brandController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/', checkRoleMiddleware, brandController.create);
router.get('/', brandController.getAll);


module.exports = router;
