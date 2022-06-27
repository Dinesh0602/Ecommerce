const router=require("express").Router();
const User = require("../models/User");
const {verifyToken,verifyTokenAndAuthentication,verifyTokenAndAdmin} = require("./verifyToken");

//UPDATE

router.put("/:id",verifyTokenAndAuthentication,async (req,res)=>{
    if(req.body.password){
        require.body.password=Crypto.AESencrypt(req.body.password,process.env.PASS_SECRET).tostring();

    }

try{
    const updatedUser=await User.findByIdAndUpdate(req.params.id,{
        $set: req.body
    },{new:true})
    res.status(200).json(updatedUser);
}
catch(err){
res.status(500).json(err);
}
})


//Delete

router.delete("/:id",verifyTokenAndAuthentication,async(req,res)=>{
    try{
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    }
    catch(err){
res.status(500).json(err);
    }
})

//Get User

router.get("/find/:id", verifyTokenAndAdmin,async(req,res)=>{
try{
    const user= await User.findById(req.params.id);
    const {password, ...others}=user._doc;
    res.status(200).json(others);
}
catch(err){
res.status(500).json(err);
}
})

//Get All Users

router.get("/", verifyTokenAndAdmin,async(req,res)=>{
    try{
        const user= await User.find();
       
        res.status(200).json(users);
    }
    catch(err){
    res.status(500).json(err);
    }
    })

module.exports=router