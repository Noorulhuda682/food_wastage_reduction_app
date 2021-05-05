const User = require("../../../models/User");
const {USER_ADDED } = require("../../subscription-keys");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const addUser = async (_, { name , email , password},{ pubsub,SECRET }) => {
    
        let checkUser = await User.findOne({email})
        if(checkUser) throw new Error("user already exists with this email") 
        // hash password 
        let passwordHashed = await  bcrypt.hash(password,12);

        var user = {
            name,
            email,
            password:passwordHashed
        }
        const newUser = new User(user);
        const added = await newUser.save()
        .then( () => {
            return true
        }).catch( e => {
            console.log({message : e.message}) 
            return false
        })
        
        const users = await User.find()
        .then( (allUsers) => {
          return allUsers.map( obj => { return {name:obj.name,email:obj.email,password:obj.password}})
        })
        .catch( e => {
          console.log({message : e.message}) 
        })
        
        pubsub.publish(USER_ADDED,{
          userAdded : users
        })

        const token = await jwt.sign(
          {user},
          SECRET,
          // this token will last for a year, this should be adjusted accordingly
          { expiresIn: '1h' }
        )
        user = await User.findOne({email})
        console.log("USER===",user);
        if(added){
          return {
            token,
            user
          }
        }
       
}

module.exports = addUser