const Post = require("../../../models/Post");
const {RECEIVER_ADDED } = require("../../subscription-keys");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const addPost = async (
    _,
   { 
    userId,
    title,
    description,
    quantity,
    img1,
    img2,
    img3,
   },
   {
    pubsub,
    checkToken,
    req,
    SECRET 
   }
   ) => {

    await checkToken(req,SECRET);
       
        var post = {
          userId,
          title,
          description,
          quantity,
          img1,
        }

        if(img2) post.img2 = img2
        if(img3) post.img3 = img3

        const newPost = new Post(post);
        const added = await newPost.save()
        .then( res => {
            return res
        }).catch( e => {
            throw new Error("Error : ", e)
        })
        console.log("added",added);
       return added;

}

module.exports = addPost