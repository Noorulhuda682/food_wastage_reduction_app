import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"
import React, { useState, useEffect, createContext } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/index';

import SplashScreen from 'react-native-splash-screen'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, ApolloProvider, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from "@apollo/client/link/ws";
import { readData } from "./src/config/setToken";
import stores from "./src/redux/store";
const { store, persistor } = stores();

// console.log("DAT1====",store);
// console.log("DAT2====",persistor);
// Initialize Apollo Client
const httpLink = new HttpLink({
  uri: "https://hh-hhh.herokuapp.com/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://hh-hhh.herokuapp.com/graphql",
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
  link: splitLink,
  cache: new InMemoryCache()
});

const App = () => {

  useEffect(async () => {
    let tokenRead = await readData();
    // console.log("TOKENSASYNC=====", tokenRead);
    SplashScreen.hide();
  })
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StackNavigation></StackNavigation>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};



export default App;
