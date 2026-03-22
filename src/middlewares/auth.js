const jwt = require("jsonwebtoken");
const User = require("../models/user");
const adminAuth = async (req,res,next)=>{
    try{
      const token = req.cookies?.token;
      console.log("token",token)
      if(!token){
        throw new Error("Need Token!")
      }
      const decoded = jwt.verify(token, 'SDFJBKJSDBAKJSDASAS');
      const {_id} = decoded;
      if(_id){
        const user = await User.findById(_id);
        req.user = user;
        next()
      }else{
        throw new Error("Invalid Token")
      }
    }catch(err){
        res.status(400).send(err.message)
    }
}

module.exports= adminAuth