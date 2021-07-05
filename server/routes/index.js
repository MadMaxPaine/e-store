const Router = require('express');
const router = new Router();

const userRouter = require('./userRoutes');
const typeRouter = require('./typeRoutes');
const deviceRouter = require('./deviceRoutes');
const brandRouter = require('./brandRoutes');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/device', deviceRouter);
router.use('/brand', brandRouter);


module.exports = router;

