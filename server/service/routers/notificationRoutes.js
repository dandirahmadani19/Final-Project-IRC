const express = require('express')
const NotificationController = require('../controllers/notificationController')
const router = express.Router()


router.post('/', NotificationController.postToken)
router.get('/:userid', NotificationController.getTokenByUserid)
router.patch('/:userid', NotificationController.updateToken)
router.delete('/:userid', NotificationController.deleteToken)


module.exports=router