import { gql } from '@apollo/client';

const USERS = gql`
  query users {
    users {
      name
      email
      _id
      role
      profileImage
      pushToken
      latitude
      longitude
      verification
      verificationCode
      country
      city
      address
      contactNumber
      dateOfBirth
    }
  }
`;

const USER_ADDED = gql`
  subscription userAdded {
    userAdded {
      _id
      name
      email
      role
      profileImage
      pushToken
      latitude
      longitude
      verification
      verificationCode
      country
      city
      address
      contactNumber
      dateOfBirth
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $userId: ID!
    $name: String
    $email: String
    $profileImage: String
    $pushToken: String
    $latitude: Float
    $longitude: Float
    $verification: String
    $verificationCode: Int
    $country: String
    $city: String
    $address: String
    $contactNumber: Float
    $dateOfBirth: String
  ) {
    updateUser(
      userId: $userId
      name: $name
      email: $email
      profileImage: $profileImage
      pushToken: $pushToken
      latitude: $latitude
      longitude: $longitude
      verification: $verification
      verificationCode: $verificationCode
      country: $country
      city: $city
      address: $address
      contactNumber: $contactNumber
      dateOfBirth: $dateOfBirth
    )
  }
`;




const DELETE_USER = gql`
  mutation deleteUser($userId:ID){
  deleteUser(userId:$userId)
  }
`;

const GET_USER = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      _id
      name
      email
      role
      profileImage
      pushToken
      latitude
      longitude
      verification
      verificationCode
      country
      city
      address
      contactNumber
      dateOfBirth
    }
  }
`;

export {
  USERS,
  USER_ADDED,
  UPDATE_USER,
  GET_USER,
  DELETE_USER
};
