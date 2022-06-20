let express = require('express');
let router = express.Router();

const users = require("./userRoutes");
const payment = require("./paymentRoutes");
const crowdfund = require("./crowdfundingRoutes");
const notif = require('./notificationRoutes')
const balance = require('./balanceRoutes');

router.use("/user", users);
router.use("/payment", payment);
router.use("/crowdFund", crowdfund);
router.use("/notification", notif)
router.use('/balance', balance);


module.exports = router;
