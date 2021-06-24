const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const USER = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: String,
  pushToken: String,
  role: {
    type: String,
    default: "USER",
  },
  latitude:Number,
  longitude:Number,
  verification: {
    type: String,
    default: "NOT_VERIFIED",
  },
  verificationCode: Number,
  gender:String,
  country: String,
  city: String,
  address: String,
  contactNumber: Number,
  dateOfBirth: String,
});

const Users = mongoose.models.User || mongoose.model("User", USER);

module.exports = Users;
