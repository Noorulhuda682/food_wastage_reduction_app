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
    RECEIVER_ADDED
}