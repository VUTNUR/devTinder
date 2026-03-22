const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/auth")

router.get("/profile", adminAuth, async(req,res)=>{
   const {user} = req
   res.send(user)
})

module.exports = router