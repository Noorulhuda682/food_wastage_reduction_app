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


export {
  RECEIVERS,
  RECEIVER_ADDED,
  UPDATE_RECEIVER,
  DELETE_RECEIVER
}