const Post = require("../../../models/Post");
const {POST_ADDED } = require("../../subscription-keys");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const deletePost = async (_, { postId },{ pubsub,SECRET }) => {
    
    let deletePost = await Post.deleteOne({_id:postId});
    console.log("deleteReceiver===>",deletePost.deletedCount);
    if(!deletePost.deletedCount) throw new Error("No post found..") 

    // SUBSCRIPTION
    let posts = await Post.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "receivers",
            localField: "receiverId",
            foreignField: "_id",
            as: "receiver",
          },
        },
      ]);
      
      posts = posts.reverse();
      pubsub.publish(POST_ADDED, {
        postAdded: posts,
      });
  


    return "Post deleted successfully"
}

module.exports = deletePost