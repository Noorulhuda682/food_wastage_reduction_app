const Receiver = require("../../../models/Receiver");
const {RECEIVER_ADDED } = require("../../subscription-keys");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {sendEmail} = require("../../utils/sendEmail");

const addReceiver = async (_, { name , email , password},{ pubsub,SECRET }) => {
    
        let checkUser = await Receiver.findOne({email})
        if(checkUser) throw new Error("receiver already exists with this email") 

        var verificationCode = await sendEmail({name,email})

        // hash password 
        let passwordHashed = await  bcrypt.hash(password,12);

        var user = {
            name,
            email,
            password:passwordHashed,
            verificationCode
        }
        const newUser = new Receiver(user);
        const added = await newUser.save()
        .then( () => {
            return true
        }).catch( e => {
            console.log({message : e.message}) 
            return false
        })
        
        const receivers = await Receiver.find()
        pubsub.publish(RECEIVER_ADDED,{
          receiverAdded : receivers.reverse()
        })

        const token = await jwt.sign(
          {user},
          SECRET,
          // this token will last for a year, this should be adjusted accordingly
          { expiresIn: '1h' }
        )
        user = await Receiver.findOne({email})
        console.log("USER===",user);
        if(added){
          return {
            token,
            user
          }
        }
       
}

module.exports = addReceiver