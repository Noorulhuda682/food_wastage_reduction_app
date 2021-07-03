const { gql } = require('apollo-server');

const post = gql`
 extend type Query {
    posts(status:String userId:String receiverId:String): [Post]
    userPosts(userId:ID):[Post]
    searchPost(text:String userId:String):[Post]
    getPost(postId:String!):Post
 }

 extend type Subscription {
   postAdded:[Post]
 }


 extend type Mutation {
   addPost(
      userId:String!
      title:String
      description:String
      quantity:Int
      weight:String
      img1:String
      img2:String
      img3:String
      status:String
      receiverId:String
   ):Post

   updatePost(
      postId:String!
      userId:String!
      title:String
      description:String
      quantity:Int
      weight:String
      img1:String
      img2:String
      img3:String
      status:String
      receiverId:String
   ):Post

   deletePost(postId:String!):String
 }

  type Post {
   _id:String
   userId:String
   title:String
   description:String
   quantity:Int
   weight:String
   img1:String
   img2:String
   img3:String
   status:String
   receiverId:String,
   user:[User]
   receiver:[Receiver]
 }

` 
module.exports = post;