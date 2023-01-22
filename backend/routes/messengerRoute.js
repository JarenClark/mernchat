const router = require('express').Router();
const { authMiddleware } = require('../middleware/authMiddleware')
const { getFriends, getUsers } = require('../controllers/messengerController')

router.get('/get-friends', authMiddleware, getFriends )
router.get('/get-users', authMiddleware, getUsers )


module.exports = router