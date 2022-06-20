const express = require('express')
const NotificationController = require('../controllers/notificationController')
const authentication = require('../middlewares/Authentication')
const router = express.Router()


router.post('/', authentication, NotificationController.postToken)
router.get('/:userid', NotificationController.getTokenByUserid)
router.patch('/:userid', NotificationController.updateToken)
router.delete('/:userid', NotificationController.deleteToken)


module.exports=router