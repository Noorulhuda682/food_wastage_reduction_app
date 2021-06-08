const addUser = require("./add-user");
const login = require("./login");
const addToken = require("./add-push-token");
const deleteUser = require("./delete-user");
const updateUser = require("./update-user");

const Mutation = {
    addUser,
    login,
    addToken,
    deleteUser,
    updateUser,
}

module.exports = Mutation;