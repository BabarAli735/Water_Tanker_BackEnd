const mongoose = require("mongoose");
const validator=require('validator')
const bycrypt=require('bcryptjs')
const otpSchema= new mongoose.Schema({
    Otp:{
        type:Number,
    },
    email:{
        type:String,
        require:[true,'Please Provide Your Email'],
        lowercase:true,
        validate:[validator.isEmail,'Please Provie a valid Email']
    }
 
})

const Otp=mongoose.model('Otp',otpSchema)

  module.exports=Otp