import { Provider } from "react-redux";
import React, { useState,useEffect, createContext } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/index';
import { store } from "./src/store/store";
import SplashScreen from 'react-native-splash-screen'


// export const ThemeContext = createContext()

const App = () => {
  
  useEffect(()=> {
    SplashScreen.hide();
  })

  return (
    <Provider store={store}>
          <StackNavigation></StackNavigation>
    </Provider>
  );
};



export default App;
