import { gql } from "@apollo/client";


const ADDPOST = gql`
mutation addPost($userId:String! $title:String $description:String $quantity:Int $weight:String $img1:String $img2:String $img3:String){
  addPost(userId:$userId title:$title description:$description quantity:$quantity weight:$weight img1:$img1 img2:$img2 img3:$img3){
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
`

const TEST = gql`
mutation test($data:String){
  test(data:$data)
}
`


const MYPOSTS = gql`
query posts($userId:ID){
  userPosts(userId:$userId){
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
`

const POSTS = gql`
query posts($status:String){
  posts(status:$status){
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
    receiver{
        _id
        name
      email
     profileImage
    pushToken
    latitude
    longitude
    }
    
  }
}
`



export {
  ADDPOST,
  MYPOSTS,
  TEST,
  POSTS
}