let express = require('express');
let router = express.Router();
const Controller = require('../controllers/userController');
const authentication = require('../middlewares/Authentication');

router.get('/', Controller.getAll);
router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/admin/register', Controller.adminRegister);
router.post('/admin/login', Controller.adminLogin);
router.get('/:id', authentication,Controller.getUserById);

module.exports = router;
