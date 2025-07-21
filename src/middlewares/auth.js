const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAuthenticated = token === "xyzpp";
    if(!isAuthenticated){
        res.status(401).send("User not autherised")
    }else{
        next()
    }
}

module.exports={adminAuth}