import React, {
    useState
} from 'react';
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
    Alert
} from 'react-native'
import {
    Container, Header, Content, Item, Input, Icon, Spinner,
    Body, Right, Title, Left, Button,
    Card, CardItem, H2, Footer,
} from 'native-base';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Camera from "./Camera";
import uploadImageToCloud from "../config/uploadImageToCloudinary";
import setImageFileForCloudinary from "../config/setImageForCloudinary";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux"
import { ADDPOST } from "../typeDefs/Post"
import PostTextInput from "../shared/TextInput"

const options = {
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const AddPost = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [checkTitle, setCheckTitle] = useState(false)
    const [description, setDescription] = useState("");
    const [checkDescription, setCheckDescription] = useState(false)
    const [quantity, setQuantity] = useState("");
    const [checkQuantity, setCheckQuantity] = useState(false)
    const [weight, setWeight] = useState("");
    const [checkWeight, setCheckWeight] = useState(false)


    const [uploadImg, setUploadImg] = useState(false);
    const [usingCamera, setUsingCamera] = useState(false);

    const [loading, setLoading] = useState(false);
    const [img1, setImg1] = useState(null)
    const data = useSelector(state => state);
    console.log("AddPOSST===>", data?.user._id);

    const [_addDATA, { datas, error }] = useMutation(ADDPOST);

    console.log("DATA-=>", datas, error);

    const uploadFood = async () => {
        if (title === "") {
            ToastAndroid.showWithGravity(
                "Empty title",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false
        }
        // if (quantity === "") {
        //     ToastAndroid.showWithGravity(
        //         "Empty quantity",
        //         ToastAndroid.SHORT,
        //         ToastAndroid.CENTER
        //     ); return false
        // }
        // if (quantity === "") {
        //     ToastAndroid.showWithGravity(
        //         "Empty quantity",
        //         ToastAndroid.SHORT,
        //         ToastAndroid.CENTER
        //     ); return false
        // }

        setLoading(true)


        //upload image to Cloudinary
        // if(img1){
        //     let imageFile = setImageFileForCloudinary(img1)
        //     let data = await uploadImageToCloud(imageFile)
        //     var { uploading, message, url } = data
        //     if(uploading){

        //     }else{
        //         Alert.alert(`${message}`)
        //         return false
        //     }
        // }

        // console.log("IMG", url);
        // console.log("DATA-=>", datas, error);
        _addDATA({
            variables: {
                userId: data?.user._id,
                title,
                description,
                quantity: 12,
                img1,
            }
        }).then(({ data }) => {
            Alert.alert(`${data}`)
            setLoading(false)
            navigation.navigate("myPosts")
            // you can do something with the response here
        })
            .catch(e => {
                // Alert.alert(`${e}`)
                setLoading(false)
                // you can do something with the error here
            })
        // navigation.navigate("myPosts")


        if (error) {
            Alert.alert(`${error}`)
        }
    }



    const launchImageLibraryHandler = () => {
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            checkPhotoValidation(response)
        });

    }
    const launchCameraHandler = () => {
        launchCamera(options, (response) => {
            console.log('Response = ', response);
            checkPhotoValidation(response)
        });
    }

    const checkPhotoValidation = async (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
        } else {
            const source = { uri: response.uri };
            setImg1(response.uri)
            setUsingCamera(false)
            setUploadImg(false)
        }
    }


    const takePhoto = async (imgData) => {
        setUsingCamera(false)
        setUploadImg(false)
        setImg1(imgData.uri)
    }

    return (
        !usingCamera ?
            <KeyboardAvoidingView >
                <ScrollView>
                    <Container >
                        <Header style={{ backgroundColor: "#00203FFF" }}>
                            <Left >
                                <Icon onPress={() => navigation.openDrawer()} name='menu' style={{ color: "white" }} />
                            </Left>
                            <Body>
                                <Title>Upload Food</Title>
                            </Body>
                            <Right>
                                <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
                            </Right>
                        </Header>
                        <Content padder>
                            <Text style={styles.grayText} >Food Image</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                                {img1 && <TouchableOpacity style={styles.cameraView}>
                                    {/* <Ionicons name="ios-camera" size={24} color="gray" /> */}
                                    <Image style={{ height: "100%", width: "100%" }} source={{ uri: img1 }} />
                                </TouchableOpacity>}

                                {/*  <TouchableOpacity style={{backgroundColor:"lightgray",marginHorizontal:2,
                                height:100,width:"33%",justifyContent:"center",alignItems:"center"}}>
                                <Ionicons name="ios-camera" size={24} color="gray" />
                            </TouchableOpacity> */}
                                <TouchableOpacity onPress={() => setUploadImg(!uploadImg)} style={styles.cameraView}>
                                    {/* <Ionicons name="ios-camera" size={24} color="gray" /> */}
                                    <FontAwesome name="photo" size={24} color="gray" />
                                    {/* <Image style={{height:"100%",width:"100%"}} source={{uri:img1}}/> */}
                                </TouchableOpacity>
                            </View>
                            {uploadImg &&
                                <Item style={{ justifyContent: "space-around", marginTop: 10 }}>
                                    <Button iconLeft
                                        style={{ paddingRight: 15 }}
                                        onPress={() => setUsingCamera(true)}
                                    >
                                        <Icon name='ios-camera' />
                                        <Text style={{ marginLeft: 5, color: "white" }}>Take Photo</Text>
                                    </Button>
                                    <Button iconLeft
                                        style={{ paddingHorizontal: 15 }}
                                        onPress={launchImageLibraryHandler}
                                    >
                                        <MaterialIcons name="photo-library" size={24} color="white" />
                                        <Text style={{ marginLeft: 5, color: "white" }}>Gallery</Text>
                                    </Button>
                                    <Button iconLeft
                                        style={{ paddingHorizontal: 15 }}
                                        onPress={launchCameraHandler}
                                    >
                                        <MaterialIcons name="camera" size={24} color="white" />
                                        <Text style={{ marginLeft: 5, color: "white" }}>Camera</Text>
                                    </Button>

                                </Item>
                            }


                            <Text style={styles.grayText} >Food Title</Text>
                            <PostTextInput
                                email={title}
                                setEmail={setTitle}
                                checkEmail={checkTitle}
                                setCheckEmail={setCheckTitle}
                                type={"text"}
                            />

                            <Text style={styles.grayText} >Food Description (optional)</Text>
                            <PostTextInput
                                email={description}
                                setEmail={setDescription}
                                checkEmail={checkDescription}
                                setCheckEmail={setCheckDescription}
                                type={"text"}
                            />

                            <Text style={styles.grayText} >Food Quantity</Text>
                            <PostTextInput
                                email={quantity}
                                setEmail={setQuantity}
                                checkEmail={checkQuantity}
                                setCheckEmail={setCheckQuantity}
                                type={'text'}
                            />

                            <Text style={styles.grayText} >Food Weight</Text>
                            <PostTextInput
                                email={weight}
                                setEmail={setWeight}
                                checkEmail={checkWeight}
                                setCheckEmail={setCheckWeight}
                                type={'text'}
                            />



                            <TouchableOpacity
                                onPress={uploadFood}
                                style={{ marginTop: 50, }}>
                                <View style={styles.loginButton} >
                                    {loading ? <ActivityIndicator color='white' size="small" />
                                        :
                                        <Text style={{ color: "white", textAlign: "center" }} >LOGIN</Text>
                                    }
                                </View>
                            </TouchableOpacity>
                        </Content>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            : <Camera takePhotoFunc={takePhoto} />
    );
}

const styles = StyleSheet.create({
    cameraView: {
        backgroundColor: "lightgray",
        height: 100, width: "33%",
        justifyContent: "center",
        alignItems: "center"
    },
    loginButton: {
        backgroundColor: "#00203FFF",
        borderRadius: 3,
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        height: 45,
        paddingTop: 12
    },
    grayText: {
        color: "#88929c",
        paddingLeft: 6,
        marginTop: 35
    },
    item: {
        marginTop: -10,
        borderBottomColor: "lightgray",
    },
    input: {
        fontSize: 15,
        marginBottom: -7
    }


})

export default AddPost;