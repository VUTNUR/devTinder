const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required: true
    },
    lastName : {
       type : String
    },
    age :{
        type : Number
    },
    gender : {
        type : String,
        validate(value){
          if(!["male","female","others"].includes(value)){
            throw new Error("Gender is not valid")
          }
        }
    },
    password : {
        type : String,
        required: true,
        validate(val){
         if(!validator.isStrongPassword(val)){
            throw new Error("Give strong password")
         }
        }
    },
    email :{
        type : String,
        required: true,
        unique : true,
        trim : true,
        validate(val){
         if(!validator.isEmail(val)){
            throw new Error("Please give correct email")
         }
        }
    },
    skills :{
        type : [String]
    },
    about :{
       type: String,
       default:"Please add about yourself"
    }
},{ timestamps: true })

userSchema.methods.getJwtToken = function(){
    const user = this;
    const token = jwt.sign({ _id : user?._id}, 'SDFJBKJSDBAKJSDASAS', { expiresIn: '1h' });
    return token
}

userSchema.methods.bcrypt = async function(passwordByUser){
    const user = this;
    const isPasswordCorrect= await bcrypt.compare(passwordByUser, user?.password);
    return isPasswordCorrect
}

module.exports = mongoose.model("User", userSchema)