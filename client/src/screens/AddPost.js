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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Camera from './Camera';
import uploadImageToCloud from '../config/uploadImageToCloudinary';
import setImageFileForCloudinary from '../config/setImageForCloudinary';
import {useMutation} from '@apollo/client';
import {useSelector, useDispatch} from 'react-redux';
import {ADDPOST} from '../typeDefs/Post';
import PostTextInput from '../shared/PostTextInput';
import Header from '../shared/Header';

const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const AddPost = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [checkTitle, setCheckTitle] = useState(false);
  const [description, setDescription] = useState('');
  const [checkDescription, setCheckDescription] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [checkQuantity, setCheckQuantity] = useState(false);
  const [weight, setWeight] = useState('');
  const [checkWeight, setCheckWeight] = useState(false);

  const [uploadImg, setUploadImg] = useState(false);
  const [usingCamera, setUsingCamera] = useState(false);

  const [loading, setLoading] = useState(false);
  const [img1, setImg1] = useState(null);
  const datas = useSelector(state => state);
  console.log('AddPOSST===>', datas?.user._id);

  const [_addDATA, {data}] = useMutation(ADDPOST);

  console.log('DATA-=>', title, description, quantity, weight);

  const uploadFood = async () => {
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

    var varData = {
      userId: datas?.user?._id,
      title,
      description,
      quantity: JSON.parse(quantity),
      weight,
    };

    console.log('varData', varData);
    // upload image to Cloudinary
    if (img1) {
      let imageFile = setImageFileForCloudinary(img1);
      let data = await uploadImageToCloud(imageFile);
      var {uploading, message, url} = data;
      if (uploading) {
        varData.img1 = url;
      } else {
        Alert.alert(`${message}`);
        setLoading(false);
        return false;
      }
    }

    _addDATA({
      variables: varData,
    })
      .then(({data}) => {
        Alert.alert(`Uploading Successfull`);
        console.log('Success===', data);
        setLoading(false);
        setTitle('');
        setDescription('');
        setWeight('');
        setQuantity('');
        setImg1(null);
        navigation.navigate('newOrders');
        // you can do something with the response here
      })
      .catch(e => {
        Alert.alert(`${e}`);
        setLoading(false);
        // you can do something with the error here
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
      const source = {uri: response.uri};
      setImg1(response.uri);
      setUsingCamera(false);
      setUploadImg(false);
    }
  };

  const takePhoto = async imgData => {
    setUsingCamera(false);
    setUploadImg(false);
    setImg1(imgData.uri);
  };

  return !usingCamera ? (
    <KeyboardAvoidingView>
      <ScrollView>
        <Container>
          <Header navigation={navigation} title={'Upload Food'} />
          <Content padder>
            <Text style={styles.grayText}>Food Image</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {img1 ? (
                <View style={{width:"100%",alignItems:"center"}}>
                  <TouchableOpacity
                    style={[
                      styles.cameraView,
                      {width: '70%', height: 120, margin: 10},
                    ]}
                    onPress={() => setUploadImg(!uploadImg)}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={{uri: img1}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> setImg1(null)} style={{marginTop:-5}}>
                    <Text style={{color:"blue"}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => setUploadImg(!uploadImg)}
                  style={styles.cameraView}>
                  <FontAwesome name="photo" size={24} color="gray" />
                </TouchableOpacity>
              )}
            </View>
            {uploadImg && (
              <Item style={{justifyContent: 'space-around', marginTop: 10}}>
                {/* <Button
                  iconLeft
                  style={{paddingRight: 15}}
                  onPress={() => setUsingCamera(true)}>
                  <Icon name="ios-camera" />
                  <Text style={{marginLeft: 5, color: 'white'}}>
                    Take Photo
                  </Text>
                </Button> */}
                <Button
                  iconLeft
                  style={{paddingHorizontal: 15, marginLeft: 10}}
                  onPress={launchImageLibraryHandler}>
                  <MaterialIcons name="photo-library" size={24} color="white" />
                  <Text style={{marginLeft: 5, color: 'white'}}>Gallery</Text>
                </Button>
                <Button
                  iconLeft
                  style={{paddingHorizontal: 15, marginLeft: 10}}
                  onPress={launchCameraHandler}>
                  <MaterialIcons name="camera" size={24} color="white" />
                  <Text style={{marginLeft: 5, color: 'white'}}>Camera</Text>
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
              email={quantity}
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

            <TouchableOpacity onPress={uploadFood} style={{marginTop: 50}}>
              <View style={styles.loginButton}>
                {loading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    Upload
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </Content>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
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
    backgroundColor: '#00203FFF',
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
});

export default AddPost;
