const Post = require("../../../models/Post");
const {RECEIVER_ADDED } = require("../../subscription-keys");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const updatePost = async (
    _,
   { 
    postId,   
    userId,
    title,
    description,
    quantity,
    weight,
    img1,
    img2,
    img3,
    status,
    receiverId,
   },
   {
    pubsub,
    checkToken,
    req,
    SECRET 
   }
   ) => {

    await checkToken(req,SECRET);
    

        var post = {};

        if(title) post.title = title;   
        if(description) post.description = description;   
        if(quantity) post.quantity = quantity;   
        if(weight) post.weight = weight;   
        if(img1) post.img1 = img1;   
        if(img2) post.img2 = img2;   
        if(img3) post.img3 = img3;   
        if(status) post.status = status;   
        if(receiverId) post.receiverId = receiverId;   
        

        let updatedPost = await Post.updateOne(
            {_id:postId,userId},
            { $set: post }
        );

        console.log("updatedPost===>",updatedPost);

        let checkUpdation = await Post.findOne({_id:postId})
        console.log("checkUpdation===>",checkUpdation);
       return checkUpdation;

}

module.exports = updatePost