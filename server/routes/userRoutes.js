const Router = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate:link', authMiddleware, userController.activate);
router.get('/refresh', authMiddleware, userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
//router.get('/auth', authMiddleware, userController.check);


module.exports = router;
