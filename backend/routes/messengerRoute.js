const router = require('express').Router();
const { authMiddleware } = require('../middleware/authMiddleware')
const { getFriends, sendMessage, getMessages } = require('../controllers/messengerController')

router.get('/get-friends', authMiddleware, getFriends )

router.post('/send-message', authMiddleware, sendMessage)
router.get('/get-messages/:id', authMiddleware, getMessages)

module.exports = router