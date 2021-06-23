const Post = require("../../../models/Post");

const getPost =  async (_, {postId}, { dataSources }) => {
    let post = await  Post.findOne({_id:postId}) 
    return post;
} 

module.exports = getPost;

