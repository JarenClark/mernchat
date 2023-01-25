const router = require('express').Router();
const { authMiddleware } = require('../middleware/authMiddleware')
const { getFriends, sendMessage, getMessages, messageSeen, deliveredMessage } = require('../controllers/messengerController')

router.get('/get-friends', authMiddleware, getFriends )

router.post('/send-message', authMiddleware, sendMessage)
router.get('/get-messages/:id', authMiddleware, getMessages)

//router.post('/image-message-send',authMiddleware, ImageMessageSend);

router.post('/seen-message',authMiddleware, messageSeen);
router.post('/delivered-message',authMiddleware, deliveredMessage);

module.exports = router