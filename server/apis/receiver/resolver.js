const Query = require("./queries/index");
const Mutation = require("./mutations/index");
const Subscription = require("./subscriptions/index");

const receiver = {
    Query,
    Mutation,
    Subscription
}

module.exports = receiver;