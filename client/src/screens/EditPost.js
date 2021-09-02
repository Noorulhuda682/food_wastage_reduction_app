import React, { useState, useEffect } from 'react';
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
  BackHandler,
} from 'react-native';
import {
  Container,
  Content,
  Item,
  Button,
  Left, Body, Right, Header
} from 'native-base';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Camera from './Camera';
import uploadImageToCloud from '../config/uploadImageToCloudinary';
import setImageFileForCloudinary from '../config/setImageForCloudinary';
import { useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { ADDPOST, UPDATEPOST } from '../typeDefs/Post';
import PostTextInput from '../shared/PostTextInput';
// import Header from '../shared/Header';

const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const EditPost = ({ route, navigation }) => {
  let { routeName, foodPost } = route.params
  const [title, setTitle] = useState(foodPost.title ? foodPost.title : "");
  // console.log("foodPost", foodPost.title, title);
  const [checkTitle, setCheckTitle] = useState(false);
  const [description, setDescription] = useState(foodPost.description ? foodPost.description : "");
  const [checkDescription, setCheckDescription] = useState(false);
  const [quantity, setQuantity] = useState(foodPost.quantity ? foodPost.quantity : 0);
  const [checkQuantity, setCheckQuantity] = useState(false);
  const [weight, setWeight] = useState(foodPost.weight ? foodPost.weight : "");
  const [checkWeight, setCheckWeight] = useState(false);

  const [uploadImg, setUploadImg] = useState(false);
  const [usingCamera, setUsingCamera] = useState(false);
  // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYUzb2VVE2Kw9sI_bHK-Z5wYTMHNvGMths8A&usqp=CAU
  const [loading, setLoading] = useState(false);
  const [img1, setImg1] = useState(foodPost.img1 ? foodPost.img1 : null);
  const [updateImg1, setUpdateImg1] = useState(null)
  const datas = useSelector(state => state);
  const [updatePost, { }] = useMutation(UPDATEPOST);
  // console.log('AddPOSST===>', datas?.user?._id);

  useEffect(() => {
    console.log("route.params===", route.params);
    setImg1(foodPost.img1 ? foodPost.img1 : null)
    setTitle(foodPost.title ? foodPost.title : "")
    setDescription(foodPost.description ? foodPost.description : "")
    setQuantity(foodPost.quantity ? foodPost.quantity : "")
    setWeight(foodPost.weight ? foodPost.weight : "")
    setUpdateImg1(null)
  }, [route.params])

  const updatePostHandler = async () => {
    if (title === '') {
      ToastAndroid.showWithGravity(
        'Empty title',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return false;
    }
    if (quantity === '') {
      ToastAndroid.showWithGravity(
        'Empty quantity',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return false;
    }
    if (weight === '') {
      ToastAndroid.showWithGravity(
        'Empty quantity',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return false;
    }
    setLoading(true);

    var payload = {
      postId: foodPost._id,
      userId: datas?.user?._id,
      title,
      description,
      quantity: parseFloat(quantity),
      weight,
    };


    // upload image to Cloudinary
    if (updateImg1) {
      let imageFile = setImageFileForCloudinary(updateImg1);
      let data = await uploadImageToCloud(imageFile);
      var { uploading, message, url } = data;
      if (uploading) {
        payload.img1 = url;
      } else {
        Alert.alert(`${message}`);
        setLoading(false);
        return false;
      }
    }
    updatePost({
      variables: payload,
    })
      .then(res => {
        ToastAndroid.showWithGravity(
          "Updation sucessfull",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setLoading(false);
        setUpdateImg1(null);
        navigation.navigate(routeName);
      })
      .catch(err => {
        setLoading(false);
        Alert.alert(`Error : ${err}`);
      });
  };

  const launchImageLibraryHandler = () => {
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      checkPhotoValidation(response);
    });
  };
  const launchCameraHandler = () => {
    launchCamera(options, response => {
      console.log('Response = ', response);
      checkPhotoValidation(response);
    });
  };

  const checkPhotoValidation = async response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      const source = { uri: response.uri };
      // setImg1(response.uri);
      setUpdateImg1(response.uri)
      setUsingCamera(false);
      setUploadImg(false);
    }
  };

  const takePhoto = async imgData => {
    setUsingCamera(false);
    setUploadImg(false);
    setImg1(imgData.uri);
    setUpdateImg1(imgData.uri)
  };

  return !usingCamera ? (
    <Container>
      <Header style={{ backgroundColor: null, elevation: 0 }}>
        <Left>
          <TouchableOpacity onPress={() => navigation.navigate(routeName)}
            style={styles.squareBox}>
            <MaterialCommunityIcons
              name="keyboard-backspace" size={24} color='#1e319d' />
          </TouchableOpacity>
        </Left>
        <Body style={{ borderWidth: 0 }}>
          <TouchableOpacity
            style={[styles.squareBox, { width: "100%" }]}>
            <Text style={{ color: '#1e319d' }}>Edit Post</Text>
          </TouchableOpacity>
        </Body>
        <Right>
          <TouchableOpacity onPress={() => navigation.navigate("home")}
            style={styles.squareBox}>
            <FontAwesome name="home" size={20} color='#1e319d' />
          </TouchableOpacity>
        </Right>
      </Header>
      <Content padder>
        <Text style={styles.grayText}>Food Image</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {(img1 || updateImg1) &&
            (<View style={{ width: "100%", alignItems: "center" }}>
              <TouchableOpacity
                style={[
                  styles.cameraView,
                  { width: '70%', height: 120, margin: 10 },
                ]}
                onPress={() => setUploadImg(!uploadImg)}>
                <Image
                  style={{ height: '100%', width: '100%' }}
                  source={{ uri: updateImg1 ? updateImg1 : img1 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setUploadImg(!uploadImg)} style={{ marginTop: -5 }}>
                <Text style={{ color: "blue" }}>edit image</Text>
              </TouchableOpacity>
            </View>)
          }
          {(!img1 && !updateImg1) && (
            <TouchableOpacity
              onPress={() => setUploadImg(!uploadImg)}
              style={styles.cameraView}>
              <FontAwesome name="photo" size={24} color="gray" />
            </TouchableOpacity>
          )}
        </View>
        {uploadImg && (
          <Item style={{ justifyContent: 'space-around', marginTop: 10 }}>
            <Button
              iconLeft
              style={{ paddingHorizontal: 15, marginLeft: 10 }}
              onPress={launchImageLibraryHandler}>
              <MaterialIcons name="photo-library" size={24} color="white" />
              <Text style={{ marginLeft: 5, color: 'white' }}>Gallery</Text>
            </Button>
            <Button
              iconLeft
              style={{ paddingHorizontal: 15, marginLeft: 10 }}
              onPress={launchCameraHandler}>
              <MaterialIcons name="camera" size={24} color="white" />
              <Text style={{ marginLeft: 5, color: 'white' }}>Camera</Text>
            </Button>
          </Item>
        )}

        <Text style={styles.grayText}>Food Title</Text>
        <PostTextInput
          email={title}
          setEmail={setTitle}
          checkEmail={checkTitle}
          setCheckEmail={setCheckTitle}
          type={'text'}
        />

        <Text style={styles.grayText}>Food Description (optional)</Text>
        <PostTextInput
          email={description}
          setEmail={setDescription}
          checkEmail={checkDescription}
          setCheckEmail={setCheckDescription}
          type={'text'}
        />

        <Text style={styles.grayText}>Food Quantity</Text>
        <PostTextInput
          email={quantity.toString()}
          setEmail={setQuantity}
          checkEmail={checkQuantity}
          setCheckEmail={setCheckQuantity}
          type={'numeric'}
        />

        <Text style={styles.grayText}>Food Weight</Text>
        <PostTextInput
          email={weight}
          setEmail={setWeight}
          checkEmail={checkWeight}
          setCheckEmail={setCheckWeight}
          type={'text'}
        />

        <TouchableOpacity onPress={updatePostHandler} style={{ marginTop: 50 }}>
          <View style={styles.loginButton}>
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Save Changes
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </Content>
    </Container>
  ) : (
    <Camera takePhotoFunc={takePhoto} />
  );
};

const styles = StyleSheet.create({
  cameraView: {
    backgroundColor: 'lightgray',
    height: 100,
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#1e319d',
    borderRadius: 3,
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    height: 45,
    paddingTop: 12,
  },
  grayText: {
    color: '#88929c',
    paddingLeft: 6,
    marginTop: 35,
  },
  item: {
    marginTop: -10,
    borderBottomColor: 'lightgray',
  },
  input: {
    fontSize: 15,
    marginBottom: -7,
  },
  squareBox: {
    backgroundColor: "white",
    height: 42,
    width: 46,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    shadowOpacity: 0.1,
    shadowColor: "navy",
    shadowRadius: 2,
    elevation: 5,
  },
});

export default EditPost;
