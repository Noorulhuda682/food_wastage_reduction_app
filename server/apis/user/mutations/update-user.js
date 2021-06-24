const User = require("../../../models/User");
const uploadImageToCloud = require("../../utils/uploadImageToCloud");
const { USER_ADDED } = require("../../subscription-keys");

const updateUser = async (
  _,
  { userId, name, email, profileImage, pushToken, latitude, longitude,
    verification,verificationCode,gender,country,city,address,contactNumber,dateOfBirth
 },
  { pubsub, SECRET }
) => {
  let updateUser = {};

  if (name) updateUser.name = name;
  if (email) updateUser.email = email;
  if (profileImage) updateUser.profileImage = profileImage;
  if (pushToken) updateUser.pushToken = pushToken;
  if (latitude) updateUser.latitude = latitude;
  if (longitude) updateUser.longitude = longitude;

  if (verification) updateUser.verification = verification;
  if (verificationCode) updateUser.verificationCode = verificationCode;
  if (gender) updateUser.gender = gender;
  if (country) updateUser.country = country;
  if (city) updateUser.city = city;
  if (address) updateUser.address = address;
  if (contactNumber) updateUser.contactNumber = contactNumber;
  if (dateOfBirth) updateUser.dateOfBirth = dateOfBirth;

  console.log("updateUser", updateUser);

  let updatedUser = await User.updateOne({ _id: userId }, { $set: updateUser });

  // SUBSCRIPTION
  const users = await User.find();
  pubsub.publish(USER_ADDED, {
    userAdded: users.reverse(),
  });

  return "User updated successfully";
};

module.exports = updateUser;
