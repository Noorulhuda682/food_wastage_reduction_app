const User = require("../../../models/User");
const { USER_ADDED } = require("../../subscription-keys");

const deleteUser = async (_, { userId }, { pubsub, SECRET }) => {
    
  let deleteUser = await User.deleteOne({ _id: userId });
  console.log("deleteUser===>", deleteUser.deletedCount);
  if (!deleteUser.deletedCount) throw new Error("No User found..");

  const users = await User.find();
  pubsub.publish(USER_ADDED, {
    userAdded: users.reverse(),
  });

  return "User deleted successfully";
};

module.exports = deleteUser;
