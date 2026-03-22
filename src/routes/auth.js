const express = require("express");
const router = express.Router();
const {validate} = require("../utils/validate");
const User = require('../models/user');
const validator = require("validator")
const bcrypt = require("bcrypt")

router.post("/signUp", async(req, res)=>{
    try{
        validate(req);
        const {firstName, lastName, password, email} = req.body;
        const hashPassword =await bcrypt.hash(password, 10)
        const user = new User({
          firstName,
          lastName,
          password:hashPassword,
          email
        })
        await user.save();
        res.send("User Added Successfully")
    }catch(err){
       res.status(400).send("Error : "+err.message)
    }
})
router.post("/login", async(req, res)=>{
    try{
        const {email, password} = req.body;
        if(!validator.isEmail(email)){
          throw new Error("Invalid Credentials")
        }
        const user = await User.findOne({email})
        if(user){
          const isPasswordCorrect= user.bcrypt(password)
          if(isPasswordCorrect){
            const token = user.getJwtToken()
            res.cookie('token', token);
            res.send("Logged In Successfully");
          }else{
            throw new Error("Invalid Credentials")
          }     
        }else{
          throw new Error("Invalid Credentials")
        }
    }catch(err){
       res.status(400).send("Error : "+err.message)
    }
})

module.exports = router