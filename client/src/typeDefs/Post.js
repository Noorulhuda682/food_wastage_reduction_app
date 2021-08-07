import {gql} from '@apollo/client';

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
  verification
  verificationCode
  country
  city
  address
  contactNumber
  dateOfBirth
}
`;

const RECEIVER = `
receiver {
  _id
  name
  email
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
`;

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

const UPDATEPOST = gql`
  mutation updatePost(
    $postId: String!
    $userId: String!
    $title: String
    $description: String
    $quantity: Int
    $weight: String
    $img1: String
    $img2: String
    $img3: String
    $status: String
    $receiverId: String
  ) {
    updatePost(
      postId: $postId
      userId: $userId
      title: $title
      description: $description
      quantity: $quantity
      weight: $weight
      img1: $img1
      img2: $img2
      img3: $img3
      status: $status
      receiverId: $receiverId
    ) {
      _id
      userId
      title
    }
  }
`;

const DELETEPOST = gql`
  mutation deletePost($postId: String!) {
    deletePost(postId: $postId)
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
  query posts($status: String $userId:String $receiverId:String) {
    posts(status: $status userId:$userId receiverId:$receiverId) {
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

export {ADDPOST, MYPOSTS, TEST, POSTS, POST_ADDED, UPDATEPOST, DELETEPOST};
