const UserSchema  = require('../models/usermodels')
const bcrypt = require('bcryptjs')
const emailValidator = require('email-validator')
const sendOTP = require('../Utils/sendOTP')
const otpModel = require('../models/otpModel')

const mailOTP = async (req,res)=> {
     // Send and verify OTP sent to mail here
     const otp = Math.floor(100000 + Math.random() * 900000)

    const {email} = req.body
    try{
         // Send OTP to mail
     await sendOTP(email,otp)

    // Save OTP to database
    
        const savedEmail = await otpModel.findOneAndUpdate({email}, {otp}, {new: true, upsert: true})
        if(!savedEmail){
            const otpData = new otpModel({
                email,
                otp
            })
    
            await otpData.save()
        }   


    res.status(200).json({
        message: "Otp saved successfully",
        success: true
    })
    }catch(err){
        res.status(400).json({
            messgae: err.message,
            success: false
        })
    }
    
}

const verifyOTP = async(req,res)=> {
    // Send and verify OTP sent to mail here
    const {email,otp} = req.body

    try{
        if(!email || !otp){
            throw new Error('All fields are required')
        }

        const otpData = await otpModel.findOne({email})

    if(!otpData){
        throw new Error('OTP not found')
    }
    console.log(otpData.otp);

    if(otpData.otp  != otp){
        throw new Error('Invalid OTP')
    }

    res.status(200).json({
        message: 'OTP verified successfully',
        success: true
    })
    }catch(err){
        res.status(400).json({
            message: err.message,
            success: false
        })
    
    }
}

const signup = async(req,res)=> {
    const {name,email,password,confirmPassword,profileType} = req.body
    try{
        if(!name || !email || !password || !confirmPassword || !profileType){
            throw new Error('All fields are required')
        }

        if(password !== confirmPassword){
            throw new Error('Passwords do not match')
        }

        if(!(emailValidator.validate(email))){
            throw new Error('Please enter a valid email')
        }

        // Check if user already exists
        const userExists = await UserSchema
        .findOne({email})
        
        if(userExists){
            throw new Error('User already exists')
        }

        const isEmailVerified = await otpModel.findOne({email})

        if(!isEmailVerified){
            throw new Error('Please verify your email address first')
        }

        const user = new UserSchema({
            name,
            email,
            password,
            profileType
        })

        await user.save()
        
        res.status(201).json({
            message: 'User created successfully',
            success: true
        })
        
    }catch(err){
        res.status(400).json({
            message:err.message, 
            success: false
        })
    }
}

const login = async(req,res)=> {
    const {email, password} = req.body
    try{
        if(!email || !password){
            throw new Error('All fields are required')
        }
        
        const user = await UserSchema
        .findOne({email}).select('+password')
        
        if(!user){
            throw new Error('User does not exist')
        }
        
        if(!(bcrypt.compare(password , user.password))){
            throw new Error('Invalid credentials')
        }

        const token = user.createToken()
        console.log(token);
        res.cookie('token',token,{
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true
        })

        res.status(200).json({
            message: 'User logged in successfully',
            success: true,
            user
        })

    }catch(err){
        res.status(400).json({
            message:err.message, 
            success: false
        })
    }

}

const logout = async(req,res)=> {

    if(!req.cookies.token){
        throw new Error('User not logged in')
    }

    console.log("User logged out");

    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        message: 'User logged out successfully',
        success: true
    })
}

module.exports = {
    signup,
    login,
    logout,
    mailOTP,
    verifyOTP
}
