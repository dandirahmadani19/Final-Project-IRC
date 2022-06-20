const routesCrowdFunding = require("express").Router();
const Controller = require("../controllers/crowdfundingController");

const authentication = require('../middlewares/Authentication')

routesCrowdFunding.get('/', Controller.getAllCrowdFunding);

routesCrowdFunding.get("/expiredTime", Controller.expiredTime)
routesCrowdFunding.post('/add'), authentication, Controller.createCrowdFunding;
routesCrowdFunding.put('/verif/:id'), authentication,Controller.verifCrowdFunding
routesCrowdFunding.patch('/approve/:id'), authentication, Controller.approvalCrowdFunding 





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
