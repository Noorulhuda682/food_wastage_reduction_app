import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"
import React, { useState, useEffect, createContext } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/index';
import { StatusBar, SafeAreaView } from "react-native"
import SplashScreen from 'react-native-splash-screen'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, ApolloProvider, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from "@apollo/client/link/ws";
import { readData } from "./src/config/setToken";
import stores from "./src/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { store, persistor } = stores();

// console.log("DAT1====",store);
// console.log("DAT2====",persistor);
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJVU0VSIiwiX2lkIjoiNjBiNjI0NjViOGM2ODEwMDE1NDJmOGQxIiwibmFtZSI6IlNhYWQiLCJlbWFpbCI6InNhZEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMiQ4YmgyeE5BNlpxUEFpRDdLbXlpdER1amJJLkdnWDRSZmp1UDM2YkZoZHBJdmpGWlByWmNjMiIsIl9fdiI6MH0sImlhdCI6MTYyMjgxNzA2MiwiZXhwIjoxNjIyODIwNjYyfQ.rb75OEaxX94t93zTe1s7XSYUDDLGU6OL0Wv0wgLwigk"
const ChangeTokenHandlerContext = createContext();

const App = () => {
  const [authTokenStorage, setAuthTokenStorage] = useState("");


  useEffect(async () => {
    let tokenRead = await readData();
    // console.log("token1111111=====>", tokenRead);
    setAuthTokenStorage(tokenRead); // as soon as it is available just update the token
  },[]);


  // Initialize Apollo Client
  const httpLink = new HttpLink({
    uri: "https://aaa-aaaa.herokuapp.com/graphql",
    headers: {
      authorization: authTokenStorage,
    },
  });

  const wsLink = new WebSocketLink({
    uri: "ws://aaa-aaaa.herokuapp.com/graphql",
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          authorization: authTokenStorage,
        },
      },
    },
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
    cache: new InMemoryCache(),
  });



  


  useEffect(async () => {
    // let tokenRead = await readData();
    SplashScreen.hide();
  }, [])

  const ChangeTokenHandler = (token) => {
    console.log("Chala app mein");
    setAuthTokenStorage(token)
  }


  // console.log("TOKENSASYNC=====", authTokenStorage);
  return (

    <ApolloProvider client={client}>
      <StatusBar hidden={true} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChangeTokenHandlerContext.Provider value={ChangeTokenHandler}>
            <StackNavigation></StackNavigation>
          </ChangeTokenHandlerContext.Provider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};


export {
  ChangeTokenHandlerContext
}
export default App;


