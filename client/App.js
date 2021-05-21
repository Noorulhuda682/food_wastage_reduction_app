import { Provider } from "react-redux";
import React, { useState, useEffect, createContext } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/index';
import { store } from "./src/redux/store";
import SplashScreen from 'react-native-splash-screen'
import { ApolloClient, ApolloLink, HttpLink ,InMemoryCache, ApolloProvider,split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from "@apollo/client/link/ws";
import {readData} from "./src/config/setToken";
// Initialize Apollo Client



const httpLink = new HttpLink({
  uri: "http://10.0.2.2:4000/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://10.0.2.2:4000/graphql",
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
   link:splitLink,
   cache: new InMemoryCache()
});

const App = () => {

  useEffect( async () => {
    let tokenRead = await readData();
    console.log("TOKENSASYNC=====",tokenRead);
    SplashScreen.hide();
  })
  // console.log("Client==>",client);
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <StackNavigation></StackNavigation>
      </Provider>
    </ApolloProvider>
  );
};



export default App;
