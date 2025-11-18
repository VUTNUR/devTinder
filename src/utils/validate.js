const validator = require("validator")

const validate=(req)=>{
  const {firstName, lastName, password, email} = req.body;
  if(firstName.length < 4 || firstName.length > 30){
     throw new Error("First Name should be in between 4 to 30 characters");
  }else if(lastName.length < 4 || lastName.length > 30){
     throw new Error("Last Name should be in between 4 to 30 characters");
  }else if(!validator.isEmail(email)){
    throw new Error("Please give correct email")
  }else if(!validator.isStrongPassword(password)){
    throw new Error("Please give strong password")
  }
}

module.exports={validate}