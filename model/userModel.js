const mongoose = require("mongoose");
const validator=require('validator')
const bycrypt=require('bcryptjs')
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        require:[true,'Please tell us Your Name']
    },
    email:{
        type:String,
        require:[true,'Please Provide Your Email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please Provie a valid Email']
    },
    photo:String,
    type:{
        type:String,
        require:[true,'Please mention User Type'],
    },
    password:{
        type:String,
        require:[true,'Please Provide Password'],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        select:false,
        require:[true,'Please Confirm your Password'],
        validate:{
            validator:function(el){
                return el===this.password
            },
            message:'Passwords are not same'
        }
    },
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()

    this.password=await bycrypt.hash(this.password,12)
    this.passwordConfirm=undefined
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bycrypt.compare(candidatePassword, userPassword);
  };
const User=mongoose.model('User',userSchema)

  module.exports=User