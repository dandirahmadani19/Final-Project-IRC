let express = require('express');
let router = express.Router();
const Controller = require('../controllers/userController');
const authentication = require('../middlewares/Authentication');

router.get('/', Controller.getAll);//test
router.post('/register', Controller.register);//test
router.post('/login', Controller.login);//test
router.post('/admin/register', Controller.adminRegister);//test
router.post('/admin/login', Controller.adminLogin);//test
router.get('/user-login', authentication, Controller.getUserById);//test

module.exports = router;
