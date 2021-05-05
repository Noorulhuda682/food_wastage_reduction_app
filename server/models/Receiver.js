const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RECEIVER = new Schema({
     name : {
        type: String,
        required: 'Please supply a name',
        trim: true
     },
     email : {
        type : String,
        required : true,
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: 'Please Supply an email address'
     },
     password : {
        type:String,
        required : true 
     },
     profileImage:String,
     role:{
         type:String,
         default:"RECEIVER"
     }
}) 


const Receiver = mongoose.model('Receiver', RECEIVER);

module.exports = Receiver;