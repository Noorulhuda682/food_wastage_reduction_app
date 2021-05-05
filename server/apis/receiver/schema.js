const { gql } = require('apollo-server');
const user = gql`
 extend type Query {
    receivers: [Receiver]
 }

 extend type Subscription {
    receiverAdded:[Receiver]
 }

 extend type Mutation {

  addReceiver(name:String,email:String!,password:String!):LoginRes

 }


 type Receiver {
   name:String
   email:String
   _id:String
 }

` 
module.exports = user