let express = require('express');
let router = express.Router();
const Controller = require('../controllers/statusTrackController');

router.post('/', Controller.postStatusTracking);
router.get('/', Controller.getAllStatus);
router.get('/:id/all-participant', Controller.getAllEntitiesParticipant);
router.get('/:id', Controller.getStatusById);

module.exports = router;
