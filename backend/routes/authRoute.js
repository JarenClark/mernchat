const router = require('express').Router();
const { userRegister } = require('../controllers/authController')

router.post('/user-register', userRegister);

module.exports = router;