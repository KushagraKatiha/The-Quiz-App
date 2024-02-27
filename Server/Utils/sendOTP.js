require('dotenv').config();
const nodemailer = require('nodemailer')

const sendOTP = async function(email, otp){
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }   
    })

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'OTP for account verification',
        text: `Your OTP is ${otp}`
    })
}

module.exports = sendOTP;