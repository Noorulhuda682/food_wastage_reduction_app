import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"
import React, { useState, useEffect, createContext } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/index';
import { StatusBar, SafeAreaView } from "react-native"
// import SplashScreen from 'react-native-splash-screen'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, ApolloProvider, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from "@apollo/client/link/ws";
import { readData } from "./src/config/setToken";
import stores from "./src/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { store, persistor } = stores();
import SplashScreen from "./SplashScreen";

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJVU0VSIiwiX2lkIjoiNjBiNjI0NjViOGM2ODEwMDE1NDJmOGQxIiwibmFtZSI6IlNhYWQiLCJlbWFpbCI6InNhZEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMiQ4YmgyeE5BNlpxUEFpRDdLbXlpdER1amJJLkdnWDRSZmp1UDM2YkZoZHBJdmpGWlByWmNjMiIsIl9fdiI6MH0sImlhdCI6MTYyMjgxNzA2MiwiZXhwIjoxNjIyODIwNjYyfQ.rb75OEaxX94t93zTe1s7XSYUDDLGU6OL0Wv0wgLwigk"
const ChangeTokenHandlerContext = createContext();

const App = () => {
  const [authTokenStorage, setAuthTokenStorage] = useState("");
  const [show, setShow] = useState(true);

  useEffect(
    () => {
      let timer1 = setTimeout(() => setShow(false), 2.5 * 1000);

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearTimeout(timer1);
      };
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    []
  );

  useEffect(async () => {
    let tokenRead = await readData();
    // console.log("token1111111=====>", tokenRead);
    setAuthTokenStorage(tokenRead); // as soon as it is available just update the token
  }, []);


  // Initialize Apollo Client
  const httpLink = new HttpLink({
    uri: "https://fff-ff.herokuapp.com/graphql",
    headers: {
      authorization: authTokenStorage,
    },
  });

  const wsLink = new WebSocketLink({
    uri: "ws://fff-ff.herokuapp.com/graphql",
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



  const ChangeTokenHandler = (token) => {
    console.log("Chala app mein");
    setAuthTokenStorage(token)
  }

  return (
    show ? <SplashScreen></SplashScreen> :
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


