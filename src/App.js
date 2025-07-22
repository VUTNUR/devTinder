const express = require("express");

const app = express();

const connectDB = require("./config/database");

const User = require('./models/user');

app.post("/signUp", async(req, res)=>{
    const user = new User({
        firstName : "Nethaji",
        lastName : "Goud",
        age : 27,
        gender : "male",
        email : "vng@gmail.com"
    })
    try{
        await user.save();
        res.send("User Added Successfully")
    }catch(err){
       res.status(400).send(err)
    }
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
