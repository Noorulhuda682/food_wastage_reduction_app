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

  deleteUser(userId:ID):String
  updateUser(
     userId:ID!
     name:String
     email:String
     profileImage:String
     token:String
     latitude:Float
     longitude:Float
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
   role:String
   profileImage:String
   token:String
   latitude:Float
   longitude:Float
 }

` 
module.exports = user