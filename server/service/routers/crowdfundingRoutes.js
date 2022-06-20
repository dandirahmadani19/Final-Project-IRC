const routesCrowdFunding = require("express").Router();
const Controller = require("../controllers/crowdfundingController");


routesCrowdFunding.get('/', Controller.getAllCrowdFunding);
routesCrowdFunding.get('/crowdfundingproduct', Controller.getAllCrowdFundingProduct);
routesCrowdFunding.post('/join/:id', Controller.joincrowdfunding);
// routesCrowdFunding.post('/add');

module.exports = routesCrowdFunding;
