const User = require("../../../models/User");

const deleteUser = async (_, { userId },{ pubsub,SECRET }) => {
    
    let deleteUser = await User.deleteOne({_id:userId});
    console.log("deleteUser===>",deleteUser.deletedCount);
    if(!deleteUser.deletedCount) throw new Error("No User found..") 
    return "User deleted successfully"
}

module.exports = deleteUser