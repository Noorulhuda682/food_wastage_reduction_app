import React from 'react';
import {
  View,
  Text,Button
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AllPosts = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>AllPosts Screen</Text>
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

export default AllPosts;