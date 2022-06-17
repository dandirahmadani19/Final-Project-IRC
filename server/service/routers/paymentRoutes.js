let express = require('express');
let router = express.Router();
// const routesPayment = require('express').Router();
// const Authentication = require('../middlewares/Authentication');
const Controller = require('../controllers/paymentController');

// routesPayment.use(Authentication);
router.post('/', Controller.transaction);
router.post('/success', Controller.addBalance);
module.exports = router;
