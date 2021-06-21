// const { ApolloServer} = require('apollo-server');
const  { ApolloServer, PubSub } =  require('apollo-server-express');
var http = require("http");
var express = require("express");

const typeDefs = require("./apis/typeDefs");
const resolvers = require("./apis/resolvers");
const jwt = require('jsonwebtoken');
// const { PubSub } = require('apollo-server');
const pubsub = new PubSub();
const dotenv = require("dotenv");
dotenv.config();
const SECRET = "asdd3nsdj9a8c8asc";
const db = require('./models/db');

  
db.connection.once('open', () => {
    console.log('db connected')
  }).on('error', error => {
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



const app = express()
server.applyMiddleware({ app })

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);


// server.listen(process.env.PORT || 4000).then(({ url }) => {
//     console.log(`🚀 Server ready at ${url}`);
// });  


var PORT = process.env.PORT || 4000;

httpServer.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)