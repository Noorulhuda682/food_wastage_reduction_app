const User = require("../../../models/User");
const Receiver = require("../../../models/Receiver");

const checkCode = async (_, { code }, {}) => {
  var user = await User.findOne({ verificationCode: code });
  if (!user) {
    user = await Receiver.findOne({ verificationCode: code });
    if (!user) throw new Error("Sorry! invalid otp code provided");
  }

  // UPDATING OTP AND STATUS
  var { name, role, _id } = user;
  if (role === "USER") {
    await User.updateOne(
      { _id },
      { $set: { verificationCode: null, verification: "VERIFIED" } }
    );
    user = await User.findOne({ _id });
  } else {
    await Receiver.updateOne(
      { _id },
      { $set: { verificationCode: null, verification: "VERIFIED" } }
    );
    user = await Receiver.findOne({ _id });
  }
  console.log("user===", user);
  return user;
};

module.exports = checkCode;
