const Post = require("../../../models/Post");

const posts = async (_,{status} , { dataSources }) => {

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
  
  if(status){
    aggregat.push({ $match:{status} })
  }

  let joinPosts = await Post.aggregate(aggregat);

  console.log("joinPosts", JSON.stringify(joinPosts), joinPosts);

  return joinPosts.reverse();
};

module.exports = posts;
