import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from "./ContentComponent"
import {
   Home, 
   Profile,
   AddPost,
   MyPosts,
   AllPosts,
   Map
 } from "../screens"

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
      <Drawer.Screen name="addPost" component={AddPost} />
      <Drawer.Screen name="myPosts" component={MyPosts} />
      <Drawer.Screen name="allPosts" component={AllPosts} />
      <Drawer.Screen name="map" component={Map} />
    </Drawer.Navigator>
  );
}

export default MainHome;