const Receiver = require("../../../models/Receiver");
const {RECEIVER_ADDED } = require("../../subscription-keys");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const deleteReceiver = async (_, { receiverId },{ pubsub,SECRET }) => {
    
    let deleteReceiver = await Receiver.deleteOne({_id:receiverId});
    console.log("deleteReceiver===>",deleteReceiver.deletedCount);
    if(!deleteReceiver.deletedCount) throw new Error("No receiver found..1") 
    return "Receiver deleted successfully"
}

module.exports = deleteReceiver