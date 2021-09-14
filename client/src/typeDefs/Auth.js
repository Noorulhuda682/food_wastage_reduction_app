import { gql } from '@apollo/client';

const ADDUSER = gql`
  mutation addUser($name: String, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
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
`;
const ADDRECEIVER = gql`
  mutation addReceiver($name: String, $email: String!, $password: String!) {
    addReceiver(name: $name, email: $email, password: $password) {
      token
      user {
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
`;

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
        gender
        address
        contactNumber
        dateOfBirth
      }
    }
  }
`;

const CHECK_CODE = gql`
  mutation checkCode($code: Int!) {
    checkCode(code: $code) {
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
      gender
      country
      city
      address
      contactNumber
      dateOfBirth
    }
  }
`;

const REQUEST_TO_RESET_PASSWORD = gql`
  mutation requestToResetPassword($email: String!) {
    requestToResetPassword(email: $email)
  }
`

const RESET_PASSWORD = gql`
   mutation resetPassword($code:Int!, $newPassword: String!) {
    resetPassword(code:$code, newPassword: $newPassword)
  }
`
const VERIFY_EMAIL = gql`
  mutation verifyEmail($email: String!) {
    verifyEmail(email: $email)
  }
`


export { ADDUSER, ADDRECEIVER, LOGIN, CHECK_CODE, REQUEST_TO_RESET_PASSWORD, RESET_PASSWORD, VERIFY_EMAIL };
