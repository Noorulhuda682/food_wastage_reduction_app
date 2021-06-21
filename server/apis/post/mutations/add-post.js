const Post = require("../../../models/Post");
const Receiver = require("../../../models/Receiver");
const {POST_ADDED } = require("../../subscription-keys");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const sendNotification = require("../../utils/sendNotification");

const addPost = async (
    _,
   { 
    userId,
    title,
    description,
    quantity,
    weight,
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

    // await checkToken(req,SECRET);
       
        var post = {
          userId,
          title,
          description,
          quantity,
          weight,
        }
        if(img1) post.img1 = img1
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


      let posts = await Post.aggregate([
        {
          $lookup:
            {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user"
            }
       },
       {
           $lookup:
           {
            from: "receivers",
            localField: "receiverId",
            foreignField: "_id",
            as:"receiver"
           }
       }
     ])
     posts = posts.reverse()
      pubsub.publish(POST_ADDED,{
        postAdded : posts
      })

     
     await sendNotification(post)

     return added;
}

module.exports = addPost
