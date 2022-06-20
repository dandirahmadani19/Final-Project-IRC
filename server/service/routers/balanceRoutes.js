let express = require("express");
let router = express.Router();
const Controller = require("../controllers/balanceController");
const authentication = require("../middlewares/Authentication");

router.get("/", Controller.getBalance);
router.get(
  "/check-balance/:totalPrice",
  authentication,
  Controller.getBalanceByUserId
);

module.exports = router;
