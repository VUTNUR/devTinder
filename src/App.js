const express = require("express");

const app = express();

app.get("/user",(req,res)=>{
    console.log(req.query)
    console.log(req.params)
    res.send({Name:"nethaji", age:27})
})

app.post("/user",(req,res)=>{
    res.send("Data posted successfully")
})

app.delete("/user",(req,res)=>{
    res.send("Deleted Successfully")
})

app.listen("7777",()=>{
    console.log("listening")
})