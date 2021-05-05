const { gql } = require('apollo-server');
const user = gql`
 type Query {
    users: [User]
    validate:String
 }

 type Subscription {
      userAdded:[User]
 }

 type Mutation {

  addUser(name:String,email:String!,password:String!):LoginRes
  login(
    email:String
    password:String
  ):LoginRes
  
  addToken(
   userId:ID
   token:String
  ):String
 }

 type LoginRes {
    token:String
    user:User
 }


 type User {
   name:String
   email:String
   _id:String
 }

` 
module.exports = user