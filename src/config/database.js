const mongoose = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://vutnurnethajigoud:7HNrEeOzzq8iF1ba@cluster0.oe3houc.mongodb.net/devTinder")
}

module.exports = connectDB