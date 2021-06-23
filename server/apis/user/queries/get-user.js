const User = require("../../../models/User");

const getUser =  async (_, {userId}, { dataSources }) => {
 
    console.log("Log",userId);
    let user = await  User.findOne({_id:userId}) 
    console.log("user",user);
    return user;
} 

module.exports = getUser;

