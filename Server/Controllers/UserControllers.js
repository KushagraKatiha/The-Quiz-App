const UserSchema  = require('../models/usermodels')

const signup = async(req,res)=> {
    const {name,email,password,confirmPassword,profileType} = req.body
    try{
        if(!name || !email || !password || !confirmPassword || !profileType){
            throw new Error('All fields are required')
        }

        if(password !== confirmPassword){
            throw new Error('Passwords do not match')
        }

        // Check if user already exists
        const userExists = await UserSchema
        .findOne({email})
        
        if(userExists){
            throw new Error('User already exists')
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

        console.log(user);
        
        if(!user){
            throw new Error('User does not exist')
        }
        
        if(user.password !== password){
            throw new Error('Invalid credentials')
        }

        const token = user.createToken()

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
    logout
}
