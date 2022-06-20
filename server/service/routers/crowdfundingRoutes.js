const routesCrowdFunding = require("express").Router();
const Controller = require("../controllers/crowdfundingController");
const authentication = require("../middlewares/Authentication");

routesCrowdFunding.get("/", Controller.getAllCrowdFunding);
routesCrowdFunding.get(
  "/crowdfundingproduct",
  Controller.getAllCrowdFundingProduct
);
routesCrowdFunding.post("/join/:id", Controller.joincrowdfunding);
// routesCrowdFunding.post('/add');
routesCrowdFunding.get("/all-history", Controller.getAllHistoryCrowdFunding);
routesCrowdFunding.get(
  "/all-history-by-user",
  authentication,
  Controller.getAllHistoryCrowdFundingById
);

module.exports = routesCrowdFunding;
