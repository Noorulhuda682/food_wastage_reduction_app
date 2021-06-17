const bscrypt = require("bcryptjs");
const User = require("../../../models/User");
const Receiver = require("../../../models/Receiver");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const login = async (root, { email, password }, { SECRET }) => {
    // The secret is coming from the context that will pass to Apollo Server
    // the next lines basically check if the user exist or not
    var user = await User.findOne({ email })
    console.log("USER",user,);
    if (!user) {
      user = await Receiver.findOne({ email })
      console.log("RECEIVER",user,);
      if (!user) throw new Error('No user found ')
    }
    
    // we use bcrypt again to compare with the password from the args
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new Error('Incorrect password ')
    }

    //   sign in the user
    // create the token specifically for the user and return the token
    const token = await jwt.sign(
      {user},
      SECRET,
      // this token will last for a year, this should be adjusted accordingly
      { expiresIn: '1h' }
    )
    // so basically we don't do much here, we only return the token when the user successfully logs in
    return {
        token,
        user
    }
}

module.exports = login