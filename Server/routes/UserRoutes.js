const express = require('express')
const {signup,login,logout, mailOTP, verifyOTP} = require('../Controllers/UserControllers')
const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',logout)
router.post('/send-otp', mailOTP)
router.post('/verify-otp', verifyOTP)

module.exports = router