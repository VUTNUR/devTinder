const express = require("express");

const app = express();

// app.get("/user",(req,res)=>{
//     console.log(req.query)
//     console.log(req.params)
//     res.send({Name:"nethaji", age:27})
// })

// app.post("/user",(req,res)=>{
//     res.send("Data posted successfully")
// })

// app.delete("/user",(req,res)=>{
//     res.send("Deleted Successfully")
// })

// app.use("/",(req,res, next)=>{
// //    res.send("route1");
//    next()
// })

// app.get("/user",(req,res,next)=>{
//     console.log("hiii");
//     // res.send("Iam back");
//     next()
// },(req,res)=>{
//     console.log("2nd");
//     res.send("2nd back")
// })

// const {adminAuth}= require("./middlewares/auth")

// app.use('/admin',adminAuth);

app.get("/admin/getUser",(req,res)=>{
    try{
    throw new Error("Something went wrong")
    res.send("Hi iam user")
    }catch(err){
        res.status(500).send(err.message)
    }
})

app.use("/",(err,req,res,next)=>{
    // console.log("Iam in /")
    if(err){
      res.status(400).send("iam in /")
    }
    // console.log("iam in /")
    // res.send("Iam in /")
})



app.listen("7777",()=>{
    console.log("listening")
})