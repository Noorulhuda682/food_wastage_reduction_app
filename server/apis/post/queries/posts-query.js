const Post = require("../../../models/Post");

const posts = async (_, __, { dataSources }) =>  {
 

    let joinPosts = await Post.aggregate([
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

     console.log("joinPosts",JSON.stringify(joinPosts),joinPosts);

    return joinPosts.reverse();
}

module.exports = posts;

