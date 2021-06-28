import React, { useEffect, useState } from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import { Button, Thumbnail } from 'native-base';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { UPDATEPOST } from '../typeDefs/Post';

const PostCard = ({ navigation, foodPost, keyInd }) => {
  const storeData = useSelector(state => state);
  const [focusKey, setFocusKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatePost, { }] = useMutation(UPDATEPOST);

  const updatePostHandler = (postId, userId, status) => {
    let payload = {
      postId,
      userId,
      status,
      receiverId: storeData.user._id,
    };

    setLoading(true);
    updatePost({
      variables: payload,
    })
      .then(res => {
        console.log('Log1===', res);
        // setFocusKey(null)
        ToastAndroid.showWithGravity(
          "Accepting sucessfull",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        // Alert.alert('Success accpted order');
        setLoading(false);
        setFocusKey(null)
      })
      .catch(err => {
        setLoading(false);
        Alert.alert(`Error : ${err}`);
      });
  };

  console.log("SEEPOst===", foodPost.user);

  return (
    <TouchableOpacity key={keyInd} style={styles.container}>
      <View style={styles.imageView}>
        {foodPost.img1 !== null ? (
          <Image source={{ uri: foodPost.img1 }} style={styles.postImage} />
        ) : (
          <Image
            source={require('../assets/images/foods.jpeg')}
            style={styles.postImage}
          />
        )}
      </View>

      <View style={styles.infoView}>
        <View style={styles.titleView}>
          <Text style={styles.title}>
            {foodPost.title}
          </Text>
          {storeData?.user?.role !== 'ADMIN' && (
            <TouchableOpacity
              onPress={() => setFocusKey(focusKey === null ? keyInd : null)}>
              <MaterialIcons
                name={
                  focusKey === keyInd ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                }
                size={27}
                color="#1e319d"
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={{ color: 'gray', fontSize: 14 }}>
          Quantity: {foodPost.quantity}
        </Text>
        <Text style={{ color: 'gray' }}>Weight: {foodPost.weight}</Text>
        <Text style={{ color: 'gray', fontSize: 16 }}>
          Status: {foodPost.status} {` `}
          {foodPost.status === 'NEW' && (
            <Foundation name="burst-new" size={23} color="#FCC201" />
          )}
          {foodPost.status === 'PROGRESS' && (
            <Entypo name="progress-two" size={22} color="#b4006b" />
          )}
          {foodPost.status === 'COMPLETED' && (
            <Entypo name="check" size={22} color="green" />
          )}
        </Text>

        <Button transparent style={{ width: '100%' }}>
          {storeData?.user?.role !== 'USER' ? (
            foodPost.status === "PROGRESS" &&
            <Button transparent>
              <Text style={styles.uploader}>
                Receiver :
              </Text>
              {!foodPost.receiver[0]?.profileImage ?
                <EvilIcons name="user" size={30} color="gray" />
                :
                <Thumbnail style={styles.thumbnail}
                source={{ uri: foodPost.receiver[0]?.profileImage }}
              />
              }
              <Text  style={styles.uploaderName}>{foodPost.receiver[0]?.name}</Text>
            </Button>
          )
            :
            <Button transparent>
              <Text style={styles.uploader}>
                Uploader :
              </Text>
            
              {!foodPost.user[0]?.profileImage ?
                <EvilIcons name="user" size={30} color="gray" />
                :
                <Thumbnail style={styles.thumbnail}
                source={{ uri: foodPost.user[0]?.profileImage }}
              />
              }
              <Text  style={styles.uploaderName}>{foodPost.user[0]?.name}</Text>
            </Button>
          }

          {foodPost.status !== 'NEW' && (
            <TouchableOpacity
              transparent
              style={{ marginTop: 10 }}
              onPress={() => navigation.navigate('map')}>
              <Text style={{ marginLeft: 5, fontSize: 11 }}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color="#00238b"
                />
                Map
              </Text>
            </TouchableOpacity>
          )}
        </Button>

        {focusKey === keyInd && (
          <View style={{ flex: 1, flexDirection: 'row', width: '60%' }}>
            {storeData?.user?.role === 'USER' &&
              foodPost.status !== 'PROGRESS' && (
                <TouchableOpacity
                  style={[crudButton, { backgroundColor: '#00203FFF' }]}>
                  <Text style={{ color: 'white' }}>
                    <Feather name="edit" size={15} color="white" />
                    {`  `}Edit{`  `}
                  </Text>
                </TouchableOpacity>
              )}
            {storeData?.user?.role === 'USER' &&
              foodPost.status !== 'PROGRESS' && (
                <TouchableOpacity
                  style={[crudButton, { backgroundColor: '#ea1715' }]}>
                  <Text style={{ color: 'white' }}>
                    <AntDesign name="delete" size={15} color="white" />
                    {` `}Delete
                  </Text>
                </TouchableOpacity>
              )}
            {storeData?.user?.role === 'RECEIVER' &&
              (foodPost.status === 'NEW' ? (
                <TouchableOpacity
                  onPress={() =>
                    updatePostHandler(foodPost._id, foodPost.userId, 'PROGRESS')
                  }
                  style={[styles.updateBtn, { backgroundColor: '#00203FFF' }]}>
                  {loading ? (
                    <ActivityIndicator color="lightgray" />
                  ) : (
                    <MaterialIcons
                      name="delivery-dining"
                      size={20}
                      color="white"
                    />
                  )}
                  <Text style={{ color: 'white' }}>{`   `}Accept Receiving</Text>
                </TouchableOpacity>
              ) : foodPost.status === 'PROGRESS' ? (
                <TouchableOpacity
                  onPress={() =>
                    updatePostHandler(
                      foodPost._id,
                      foodPost.userId,
                      'COMPLETED',
                    )
                  }
                  style={[styles.updateBtn, { backgroundColor: '#b4006b' }]}>
                  {loading ? (
                    <ActivityIndicator color="lightgray" />
                  ) : (
                    <MaterialCommunityIcons
                      name="cursor-pointer"
                      size={19}
                      color="white"
                    />
                  )}

                  <Text style={{ color: 'white' }}>{` `} Received Food</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.updateBtn, { backgroundColor: 'green' }]}>
                  <Entypo name="check" size={20} color="white" />
                  <Text style={{ color: 'white' }}>{` `}Delivered</Text>
                </TouchableOpacity>
              ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  updateBtn: {
    marginHorizontal: 2,
    borderRadius: 3,
    paddingHorizontal: 15,
    height: 37,
    width: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: 20,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: 'lightgray',
    flex: 1,
    flexDirection: 'row',
    marginRight: 10,
  },
  postImage: {
    height: 120,
    width: null,
    flex: 1,
    borderRadius: 5,
  },
  infoView: {
    marginLeft: '4%',
    backgroundColor: 'white',
    width: '66%',
  },
  titleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageView: {
    width: '30%',
  },
  crudButton: {
    marginHorizontal: 2,
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  uploader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 3,
  },
  thumbnail: {
    height: 24,
    width: 24,
  },
  uploaderName:{
    marginLeft: 5, 
    fontSize: 11 
  }
});
export default PostCard;
