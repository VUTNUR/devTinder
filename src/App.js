const express = require("express");

const app = express();

const connectDB = require("./config/database");

const User = require('./models/user');

app.use(express.json())

app.post("/signUp", async(req, res)=>{
    const user = new User(req.body)
    try{
        await user.save();
        res.send("User Added Successfully")
    }catch(err){
       res.status(400).send(err)
    }
})

app.get("/user", async(req,res)=>{
  const email = req.body.email;
  try{
    const user = await User.find({email : email});
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


app.patch("/user", async(req, res)=>{
  const email = req.body.email;
  const obj = req.body
  try{
    const updateUser = await User.findByIdAndUpdate(id, obj, {returnDocument:"after"});
    res.send(updateUser)
  }catch(err){
    res.status(400).send(err)
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
