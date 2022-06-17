const routes = require("express").Router();
const routesBalance = require("./balanceRoutes");
const routesCrowdFunding = require("./crowdfundingRoutes");
const routesUser = require("./userRoutes");

routes.use("/balance", routesBalance);
routes.use("/crowdfunding", routesCrowdFunding);
routes.use("/user", routesUser);

module.exports = routes;
