import React from 'react';
import {
  View,
  Text,Button
} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DrawerContent from "./ContentComponent"

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <FontAwesome name="rocket" size={30} color="#900" />
      <FontAwesome name="font" size={30} color="#900" />
      <MaterialCommunityIcons name="post-outline" size={24} color="black" />
      <Button
        onPress={() => navigation.openDrawer()}
        title="Go to notifications"
      />
    </View>
  );
}

function DetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        onPress={() => navigation.navigate('Login')}
        title="Go to notifications"
      />
    </View>
  );
}





const Drawer = createDrawerNavigator();

const Home = ({navigation}) => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}  initialRouteName="home">
            <Drawer.Screen name="home" component={HomeScreen} />
            <Drawer.Screen name="Details" component={DetailsScreen} />
        </Drawer.Navigator>
    );
  }

export default Home;