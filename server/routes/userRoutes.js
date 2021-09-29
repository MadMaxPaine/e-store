const Router = require('express');
const { body } = require('express-validator');

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();


router.post('/registration',
 body('email').isEmail(),
 body('password').isLength({ min: 3, max: 25 }),
 userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', authMiddleware, userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
//router.get('/auth', authMiddleware, userController.check);


module.exports = router;
