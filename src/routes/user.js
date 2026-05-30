const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/auth");
const Connections = require("../models/connectionRequest");
const Users = require("../models/user")

const SAFE_DATA = "firstName lastName skills about photoUrl"

router.get("/user/requests/received",adminAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user;
        const recievedData = await Connections.find({
            toConnectionId: loggedInUser._id,
            status:"interested"
        }).populate("fromConnectionId", SAFE_DATA)
        res.json({data:recievedData})
    }catch(err){
      res.status(400).send("Error: "+err.message)
    }
})

router.get("/user/connections", adminAuth, async(req,res)=>{
    try{
       const loggedInUser = req.user;
       const connectionData = await Connections.find({
        $or:[
            {toConnectionId:loggedInUser._id, status:"accepted"},
            { fromConnectionId:loggedInUser._id, status:"accepted"}
        ]
       }).populate("fromConnectionId", SAFE_DATA).populate("toConnectionId", SAFE_DATA)
       const sendData = connectionData?.map((el)=>{
        if(el.fromConnectionId._id.toString() === loggedInUser._id.toString()){
            return el.toConnectionId
        }
        return el.fromConnectionId
       })
       res.json({data:sendData})
    }catch(err){
       res.status(400).send("Error: "+err.message)
    }
})

router.get("/user/feed",adminAuth, async(req,res)=>{
    try{
       const page = req.query.page || 1;
       const limit = req.query.limit || 10;
       const offset=(page - 1) * limit;
       const loggedInUser = req.user;
       const connections = await Connections.find({
         $or:[
            {toConnectionId:loggedInUser._id},
            {fromConnectionId:loggedInUser._id}
         ]
       })
       const hideUsers = new Set();
       connections.forEach((row)=>{
        hideUsers.add(row.toConnectionId.toString());
        hideUsers.add(row.fromConnectionId.toString())
       })
       const showUsers = await Users.find({
        $and:[
            {
                _id:{
                        $nin : Array.from(hideUsers)
                    }
            },
            {
                _id:{
                    $ne : loggedInUser._id
                }
            }
        ]
       }).select(SAFE_DATA).skip(offset).limit(limit)
       res.json({data:showUsers})
    }catch(err){
       res.status(400).send("Error: "+err.message)
    }
})
module.exports = router