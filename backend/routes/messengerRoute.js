const router = require('express').Router();
const { authMiddleware } = require('../middleware/authMiddleware')
const { getFriends } = require('../controllers/messengerController')

router.get('/get-friends', authMiddleware, getFriends )


module.exports = router