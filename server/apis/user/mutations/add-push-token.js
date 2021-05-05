const User = require("../../../models/User");

const addToken = async (_,{userId,token}) => {
    
    await User.updateOne(
        {_id: userId },
        { $set:{ token}}
    ).then( result => {
        console.log("Result==>",result);
    }).catch( err => {
        throw new Error("Error : ",err)
    })

    return "token added successfully"
}

module.exports = addToken