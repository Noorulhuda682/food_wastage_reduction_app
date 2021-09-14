import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Image,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Button,
  Icon,
  SwipeRow,
} from 'native-base';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../typeDefs/User';
import { DELETE_RECEIVER } from '../typeDefs/Receiver';

const UserList = ({ navigation, user, index, routeName }) => {
  const [loading, setLoading] = useState(false);
  const leftSwap = useRef("");

  const [deleteUserOrReceiver, { }] = useMutation(
    user.role === 'USER' ? DELETE_USER : DELETE_RECEIVER,
  );

  const deletionHandler = async id => {
    setLoading(true);
    let payload = user.role === 'USER' ? { userId: id } : { receiverId: id };
    await deleteUserOrReceiver({ variables: payload })
      .then(res => {
        // console.log('Log1===', res);
        ToastAndroid.showWithGravity(
          'Deletion is sucessfull',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        // Alert.alert('Success accpted order');
        setLoading(false);
        leftSwap.current._root.closeRow()
      })
      .catch(err => {
        setLoading(false);
        Alert.alert(`Error : ${err}`);
      });
    //   setLeftSwap(true);
  };

  const confirmationHandler = id => {
    Alert.alert('Hold on!', 'Are you sure you want to delete this user?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => deletionHandler(id) },
    ]);
    return true;
  };

  return (
    <View
      key={index}
      style={{
        marginTop: 10,
      }}>
      <SwipeRow
        disableLeftSwipe={true}
        ref={(c) => leftSwap.current = c}
        leftOpenValue={75}
        // stopLeftSwipe={75}
        rightOpenValue={-75}
        left={
          <Button danger>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <TouchableOpacity
                onPress={() => confirmationHandler(user._id)}
                style={{ backgroundColor: null }}>
                <Icon active name="trash" />
              </TouchableOpacity>
            )}
          </Button>
        }
        style={{
          height: 70,
          padding: 0,
          margin: 0,
        }}
        body={
          <View
            style={{
              width: '100%',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                flex: 1,
                flexDirection: 'row',
              }}>
              <View style={{ flex: 2, backgroundColor: 'white', height: 60 }}>

                {user.profileImage ? (
                  <Image
                    style={{
                      height: 58,
                      width: 60,
                      marginTop: -13,
                    }}
                    source={{ uri: user.profileImage }}
                  />
                ) : (
                  <Text
                    style={{
                      backgroundColor: 'white',
                      textAlign: 'center',
                      backgroundColor: 'red',
                      marginTop: -13,
                      backgroundColor: 'lightgray',
                      width: 60,
                      height: 60,
                    }}>
                    <Entypo name="user" size={52} color="white" />
                  </Text>
                )}
              </View>
              <View
                style={{
                  flex: 5.5,
                  marginTop: -10,
                  marginLeft: 10,
                }}>
                <Text
                  style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>
                  {user.name}
                </Text>
                <Text style={{ color: 'gray', fontSize: 11 }}>{user.email}</Text>
              </View>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('detailsPage', { routeName, user })
                  }
                  style={styles.detailsButton}>
                  <Text style={styles.detailsText}>details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        right={
          <Button success onPress={() => alert('Add')}>
            <Icon active name="add" />
          </Button>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    //  paddingTop:20
    textAlign: 'center',
    // flex:1,
    // alignItems:"center"
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 35,
    color: '#00203FFF',
    // textAlign:"center"
  },
  para: {
    fontSize: 16,
    paddingLeft: 5,
    color: '#00203FFF',
    paddingBottom: 20,
  },
  headContent: {
    paddingTop: 20,
    height: 100,
    backgroundColor: '#adcfe6',
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 7,
  },
  detailsButton: {
    backgroundColor: '#1e319d',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  detailsText: {
    fontSize: 13,
    color: 'white',
  },
});
export default UserList;















































