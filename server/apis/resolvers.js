const user = require("./user/resolver");
const receiver = require("./receiver/resolver");
const post = require("./post/resolver");

module.exports = [
    user,
    receiver,
    post
    // Subscription:{
    //   userAdded:{
    //     subscribe: (_,__,{pubsub}) => pubsub.asyncIterator(USER_ADDED)
    //   }
    // },
    // Query: [
        // ...user.queries,
        // ...receiver.queries,
    //   me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    // ],
    // Mutation:{
    //   login: async (_, { email , password},{ dataSources }) => {
    //     const user = await dataSources.userAPI.getUser({email,password});
    //     if(user){
    //         const token = jwt.sign({id :user.id,email : user.email},
    //            'secret_key', { expiresIn: 60 * 60 });
    //         return token 
    //     }
    //     if(!user){
    //        console.log('User is not existing in database')
    //     }

    //   },
    //   saveRecord: async (_, { recordId },{ dataSources }) => {
    //     const results = await dataSources.userAPI.saveRecord({recordId});

    //     return {
    //       success : results.length ? true : false,
    //       message : results.length ? "Quake successfully saved" : "Quake do not saved",
    //       records : results,
    //     }
    //   },
    //   addUser: async (_, { name , email , password},{ pubsub }) => {
       
    //     var user = {
    //         name,
    //         email,
    //         password
    //     }
    //     const newUser = new User(user);
    //     const added = await newUser.save()
    //     .then( () => {
    //         return true
    //     }).catch( e => {
    //         console.log({message : e.message}) 
    //         return false
    //     })
        
    //     const users = await User.find()
    //     .then( (allUsers) => {
    //       return allUsers.map( obj => { return {name:obj.name,email:obj.email,password:obj.password}})
    //     })
    //     .catch( e => {
    //       console.log({message : e.message}) 
    //     })
        
    //     console.log('**',users)
        
    //     pubsub.publish(USER_ADDED,{
    //       userAdded : users
    //     })
        
        
    //     if(added){
    //       return user
    //     }
       
    //   },
    // }
]