let express = require('express');
let router = express.Router();
const Controller = require('../controllers/balanceController');

router.get('/', Controller.getBalance);
router.get('/:userId', Controller.getBalanceByUserId);

module.exports = router;
