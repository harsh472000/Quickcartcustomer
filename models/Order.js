const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const order=new Schema({
    ProductName:{
        type:String,
        required:true
    },
    ProductId:{
        type:String
    },
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    ZipCode:{
        type:String,
        required:true
    },
    ContactNo:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    }
},{timestamps:true});
const Order=mongoose.model('Order',order);
module.exports=Order;