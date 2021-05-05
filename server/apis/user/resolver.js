const Query = require("./queries/index");
const Subscription = require("./subscriptions/index");
const Mutation = require("./mutations/index");

const user = {
    Query,
    Subscription,
    Mutation,
}
module.exports = user;
