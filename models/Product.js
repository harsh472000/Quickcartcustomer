const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const product=new Schema({
    ProductName:{
        type:String,
        required:true
    },
    stock:{
        type:String
    },
    category:{
        type:String
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true});

const Product=mongoose.model('Product',product);
module.exports=Product;