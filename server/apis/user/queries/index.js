const users = require("./users-query");
const validating = require("./validate");
const getUser = require("./get-user");

const Query = {
    users,
    validating,
    getUser
}

module.exports = Query;