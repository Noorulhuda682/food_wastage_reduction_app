const Receiver = require("../../../models/Receiver");
const uploadImageToCloud = require("../../utils/uploadImageToCloud");
const { RECEIVER_ADDED } = require("../../subscription-keys");

const updateReceiver = async (
  _,
  { receiverId, name, email, profileImage, pushToken, latitude, longitude,
    verification,verificationCode,gender,country,city,address,contactNumber,dateOfBirth
 },
  { pubsub, SECRET }
) => {
  let updateReceiver = {};

  if (name) updateReceiver.name = name;
  if (email) updateReceiver.email = email;
  if (profileImage) updateReceiver.profileImage = profileImage;
  if (pushToken) updateReceiver.pushToken = pushToken;
  if (latitude) updateReceiver.latitude = latitude;
  if (longitude) updateReceiver.longitude = longitude;
  if (verification) updateReceiver.verification = verification;
  if (verificationCode) updateReceiver.verificationCode = verificationCode;
  if (gender) updateReceiver.gender = gender;
  if (country) updateReceiver.country = country;
  if (city) updateReceiver.city = city;
  if (address) updateReceiver.address = address;
  if (contactNumber) updateReceiver.contactNumber = contactNumber;
  if (dateOfBirth) updateReceiver.dateOfBirth = dateOfBirth;

  console.log("updateReceiver", updateReceiver);

  let updatedReceiver = await Receiver.updateOne(
    { _id: receiverId },
    { $set: updateReceiver }
  );

  const receivers = await Receiver.find();
  pubsub.publish(RECEIVER_ADDED, {
    receiverAdded: receivers.reverse(),
  });

  return "Receiver updated successfully";
};

module.exports = updateReceiver;
