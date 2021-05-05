const { ApolloServer} = require('apollo-server');
const typeDefs = require("./apis/typeDefs");
const resolvers = require("./apis/resolvers");
const jwt = require('jsonwebtoken');
const { PubSub } = require('apollo-server');
const pubsub = new PubSub();
const dotenv = require("dotenv");
dotenv.config();
const SECRET = process.env.SECRET;
const db = require('./models/db');
  
db.connection.once('open', () => {
    console.log('db connected')
  }).on('error', error =>{
      console.log('Error =>' , error)
});
const checkToken = require("./apis/utils/checkToken");

const server = new ApolloServer({ 
    context: async ({req}) => {
        
        // the user, pubsub and secret we are passing here is what we access in every resolver
        return {
            pubsub, 
            checkToken,
            req,
            SECRET
        };
        
    },
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
})


server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});  