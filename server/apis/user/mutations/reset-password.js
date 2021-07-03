const User = require("../../../models/User");
const Receiver = require("../../../models/Receiver");
const bcrypt = require("bcryptjs");

const resetPassword = async (_, { code, newPassword }, {}) => {
  var user = await User.findOne({ verificationCode: code });
  if (!user) {
    user = await Receiver.findOne({ verificationCode: code });
    if (!user) throw new Error("Sorry! invalid otp code provided");
  }

  //   HASH PASSWORD
  let passwordHashed = await  bcrypt.hash(newPassword,12);

  // UPDATING OTP AND STATUS
  var { name, role, _id } = user;
  if (role === "USER") {
    await User.updateOne(
      { _id },
      { $set: { verificationCode: null, password:passwordHashed } }
    );
    user = await User.findOne({ _id });
  } else {
    await Receiver.updateOne(
      { _id },
      { $set: { verificationCode: null, password:passwordHashed } }
    );
    user = await Receiver.findOne({ _id });
  }
  console.log("user===", user);
  return "Password Reset is successfull";
};

module.exports = resetPassword;
