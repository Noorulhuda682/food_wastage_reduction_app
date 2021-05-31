import React,{useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from "./ContentComponent"
import {
   Home, 
   Profile,
   AddPost,
   MyPosts,
   AllPosts,
   Map,
   Camera
 } from "../screens"
import {useSelector,useDispatch} from "react-redux"

const Drawer = createDrawerNavigator();

const MainHome = ({ navigation }) => {
  let stateData = useSelector( state => state);

  useEffect( () => {
    console.log("MainHome====>",stateData.user);
    if(stateData.user !== null){
      navigation.navigate("Home")
    }else{
      navigation.navigate("Login")
    }

  },[])

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
      <Drawer.Screen name="map" component={Map} />

      <Drawer.Screen name="allPosts" component={AllPosts} />

      

    </Drawer.Navigator>
  );
}

export default MainHome;