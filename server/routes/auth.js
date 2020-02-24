const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')


router.post('/register', authController.postRegister)
router.post('/login', authController.postLogin)
router.post('/authenticate', authController.postAuthenticate)

module.exports = router