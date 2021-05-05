const {RECEIVER_ADDED} = require("../../subscription-keys")
// const Receiver = require("../../../models/Receiver");
// const { PubSub } = require('apollo-server');
// const pubsub = new PubSub();
 
const receiverAdded = {
    subscribe : (_,__,{pubsub}) => pubsub.asyncIterator(RECEIVER_ADDED)
}

module.exports = receiverAdded;