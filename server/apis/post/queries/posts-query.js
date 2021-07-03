const Post = require("../../../models/Post");
const mongoose = require("mongoose");

const posts = async (_,{status,userId,receiverId}, { dataSources }) => {

  var aggregat = [
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
  ]
  
  var match = {}
  if(userId) match.userId = mongoose.Types.ObjectId(userId)
  if(receiverId) match.receiverId = mongoose.Types.ObjectId(receiverId)
  if(status) match.status = status;
  
 
  console.log("AGGREgate",match);
  aggregat.push({ $match:match })



  let joinPosts = await Post.aggregate(aggregat);

  console.log("joinPosts", JSON.stringify(joinPosts), joinPosts);

  return joinPosts.reverse();
};

module.exports = posts;
