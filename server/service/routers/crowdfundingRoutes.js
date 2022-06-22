const routesCrowdFunding = require("express").Router();
const Controller = require("../controllers/crowdfundingController");
const authentication = require("../middlewares/Authentication");



routesCrowdFunding.get("/", Controller.getAllCrowdFunding); //test    

routesCrowdFunding.post("/add", authentication, Controller.createCrowdFunding); //test 
routesCrowdFunding.get("/admin",Controller.allCrowdFundAdmin); //test

routesCrowdFunding.get("/all-history-by-user-submit",authentication,Controller.getAllHistoryCrowdFunding); // test
routesCrowdFunding.get("/all-history-by-user-join",authentication,Controller.getAllHistoryCrowdFundingByUserJoin); // test

routesCrowdFunding.patch("/verif/:id", Controller.verifCrowdFunding); //test
routesCrowdFunding.patch("/approve/:id",authentication,Controller.approvalCrowdFunding);  //test
routesCrowdFunding.patch("/deny/:id",Controller.denyCrowdFunding); //test
routesCrowdFunding.get("/detail/:id", Controller.detailCrowdFund ); //  test
routesCrowdFunding.post("/join/:id",authentication,Controller.joincrowdfunding); //test

module.exports = routesCrowdFunding;
