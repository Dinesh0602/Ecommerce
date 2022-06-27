const express= require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

const authRoute = require("./routes/auth");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Succesfull!");
})
.catch((err)=>{
    console.log(err);
})

app.use(express.json());
app.use("api/auth", authRoute);
app.use("api/users", userRoute);
app.use("api/products", productRoute);
app.use("api/carts",cartRoute);
app.use("api/order",orderRoute);

app.listen(5000,()=>{
    console.log("Backend is running");
})