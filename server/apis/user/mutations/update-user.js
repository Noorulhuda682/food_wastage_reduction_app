const User = require("../../../models/User");
const uploadImageToCloud = require("../../utils/uploadImageToCloud");

const updateUser = async (_, { userId, name,email,profileImage,pushToken,latitude,longitude },{ pubsub,SECRET }) => {
    
    let updateUser = {}

    if(name)  updateUser.name = name;
    if(email)  updateUser.email = email;
    if(profileImage) updateUser.profileImage = profileImage;
    if(pushToken)  updateUser.pushToken = pushToken;
    if(latitude)  updateUser.latitude = latitude;
    if(longitude)  updateUser.longitude = longitude;

    console.log("updateUser",updateUser);

    let updatedUser = await User.updateOne(
        {_id:userId},
        { $set: updateUser }
    );

    return "User updated successfully"
}

module.exports = updateUser