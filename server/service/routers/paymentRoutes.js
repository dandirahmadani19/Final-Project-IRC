let express = require("express");
let router = express.Router();
// const routesPayment = require('express').Router();
const Authentication = require("../middlewares/Authentication");
const Controller = require("../controllers/paymentController");

// router.use(Authentication);
router.post("/", Authentication, Controller.transaction); //test
router.post("/success", Authentication, Controller.addBalance); //test

module.exports = router;
