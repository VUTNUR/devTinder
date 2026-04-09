const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/auth");
const { validateStatus } = require("../utils/validate");
const User = require("../models/user");
const Connection = require("../models/connectionRequest")

router.post("/request/send/:status/:toConnectionId", adminAuth, async(req,res)=>{
   try{
      const {user} = req;
      const status = req.params.status;
      const toConnectionId = req.params.toConnectionId;
      if(!validateStatus(status)){
         throw new Error("Invalid status")
      }
      const toUser = await User.findById(toConnectionId);
      if(!toUser){
         throw new Error("Invalid Request")
      }
      const isUnique = await Connection.findOne({
         $or: [
            {
               fromConnectionId: user._id,
               toConnectionId,
            },
            {
               fromConnectionId: toConnectionId,
               toConnectionId: user._id,
            },
         ],
      });

      if (isUnique) {
         throw new Error("Connection request already exists");
      }
      const newConnection = new Connection({
         fromConnectionId: user._id,
         toConnectionId,
         status
      })
      await newConnection.save()
      res.send("Connection sent successfully")
   }catch(err){
     res.status(400).send(err.message)
   }
})

router.post("/request/review/:status/:requestId",adminAuth,async(req,res)=>{
   try{
      const loggedInUser = req.user;
      const {status, requestId} = req.params;
      const allowedStatus = ["accepted","rejected"];
      if(!allowedStatus.includes(status)){
         throw new Error("Invalid status")
      }
      const connectionRequest = await Connection.findOne({
         _id:requestId,
         toConnectionId:loggedInUser._id,
         status:"interested"
      })
      if(!connectionRequest){
         throw new Error("Connect request not found")
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({message:"Connection request "+status, data})
   }catch(err){
      res.status(400).send(err.message)
   }
})

module.exports = router
