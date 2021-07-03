const User = require("../../../models/User");
const Receiver = require("../../../models/Receiver");
const { USER_ADDED } = require("../../subscription-keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../utils/sendEmail");

const requestToResetPassword = async (_, { email }, { pubsub, SECRET }) => {
  let checkUser = await User.findOne({ email });

  if (!checkUser) {
    checkUser = await Receiver.findOne({ email });
    if (!checkUser) throw new Error("No user found with the given email");
  }

  // console.log("checkUser", checkUser);
  let template_id = "d-2bce1fa1a717427993ffbbe88f7d31a2";
  let {name,role,_id} = checkUser;
  var verificationCode = await sendEmail({ template_id, name, email });

  // SETTING OTP
  if(role === "USER"){
      await User.updateOne({ _id}, { $set: {verificationCode} });
  }else{
    await Receiver.updateOne({ _id }, { $set: {verificationCode} });
  }

  return "request successfull";
};

module.exports = requestToResetPassword;
