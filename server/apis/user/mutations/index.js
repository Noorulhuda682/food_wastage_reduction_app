const addUser = require("./add-user");
const login = require("./login");
const addToken = require("./add-push-token");

const Mutation = {
    addUser,
    login,
    addToken
}

module.exports = Mutation;