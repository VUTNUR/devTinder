const mongoose = require("mongoose");

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
        required: true
    },
    email :{
        type : String,
        required: true,
        unique : true,
        trim : true
    },
    skills :{
        type : [String]
    },
    about :{
       type: String,
       default:"Please add about yourself"
    }
},{ timestamps: true })

module.exports = mongoose.model("User", userSchema)