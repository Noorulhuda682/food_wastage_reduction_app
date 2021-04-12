import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from "./ContentComponent"
import { Home, Profile } from "../screens"

const Drawer = createDrawerNavigator();
const MainHome = ({ navigation }) => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} initialRouteName="home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Drawer.Screen name="home" component={Home} />
      <Drawer.Screen name="profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default MainHome;