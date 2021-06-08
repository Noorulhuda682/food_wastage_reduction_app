const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const POST = Schema({
    userId:{ type: mongoose.Schema.ObjectId},
    title:{
       type:String,
       require:true
    },
    description:String,
    quantity:Number,
    weight:String,
    img1:String,
    img2:String,
    img3:String,
    status:{
     type:String,
     default:"NEW"
    },
    receiverId:{type: mongoose.Schema.ObjectId},

})

const Post = mongoose.model("Post",POST);

module.exports = Post; 