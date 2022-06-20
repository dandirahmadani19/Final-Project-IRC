let express = require('express');
let router = express.Router();
const users = require('./userRoutes');
const payment = require('./paymentRoutes');
const crowdfund = require('./crowdfundingRoutes');
const balance = require('./balanceRoutes');

router.use('/user', users);
router.use('/payment', payment);
router.use('/crowdFund', crowdfund);
router.use('/balance', balance);

module.exports = router;
