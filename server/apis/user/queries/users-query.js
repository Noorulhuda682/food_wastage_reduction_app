const User = require("../../../models/User");

const users =  async (_, __, { dataSources }) => {

    let allUsers = await  User.find() 
    return allUsers.reverse();
} 

module.exports = users;

