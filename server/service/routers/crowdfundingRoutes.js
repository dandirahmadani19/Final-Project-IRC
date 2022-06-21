const routesCrowdFunding = require("express").Router();
const Controller = require("../controllers/crowdfundingController");
const authentication = require("../middlewares/Authentication");

routesCrowdFunding.get("/", Controller.getAllCrowdFunding); //test

routesCrowdFunding.post("/add", authentication, Controller.createCrowdFunding); //test
routesCrowdFunding.patch("/verif/:id", Controller.verifCrowdFunding); //test
routesCrowdFunding.patch(
  "/approve/:id",
  authentication,
  Controller.approvalCrowdFunding
); //test

routesCrowdFunding.get(
  "/detail/:id",
  Controller.detailCrowdFund
); //belum test new endpoint 21/6 

routesCrowdFunding.get(
  "/admin",
  Controller.allCrowdFundAdmin
); //belum test new endpoint 21/6

routesCrowdFunding.post(
  "/join/:id",
  authentication,
  Controller.joincrowdfunding
);//test

routesCrowdFunding.get(
  "/all-history-by-user-submit",
  authentication,
  Controller.getAllHistoryCrowdFunding
); //test

routesCrowdFunding.get(
  "/all-history-by-user-join",
  authentication,
  Controller.getAllHistoryCrowdFundingByUserJoin
);

module.exports = routesCrowdFunding;
