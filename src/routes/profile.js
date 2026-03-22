const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/auth")
const bcrypt = require("bcrypt")
const {validateEdit, validatePassword} = require("../utils/validate")
router.get("/profile/view", adminAuth, async(req,res)=>{
   const {user} = req
   res.send(user)
})

router.patch("/profile/edit", adminAuth, async(req,res)=>{
    try {
        if(!validateEdit(req.body)){
         throw new Error("Invalid Data")
       }
       const user = req.user;
       const responseBody = req.body;
       Object.keys(responseBody)?.forEach((key)=>user[key] = responseBody[key]);
       user.save();
       res.json({
        message : `${user?.firstName}, Your profile updated successfuly`
       })
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.patch("/profile/passwordEdit", adminAuth, async(req,res)=>{
    try{
       if(!validatePassword(req.body)){
        throw new Error("Invalid Data")
       }
       const {oldPassword, newPassword} = req.body;
       const user = req.user;
       if(!user?.bcrypt(oldPassword)){
        throw new Error("Pls give correct password")
       }
       const hashPassword = await bcrypt.hash(newPassword,10);
       user.password = hashPassword;
       user.save();
       res.json({
        message : "Password updated successfully",
        body:user
       })
    }catch(err){
      res.status(400).send(err.message)
    }
})

module.exports = router