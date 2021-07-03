const addUser = require("./add-user");
const login = require("./login");
const addToken = require("./add-push-token");
const deleteUser = require("./delete-user");
const updateUser = require("./update-user");
const verifyEmail = require("./verify-email");
const checkCode = require("./check-otp-code");
const requestToResetPassword = require("./request-to-reset-password");
const resetPassword = require("./reset-password");

const Mutation = {
    addUser,
    login,
    addToken,
    deleteUser,
    updateUser,
    verifyEmail,
    checkCode,
    requestToResetPassword,
    resetPassword
}

module.exports = Mutation;