const User = require("../../../models/User");
const { USER_ADDED } = require("../../subscription-keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {sendEmail} = require("../../utils/sendEmail");
// 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

const addUser = async (_, { name, email, password }, { pubsub, SECRET }) => {

  let checkUser = await User.findOne({ email });
  if (checkUser) throw new Error("user already exists with this email");

  

  var verificationCode = await sendEmail({name,email})

  // hash password
  let passwordHashed = await  bcrypt.hash(password,12);

  var user = {
      name,
      email,
      password:passwordHashed,
      verificationCode
  }
  const newUser = new User(user);
  const added = await newUser.save()
  .then( () => {
      return true
  }).catch( e => {
      console.log({message : e.message})
      return false
  })
 
  // SUBSCRIPTION 
  const users = await User.find()
  pubsub.publish(USER_ADDED,{
    userAdded : users.reverse()
  })

  const token = await jwt.sign(
    {user},
    SECRET,
    // this token will last for a year, this should be adjusted accordingly
    { expiresIn: '1h' }
  )
  user = await User.findOne({email})
  console.log("USERADDED===",user);
  if(added){
    return {
      token,
      user
    }
  }
};

module.exports = addUser;
