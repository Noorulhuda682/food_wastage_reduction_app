import { gql } from "@apollo/client";


const USERS = gql`
 query users{
    users{
      name
      email
      _id
      role
      profileImage
      pushToken
      latitude
      longitude
    }
  }
`


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
    }
  }
`;




export {
    USERS,
    USER_ADDED
}