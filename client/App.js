import { Provider } from "react-redux";
import React, { useState, createContext } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/index';
import { store } from "./src/store/store";



// export const ThemeContext = createContext()

const App = () => {
  // const [myTheme, setMyTheme] = useState(true);
  // const chnageLightTheme = useSelector(state => state.chnageLightTheme)
  // console.log("chnageLightTheme",chnageLightTheme);
  // const handleTheme = () => {
  //   setMyTheme(!myTheme)
  // }

  return (
    <Provider store={store}>
          <StackNavigation></StackNavigation>
    </Provider>
  );
};



export default App;
