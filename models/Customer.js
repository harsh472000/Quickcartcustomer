const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const customer=new Schema({
    uname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    passwd:{
        type:String,
        required:true
    }
},{timestamps:true});
const Customer=mongoose.model('Customer',customer);
module.exports=Customer;