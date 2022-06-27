const router=require("express").Router();
const Order = require("../models/Order");
const {verifyToken,verifyTokenAndAuthentication,verifyTokenAndAdmin} = require("./verifyToken");

//CREATE Order

router.post("/",verifyToken,async(req,res)=>{
const newOrder = new Cart(req.body);

try{
const savedOrder = await newOrder.save();
res.status(200).json(savedOrder);
}
catch(err){
res.status(500).json(err);
}
})

//UPDATE

router.put("/:id",verifyTokenAndAdmin,async (req,res)=>{

try{
    const updatedOrder=await Order.findByIdAndUpdate(req.params.id,{
        $set: req.body
    },{new:true})
    res.status(200).json(updatedOrder);
}
catch(err){
res.status(500).json(err);
}
})


//Delete

router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted");
    }
    catch(err){
res.status(500).json(err);
    }
})

//Get User Cart

router.get("/find/:userId", verifyTokenAndAuthentication ,async(req,res)=>{
try{
    const orders= await Order.find({userId:req.params.userId});

    res.status(200).json(orders);
}
catch(err){
res.status(500).json(err);
}
})

//Get All 

router.get("/",verifyTokenAndAdmin, async(req,res)=>{
    try{
        const orders= await Order.find();
       
        res.status(200).json(orders);
    }
    catch(err){
    res.status(500).json(err);
    }
    })




module.exports=router