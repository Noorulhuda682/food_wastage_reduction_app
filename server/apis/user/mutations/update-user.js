const User = require("../../../models/User");
const uploadImageToCloud = require("../../utils/uploadImageToCloud");

const updateUser = async (_, { userId, name,email,profileImage,token,latitude,longitude },{ pubsub,SECRET }) => {
    
    let updateUser = {}

    if(name)  updateUser.name = name;
    if(email)  updateUser.email = email;
    if(profileImage){
        let {uploading,message,url} = await uploadImageToCloud(profileImage);
        if(uploading){
            updateUser.profileImage = url
        }else{
           throw new Error(`Error: ${message}`);
        }
    }
    if(token)  updateUser.token = token;
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