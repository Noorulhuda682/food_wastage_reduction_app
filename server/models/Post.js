const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const POST = Schema({
    userId:{
        type:String,
        require:true
    },
    title:{
       type:String,
       require:true
    },
    description:String,
    quantity:Number,
    img1:String,
    img2:String,
    img3:String
})

const Post = mongoose.model("Post",POST);

module.exports = Post; 