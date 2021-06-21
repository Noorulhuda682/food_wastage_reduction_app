import { gql } from "@apollo/client";


const ADDUSER = gql`
mutation addUser($name:String $email:String! $password:String!){
  addUser(name:$name email:$email password:$password){
    token
    user{
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
}
`
const ADDRECEIVER = gql`
mutation addReceiver($name:String $email:String! $password:String!){
  addReceiver(name:$name email:$email password:$password){
    token
    user{
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
}
`

const LOGIN = gql`
 mutation login($email:String! $password:String!){
  login(email:$email password:$password){
    token
    user {
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
}
`;




export {
  ADDUSER,
  ADDRECEIVER,
  LOGIN
}