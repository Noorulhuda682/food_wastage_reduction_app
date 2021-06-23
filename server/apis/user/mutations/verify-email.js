const User = require("../../../models/User");
const Receiver = require("../../../models/Receiver");
const {sendEmail} = require("../../utils/sendEmail");

const verifyEmail = async (_,{email},{}) => {

  var user = await  User.findOne({email});
  if(!user){
       user = await  Receiver.findOne({email});
      if(!user) throw new Error("Sorry! no user found with that email") 
  }

  // UPDATING OTP
  var {name,role,_id} = user;
  var verificationCode = await sendEmail({name,email})
  if(role === "USER"){
      await User.updateOne({ _id}, { $set: {verificationCode} });
  }else{
    await Receiver.updateOne({ _id }, { $set: {verificationCode} });
  }

  return "verify email request is sucessfull"
}

module.exports = verifyEmail;