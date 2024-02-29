const UserSchema = require('../models/usermodels')
const bcrypt = require('bcryptjs')
const emailValidator = require('email-validator')
const sendMail = require('../Utils/sendMail')
const otpModel = require('../models/otpModel')
const crypto = require('crypto')

const mailOTP = async (req,res)=> {
     // Send and verify OTP sent to mail here
     const otp = Math.floor(100000 + Math.random() * 900000)

    const {email} = req.body
    try{
         // Send OTP to mail
     await sendMail(email, "OTP Verification", `Your OTP is ${otp}`)

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
        
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
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
try{

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
}catch(err){
    res.status(400).json({
        message:err.message, 
        success: false
    })

}
}

const deleteUser = async(req,res)=> {
try{
    if(!req.cookies.token){
        throw new Error('User not logged in')
    }

    await otpModel.findOneAndDelete({email: req.user.email}, {useFindAndModify: false})
    const user = await UserSchema.findOneAndDelete(req.user.email,{ useFindAndModify: false })
    if(!user) throw new Error('User does not exist')
    res.status(200).json({
        message: 'User deleted successfully',
        success: true,
        user
    })

}catch(err){
    res.status(400).json({
        message:err.message, 
        success: false
    })}
}


const forgotPassword = async(req,res)=> {
    const {email} = req.body
    try{
        if(!email){
            throw new Error('Email is required')
        }

        const user = await UserSchema.findOne({email})
        console.log(user);
        if(!user){
            throw new Error('User does not exist')
        }

        const resetPasswordToken = await user.createForgetPasswordToken()

        await user.save();

        const resetPasswordURL = `http://localhost:5173/reset-password/${resetPasswordToken}`
        const subject = 'Password Reset Request'
        const message = `<div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #333333;">Password Reset</h1>
        <p style="color: #555555;">Hello ${user.name},</p>
        <p style="color: #555555;">We received a request to reset your password. Click the link below to reset it:</p>
        <p style="margin: 20px 0; text-align: center;">
            <a href=${resetPasswordURL} style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 3px;">Reset Password</a>
        </p>
        <p style="color: #555555;">If you didn't request a password reset, you can ignore this email.</p>
        <p style="color: #555555;">Thank you!</p>
    </div>
    `

      await sendMail(email,subject,message)

        res.status(200).json({
            message: `Reset password link sent to ${email} successfully`,
            success: true
        })

    }catch(err){
        const user = await UserSchema.findOne({email})
        user.forgetPasswordToken = null
        user.forgetExpiery = null
        await user.save()
        res.status(400).json({
            message:err.message, 
            success: false
        })
    }
}

const resetPassword = async(req, res)=> {
    const {token} = req.params
    const {newPassword} = req.body
    console.log(token);
    console.log(newPassword);
    try{
        if(!newPassword){
            throw new Error('Please Enter Password')
        }
        
        const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')
        console.log("token is: " ,resetPasswordToken);
        const user = await UserSchema.findOne({
            forgetPasswordToken: resetPasswordToken,
            forgetExpiery: {$gt: Date.now()}
        }).select('+password')
        console.log(user);
        if(!user){
            throw new Error('Invalid token or token expired')
        }

        // update password
        user.password = newPassword
        user.forgetPasswordToken = null
        user.forgetExpiery = null

        await user.save()

        res.status(200).json({
            message: 'Password reset successfully',
            success: true
        })

    }catch(err){
        res.status(400).json({
            message:err.message, 
            success: false
        })
    }

}  ;

module.exports = {
    signup,
    login,
    logout,
    mailOTP,
    verifyOTP, 
    forgotPassword,
    resetPassword,
    deleteUser
}
