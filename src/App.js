const express = require("express");

const app = express();

const connectDB = require("./config/database");

const User = require('./models/user');

const {validate} = require("./utils/validate")

const bcrypt = require("bcrypt")

app.use(express.json());


app.post("/signUp", async(req, res)=>{
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

app.get("/user", async(req,res)=>{
  const email = req.body.email;
  try{
    const user = await User.find({});
    res.send(user)
  }catch(err){
    res.status(400).send(err)
  }
})

app.delete("/user", async(req, res)=>{
  const id = req.body.id;
  try{
    const deleteUser = await User.findByIdAndDelete(id);
    res.send(deleteUser)
  }catch(err){
    res.status(400).send(err)
  }
})


app.patch("/user/:userId", async(req, res)=>{
  const params = req.params?.userId
  const obj = req.body
  try{
    const validFields=["skills","about","age"]
    const isValid= Object.keys(obj).every((val)=>validFields.includes(val));
    if(!isValid){
     throw new Error("Update not allowed")
    }
    const updateUser = await User.findByIdAndUpdate(params, obj, {returnDocument:"after"});
    res.send(updateUser)
  }catch(err){
    res.status(400).send(err.message)
  }
  // try{
  //   const updateUser = await User.findOneAndUpdate({email: email}, obj, {returnDocument:"after"});
  //   res.send(updateUser)
  // }catch(err){
  //   res.status(400).send(err)
  // }
})
connectDB()
  .then(() => {
    console.log("Connection Established");
    app.listen("7777", () => {
      console.log("listening");
    });
  })
  .catch((err) => {
    console.log("Connection not established");
  });
