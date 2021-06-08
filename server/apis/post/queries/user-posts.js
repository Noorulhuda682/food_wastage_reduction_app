const Post = require("../../../models/Post");

const userPosts = async (_, {userId}, { dataSources }) =>  {
 
    let userPosts = await Post.find({userId});

    return userPosts
}

module.exports = userPosts;

