import React from 'react';
import {
  View,
  Text,Button
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 

const Profile = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
       <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{flex: 1,width:100,borderWidth:1,borderColor:"red"}}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
      </MapView>
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

export default Profile;