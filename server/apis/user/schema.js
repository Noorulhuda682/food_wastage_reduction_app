const { gql } = require("apollo-server");
const user = gql`
  type Query {
    users: [User]
    validating: String
  }

  type Subscription {
    userAdded: [User]
  }

  type Mutation {
    addUser(name: String, email: String!, password: String!): LoginRes
    login(email: String, password: String): LoginRes

    addToken(userId: ID, token: String): String

    deleteUser(userId: ID): String
    updateUser(
      userId: ID!
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

  type LoginRes {
    token: String
    user: User
  }

  type User {
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
module.exports = user;
