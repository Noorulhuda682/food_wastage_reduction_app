const {USER_ADDED} = require("../../subscription-keys")
const User = require("../../../models/User");
// const { PubSub } = require('apollo-server');
// const pubsub = new PubSub();
 
const userAdded = {
    subscribe : (_,__,{pubsub}) => pubsub.asyncIterator(USER_ADDED)
}

module.exports = userAdded;