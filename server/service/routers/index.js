let express = require('express');
let router = express.Router();
const users = require('./userRoutes');
const payment = require('./paymentRoutes');
const crowdfund = require('./crowdfundingRoutes');

// router.use('/users', users);
router.use('/payment', payment);
// router.use('/crowdFund', crowdfund);

module.exports = router;
