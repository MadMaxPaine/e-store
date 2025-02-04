const Router = require('express');
const router = new Router();

const userRouter = require('./userRoutes');
const typeRouter = require('./typeRoutes');
const deviceRouter = require('./deviceRoutes');
const brandRouter = require('./brandRoutes');
const commentRouter = require('./commentRoutes');
const userInfoRouter = require('./userInfoRoutes');
const authMiddleware = require('../middleware/authMiddleware');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/device', deviceRouter);
router.use('/brand', brandRouter);
router.use('/comment', commentRouter);
router.use('/userinfo',authMiddleware, userInfoRouter);

module.exports = router;

