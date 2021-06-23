const { gql } = require("apollo-server");
const receiver = gql`
  extend type Query {
    receivers: [Receiver]
    getReceiver(receiverId:String!):Receiver
  }

  extend type Subscription {
    receiverAdded: [Receiver]
  }

  extend type Mutation {
    addReceiver(name: String, email: String!, password: String!): LoginRes
    deleteReceiver(receiverId: ID): String
    updateReceiver(
      receiverId: ID!
      name: String
      email: String
      profileImage: String
      pushToken: String
      latitude: Float
      longitude: Float
      verification: String
      verificationCode: Int
      country: String
      city: String
      address: String
      contactNumber: Float
      dateOfBirth: String
    ): String
  }

  type Receiver {
    _id: String
    name: String
    email: String
    role: String
    profileImage: String
    pushToken: String
    latitude: Float
    longitude: Float
    verification: String
    verificationCode: Int
    country: String
    city: String
    address: String
    contactNumber: Float
    dateOfBirth: String
  }
`;
module.exports = receiver;
