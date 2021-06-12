const Receiver = require("../../../models/Receiver");
const uploadImageToCloud = require("../../utils/uploadImageToCloud");

const updateReceiver = async (_, { receiverId, name,email,profileImage,pushToken,latitude,longitude },{ pubsub,SECRET }) => {
    
    let updateReceiver = {}

    if(name)  updateReceiver.name = name;
    if(email)  updateReceiver.email = email;
    if(profileImage)   updateReceiver.profileImage = profileImage;
    if(pushToken)  updateReceiver.pushToken = pushToken;
    if(latitude)  updateReceiver.latitude = latitude;
    if(longitude)  updateReceiver.longitude = longitude;

    console.log("updateReceiver",updateReceiver);

    let updatedReceiver = await Receiver.updateOne(
        {_id:receiverId},
        { $set: updateReceiver }
    );

    return "Receiver updated successfully"
}

module.exports = updateReceiver