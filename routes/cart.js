const router=require("express").Router();
const Cart = require("../models/Cart");
const {verifyToken,verifyTokenAndAuthentication,verifyTokenAndAdmin} = require("./verifyToken");

//CREATE CART

router.post("/",verifyToken,async(req,res)=>{
const newCart = new Cart(req.body);

try{
const savedCart = await newCart.save();
res.status(200).json(savedCart);
}
catch(err){
res.status(500).json(err);
}
})

//UPDATE

router.put("/:id",verifyTokenAndAuthentication,async (req,res)=>{

try{
    const updatedCart=await Cart.findByIdAndUpdate(req.params.id,{
        $set: req.body
    },{new:true})
    res.status(200).json(updatedCart);
}
catch(err){
res.status(500).json(err);
}
})


//Delete

router.delete("/:id",verifyTokenAndAuthentication,async(req,res)=>{
    try{
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted");
    }
    catch(err){
res.status(500).json(err);
    }
})

//Get User Cart

router.get("/find/:userId", verifyTokenAndAuthentication ,async(req,res)=>{
try{
    const cart= await Cart.findOne({userId:req.params.userId});

    res.status(200).json(cart);
}
catch(err){
res.status(500).json(err);
}
})

//Get All 

router.get("/",verifyTokenAndAdmin, async(req,res)=>{
    try{
        const carts= await Product.find();
       
        res.status(200).json(carts);
    }
    catch(err){
    res.status(500).json(err);
    }
    })

module.exports=router