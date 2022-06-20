let express = require("express");
let router = express.Router();
// const routesPayment = require('express').Router();
const Authentication = require("../middlewares/Authentication");
const Controller = require("../controllers/paymentController");

// router.use(Authentication);
router.post("/", Authentication, Controller.transaction);
router.post("/success", Authentication, Controller.addBalance);

module.exports = router;
