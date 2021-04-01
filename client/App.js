/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, createContext } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import StackNavigation from './src/index';

const light = {
  colors: {
    title: 'black',
    background: 'whitesmoke',
    card: 'rgb(255, 255, 255)',
    text: 'gray',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    icon:'#082860'
  },
};

const dark = {
  colors: {
    title: 'dodgerblue',
    background: 'black',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    icon:'dodgerblue'
  },
};


export const ThemeContext = createContext()


const App = () => {
  const [myTheme, setMyTheme] = useState(true);

  const handleTheme = () => {
    setMyTheme(!myTheme)
  }

  return (
    <ThemeContext.Provider value={{
      handleTheme:handleTheme,
      Author:"Noorul Huda"
    }}
    >
      <NavigationContainer theme={myTheme ? light : dark}>
        <StackNavigation></StackNavigation>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};



export default App;
