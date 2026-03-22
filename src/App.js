const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./config/database");
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);



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
