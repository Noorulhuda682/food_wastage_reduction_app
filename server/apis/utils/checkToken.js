const jwt = require("jsonwebtoken");

const checkToken = async (req,SECRET) => {
    console.log("Req==",req.headers);
    const token = await req.headers["authorization"];
    let user;
    try {
      user = await jwt.verify(token, SECRET);
      console.log(user);
    } catch (error) {
      throw new Error("Authorization Error")
    }
    return user;
}

module.exports = checkToken;