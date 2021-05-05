const Query = require("./queries/index");
const Mutation = require("./mutations/index");
const Subscription = require("./subscriptions/index");

const post = {
    Query,
    Mutation,
    Subscription
}

module.exports = post;