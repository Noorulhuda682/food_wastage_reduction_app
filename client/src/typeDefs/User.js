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


export {
    USERS,
    RECEIVERS
}