const { gql } = require("apollo-server");
const user = gql`
  type Query {
    users: [User]
    validating: String
    getUser(userId:String!):User
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
      gender:String
      country: String
      city: String
      address: String
      contactNumber: Float
      dateOfBirth: String
    ): String

    verifyEmail(email:String!):String
    checkCode(code:Int!):User
    requestToResetPassword(email:String!):String
    resetPassword(code:Int! newPassword:String!):String
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
    gender:String
    country: String
    city: String
    address: String
    contactNumber: Float
    dateOfBirth: String
  }
`;
module.exports = user;
