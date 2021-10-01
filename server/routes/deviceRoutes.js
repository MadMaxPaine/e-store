const Router = require('express');
const deviceController = require('../controllers/deviceController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/', checkRoleMiddleware, deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);


module.exports = router;
