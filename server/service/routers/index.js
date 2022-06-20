let express = require("express");
let router = express.Router();
const users = require("./userRoutes");
const payment = require("./paymentRoutes");
const crowdfund = require("./crowdfundingRoutes");
const notif = require('./notificationRoutes')
router.use("/user", users);
router.use("/payment", payment);
router.use("/crowdFund", crowdfund);
router.use("/notification", notif)

module.exports = router;
