const Post = require("../../../models/Post");

const posts = async (_, __, { dataSources }) =>  {
 
    let posts = await Post.find();

    return posts
}

module.exports = posts;

