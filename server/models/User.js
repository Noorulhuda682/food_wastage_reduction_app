const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const USER = new Schema({
     name : String,
     email : {
          type : String,
          required : true,
     },
     password : {
        type:String,
        required : true 
     },
     profileImage:String,
     role:{
         type:String,
         default:"USER"
     },
     token:String
}) 

const Users =  mongoose.models.User || mongoose.model('User', USER)

module.exports =  Users;