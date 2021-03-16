import React from 'react';

import {
  SafeAreaView,
  useColorScheme,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import FoodWastageReductionApp from "./src";

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  console.log("DARK===>?",useColorScheme());
  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView>
      <FoodWastageReductionApp></FoodWastageReductionApp>
    </SafeAreaView>
  );
};


export default App;
