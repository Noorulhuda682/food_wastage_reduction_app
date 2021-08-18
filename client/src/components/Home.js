import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from "./ContentComponent"
import {
  Home,
  Profile,
  AddPost,
  MyPosts,
  AllPosts,
  Map,
  NewOrders,
  CompletedOrders,
  ProgressOrders,
  Users,
  Receivers,
  DetailsPage,
  FoodDetailsPage,
  EditPost
} from "../screens"
import { useSelector, useDispatch } from "react-redux"

const Drawer = createDrawerNavigator();

const MainHome = ({ navigation }) => {
  let stateData = useSelector(state => state);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     console.log("navigation**********************");
  //     navigation.dispatch(
  //       StackActions.popToTop()
  //     );
  //   });
  //   return unsubscribe;
  // }, [navigation]);




  // useEffect(() => {
  //   console.log("MainHome====>", stateData?.user);
  //   if (stateData?.user?.role) {
  //     navigation.navigate("Home")
  //   } else {
  //     navigation.navigate("Login")
  //   }
  // }, [])

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
      <Drawer.Screen name="editPost" component={EditPost} />

      {/* RECEIVER ROUTES  */}
      <Drawer.Screen name="newOrders" component={NewOrders} />
      <Drawer.Screen name="completedOrders" component={CompletedOrders} />
      <Drawer.Screen name="progressOrders" component={ProgressOrders} />
      {/* ADMIN ROUTES */}
      <Drawer.Screen name="users" component={Users} />
      <Drawer.Screen name="receivers" component={Receivers} />
      <Drawer.Screen name="detailsPage" component={DetailsPage} />
      <Drawer.Screen name="foodDetailsPage" component={FoodDetailsPage} />
    </Drawer.Navigator>
  );
}

export default MainHome;