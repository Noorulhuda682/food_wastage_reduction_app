const { gql } = require('apollo-server');
const receiver = gql`
 extend type Query {
    receivers: [Receiver]
 }

 extend type Subscription {
    receiverAdded:[Receiver]
 }



 extend type Mutation {
  addReceiver(name:String,email:String!,password:String!):LoginRes
  deleteReceiver(receiverId:ID):String
  updateReceiver(
     receiverId:ID!
     name:String
     email:String
     profileImage:String
     pushToken:String
     latitude:Float
     longitude:Float
   ):String
 }


 type Receiver {
   _id:String
   name:String
   email:String
   profileImage:String
   pushToken:String
   latitude:Float
   longitude:Float
 }

` 
module.exports = receiver