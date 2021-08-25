import { gql } from "@apollo/client";

const RECEIVERS = gql`
query receivers{
    receivers{
      _id
      name
      email
      profileImage
      pushToken
      latitude
      longitude
    }
}
`

const UPDATE_RECEIVER = gql`
  mutation updateReceiver(
    $receiverId: ID!
    $name: String
    $email: String
    $profileImage: String
    $pushToken: String
    $latitude: Float
    $longitude: Float
    $verification: String
    $verificationCode: Int
    $country: String
    $gender:String
    $city: String
    $address: String
    $contactNumber: Float
    $dateOfBirth: String
  ) {
    updateReceiver(
      receiverId: $receiverId
      name: $name
      email: $email
      profileImage: $profileImage
      pushToken: $pushToken
      latitude: $latitude
      longitude: $longitude
      verification: $verification
      verificationCode: $verificationCode
      country: $country
      gender:$gender
      city: $city
      address: $address
      contactNumber: $contactNumber
      dateOfBirth: $dateOfBirth
    )
  }
`;

const DELETE_RECEIVER = gql`
  mutation deleteReceiver($receiverId:ID){
  deleteReceiver(receiverId:$receiverId)
  }
`;

const RECEIVER_ADDED = gql`
  subscription receiverAdded {
    receiverAdded {
      _id
      name
      email
      role
      profileImage
      pushToken
      latitude
      longitude
    }
  }
`;

const GET_RECEIVER = gql`
  query getReceiver($receiverId: String!) {
    getReceiver(receiverId: $receiverId) {
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
  RECEIVERS,
  RECEIVER_ADDED,
  UPDATE_RECEIVER,
  DELETE_RECEIVER,
  GET_RECEIVER
}