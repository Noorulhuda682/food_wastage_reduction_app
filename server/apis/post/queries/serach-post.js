const { Aggregate } = require("mongoose");
const Post = require("../../../models/Post");

const searchPost = async (_, { text, userId }) => {
  Post.createIndexes({ "$**": "text" });
  //  console.log("Text",text);
  var match = {};
  if (userId) {
    match = {
      $match: {
        $text: { $search: text },
        userId,
      },
    };
  } else {
    match = {
      $match: {
        $text: { $search: text },
      },
    };
  }

  var aggregat = [
     match, 
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
  ];

  var postList = await Post.aggregate(aggregat).limit(10);

  return postList;
};

module.exports = searchPost;
