const express = require('express')
const {signup,login,logout, mailOTP, verifyOTP, deleteUser, resetPassword, forgotPassword} = require('../Controllers/UserControllers')
const router = express.Router()
const jwtToken = require('../middleware/jwtToken')

router.post('/signup',signup)
router.post('/login',login)
router.get('/logout',logout)
router.delete('/delete-account', jwtToken, deleteUser)
router.post('/send-otp', mailOTP)
router.post('/verify-otp', verifyOTP)
router.post('/reset-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

module.exports = router