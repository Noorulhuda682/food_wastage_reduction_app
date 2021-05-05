const { gql } = require('apollo-server');

const post = gql`
 extend type Query {
    posts: [Post]
 }

#  extend type Subscription {
#    # addPost(
#  }

 extend type Mutation {

   addPost(
      userId:String
      title:String
      description:String
      quantity:Int
      img1:String
      img2:String
      img3:String
   ):Post

 }

 type Post {
    _id:String
   userId:String
   title:String
   description:String
   quantity:Int
   img1:String
   img2:String
   img3:String
 }

` 
module.exports = post;