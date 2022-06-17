let express = require('express');
let router = express.Router();
const Controller = require('../controllers/userController');

router.get('/', Controller.getAll);
router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/admin/register', Controller.adminRegister);
router.post('/admin/login', Controller.adminLogin);

module.exports = router;
