const Router = require('express');
const userInfoController = require('../controllers/userInfoController');
const authMiddleware = require('../middleware/authMiddleware');


const router = new Router();

//router.post('/',console.log('Yeap2'));
// router.get('/', deviceController.getAll);
//router.get('/:id', userInfoController.getOne,authMiddleware);


module.exports = router;
