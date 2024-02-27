require('dotenv').config()
const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is requied"],
        MaxLength:[15,"name is too long"],
        MinLength:[2,"name is too short"],
        trim:true,  
},
email:{
    type:String,
    required:[true,"email is requied"],
    trim:true,
    unique:[true,"email is already used"],
},
password:{
    type:String,
    required:[true,"password is required"],
    select:false,

},

profileType:{
    type:String,
    default:"student",
}
},{timestamps:true})

UserSchema.methods = {
    createToken: function(){
        return JWT.sign({id:this._id},process.env.SECRET,{
            expiresIn:'24h'
        })
    }, 
}

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }else{
            this.password = await bcrypt.hash(this.password, 10);
          next();
    }
 })

module.exports = mongoose.model('usermodels',UserSchema)