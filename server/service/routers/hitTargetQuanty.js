let express = require('express');
let router = express.Router();
const Controller = require("../controllers/crowdfundingController")

router.post('/:id', Controller.targetQuantity);

module.exports = router;
