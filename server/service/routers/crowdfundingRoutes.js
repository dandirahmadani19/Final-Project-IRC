const routesCrowdFunding = require('express').Router();
const Controller = require("../controllers/crowdfundingController")

routesCrowdFunding.get("/expiredTime", Controller.expiredTime)
routesCrowdFunding.post('/add');
routesCrowdFunding.post('/join/:id', Controller.joincrowdfunding);

module.exports = routesCrowdFunding;
