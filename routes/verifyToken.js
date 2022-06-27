
const jwt=require("jsonwebtoken");

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err) 
        res.status(403).json("Token is not valid!");
        req.user=user;
        next();
    
})
    }
    else{
        return res.status(400).json("You are not authenticated");
    }
}

const verifyTokenAndAuthentication = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id==req.params.id || req.userisAdmin){
            next();
        }
        else{
            res.status(403).json("You are not allowed to do that");
        }
    })
}
const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if( req.userisAdmin){
            next();
        }
        else{
            res.status(403).json("You are not allowed to do that");
        }
    })
}
module.exports= {verifyToken,verifyTokenAndAuthentication,verifyTokenAndAdmin};