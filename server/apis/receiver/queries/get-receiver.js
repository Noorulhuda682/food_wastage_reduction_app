const Receiver = require("../../../models/Receiver");

const getReceiver =  async (_, {receiverId}, { dataSources }) => {
 
    let receiver = await  Receiver.findOne({_id:receiverId}) 
    return receiver;
} 

module.exports = getReceiver;

