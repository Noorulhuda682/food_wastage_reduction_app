const {POST_ADDED} = require("../../subscription-keys")
// const Receiver = require("../../../models/Receiver");
// const { PubSub } = require('apollo-server');
// const pubsub = new PubSub();
 
const postAdded = {
    subscribe : (_,__,{pubsub}) => pubsub.asyncIterator(POST_ADDED)
}

module.exports = postAdded;