const posts = require("./posts-query")
const userPosts = require("./user-posts");
const searchPost = require("./serach-post");
const getPost  = require("./get-post");

const Query = {
  posts,
  userPosts,
  searchPost,
  getPost
}

module.exports = Query