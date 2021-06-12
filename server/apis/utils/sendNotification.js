var admin = require("firebase-admin");
var serviceAccount = require("./firebaseAccount.json");
const Receiver = require("../../models/Receiver");
const User = require("../../models/User");

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://pushnotifications-f4f27.firebaseio.com",
});



const sendNotification = async ({userId,title,description}) => {
    
    let user = await User.findOne({_id:userId}) 
    console.log("user-In-Notif1==",user.name,title);
    let receivers = await Receiver.find();
    // console.log("user-In-Notif2==",receivers);

    const registrationTokens = [
        "ckTtJS13SpWnOwiP0iw7SN:APA91bHsPX2GebR8MTJ-XQ7WRvpP29ujKpjzuqGC4tGCNYGfUHTwRdsPmSRBDnzSTLWVzK5A76QQdAEIeNyWaNi07YfFbEpPNiUKS5jsWv4WpsvFIHnXK8PYD3rGOQxvpDvh3Bu_UApP"
    ];

    receivers.map( receiver => receiver.pushToken && registrationTokens.push(receiver.pushToken) )
      
    // console.log("registrationTokens==",registrationTokens);      
    const notification_options = {
        priority: "high",
        // timeToLive: 60  60  24,
    };
    admin.messaging().sendToDevice(
        registrationTokens,
        {
            notification: {
                title: title,
                body: `uploaded by ${user.name}`,
                image:"https://i.ibb.co/23xG57J/App-logo.jpg"
        },
        },
        notification_options
    ).then( response => {
        console.log("response",response);
    })
   
}

module.exports = sendNotification;