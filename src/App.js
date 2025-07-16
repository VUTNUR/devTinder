const express = require("express");

const app = express();

app.use("/test",(req,res)=>{
    return res.send("Hello")
})

app.listen("7777",()=>{
    console.log("listening")
})