import React, {useState} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Icon,
  Spinner,
  Body,
  Right,
  Title,
  Left,
  Button,
  Card,
  CardItem,
  H2,
  Footer,
} from 'native-base';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useMutation} from '@apollo/client';
import {useSelector, useDispatch} from 'react-redux';
import {removeUser} from '../redux/actions/user';
import {clearStorage} from '../config/setToken';
import {useRoute} from '@react-navigation/native';

// import { ADDPOST } from "../typeDefs/Post"
// import PostTextInput from "../shared/PostTextInput"

const CustomeHeader = ({navigation, title}) => {
  const dispatch = useDispatch();

  const route = useRoute();
  console.log('PPP===', route.name);

  // "#00203FFF" this is older blue
  return (
    <Header style={styles.Header}>
      <Left>
        <Icon
          onPress={() => navigation.openDrawer()}
          name="menu"
          style={{color: 'white'}}
        />
      </Left>
      <Body style={{flex: 1}}>
        <Title>{title}</Title>
      </Body>
      <Right>
        {route.name !== 'home' && (
          <TouchableOpacity style={styles.homeButton}
            onPress={() => navigation.navigate("home")}>
            <Text style={{color: 'white'}}>Home</Text>
          </TouchableOpacity>
        )}
        {/* {route.name === 'home' && (
          <TouchableOpacity style={styles.homeButton}
            onPress={() => {}}>
            <Text style={{color: 'white'}}>Sign In</Text>
          </TouchableOpacity>
        )}
        {route.name === 'home' && (
          <TouchableOpacity style={[styles.homeButton,{marginLeft:5}]}
            onPress={() => {}}>
            <Text style={{color: 'white'}}>Sign Up</Text>
          </TouchableOpacity>
        )} */}
      </Right>
    </Header>
  );
};

const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#1e319d',
  },
  homeButton:{
    backgroundColor: 'green',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 3,
  }
});

export default CustomeHeader;
