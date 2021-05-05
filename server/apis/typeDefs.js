const user = require("./user/schema");
const receiver = require("./receiver/schema");
const post = require("./post/schema");

const combineSchemas = [
    user,
    receiver,
    post,
];

module.exports = combineSchemas;