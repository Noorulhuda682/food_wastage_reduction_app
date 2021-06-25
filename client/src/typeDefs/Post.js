import { gql } from '@apollo/client';

const USER = `
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
`
const RECEIVER = `
receiver {
  _id
  name
  email
  profileImage
  pushToken
  latitude
  longitude
}
`

const ADDPOST = gql`
  mutation addPost(
    $userId: String!
    $title: String
    $description: String
    $quantity: Int
    $weight: String
    $img1: String
    $img2: String
    $img3: String
  ) {
    addPost(
      userId: $userId
      title: $title
      description: $description
      quantity: $quantity
      weight: $weight
      img1: $img1
      img2: $img2
      img3: $img3
    ) {
      _id
      userId
      title
      description
      quantity
      weight
      img1
      img2
      img3
    }
  }
`;

const TEST = gql`
  mutation test($data: String) {
    test(data: $data)
  }
`;

const MYPOSTS = gql`
  query posts($userId: ID) {
    userPosts(userId: $userId) {
      _id
      userId
      title
      description
      quantity
      weight
      img1
      img2
      img3
    }
  }
`;

const POSTS = gql`
  query posts($status: String $userId:String) {
    posts(status: $status userId:$userId) {
      _id
      userId
      title
      description
      quantity
      weight
      img1
      img2
      img3
      status
      receiverId
      ${USER}
      ${RECEIVER}
    }
  }
`;

const POST_ADDED = gql`
  subscription postAdded {
    postAdded {
      _id
      userId
      title
      description
      quantity
      weight
      img1
      img2
      img3
      status
      receiverId
      ${USER}
      ${RECEIVER}
    }
  }
`;


export { ADDPOST, MYPOSTS, TEST, POSTS, POST_ADDED };
