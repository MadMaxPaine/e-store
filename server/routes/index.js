const Router = require('express');
const router = new Router();

const userRouter = require('./userRoutes');
const typeRouter = require('./typeRoutes');
const deviceRouter = require('./deviceRoutes');
const brandRouter = require('./brandRoutes');
const commentRouter = require('./commentRouter');
const userInfoRouter = require('./userInfoRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/device', deviceRouter);
router.use('/brand', brandRouter);
router.use('/comment', commentRouter);
router.use('/userinfo', userInfoRouter);

module.exports = router;

