const posts = require("./posts-query")
const userPosts = require("./user-posts");
const searchPost = require("./serach-post");

const Query = {
  posts,
  userPosts,
  searchPost
}

module.exports = Query