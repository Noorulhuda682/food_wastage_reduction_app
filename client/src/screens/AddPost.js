import React, {
    useState
} from 'react';
import {
    View,
    Text,
    TextInput,
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
import { useSelector, useDispatch } from "react-redux"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Camera from "./Camera";
import uploadImageToCloud from "../config/uploadImageToCloudinary";
import setImageFileForCloudinary from "../config/setImageForCloudinary";

const AddPost = ({ navigation }) => {
    const [uploadImg, setUploadImg] = useState(false);
    const [usingCamera, setUsingCamera] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [img1, setImg1] = useState(null)
    const data = useSelector(state => state);
    console.log("LOGINDATA===>", data);
    const dispatch = useDispatch();

    const login = () => {
        dispatch(addUser());
        navigation.navigate("SignUp")
    }

    const launchImageLibraryHandler =  () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            checkPhotoValidation(response)
        });

    }
    const launchCameraHandler =  () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
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
            // console.log('response', JSON.stringify(response));
            console.log('source', source);
            setUsingCamera(false)
            setUploadImg(false)
            // setImg1(response.uri)
            let imageFile = setImageFileForCloudinary(response.uri)
            let data = await uploadImageToCloud(imageFile)
            let {uploading,message,url} = data
            if(uploading){
             setImg1(url)
            }else{
                Alert.alert(message)
            } 
        }
    }
 

    const takePhoto = async (imgData) => {
       setUsingCamera(false)
       setUploadImg(false)
       let imageFile = setImageFileForCloudinary(imgData.uri)
       let data = await uploadImageToCloud(imageFile)
       let {uploading,message,url} = data
       if(uploading){
        setImg1(url)
       }else{
           Alert.alert(message)
       } 
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
                            <Item
                                // success
                                style={styles.item}
                            >
                                <Input
                                    value={"Biryani"}
                                    style={styles.input}
                                //  onChangeText={(emails) => { console.log("emails", emails);
                                //   setEmail(emails) }}
                                />
                                {/* <Icon name='checkmark-circle' /> */}
                            </Item>
                            <Text style={styles.grayText} >Food Desciption</Text>
                            <Item
                                // success
                                style={styles.item}
                            >
                                <Input
                                    value={"Only for needy people"}
                                    style={styles.input}
                                //  onChangeText={(emails) => { console.log("emails", emails);
                                //   setEmail(emails) }}
                                />
                                {/* <Icon name='checkmark-circle' /> */}
                            </Item>
                            <Text style={styles.grayText} >Food Weight</Text>
                            <Item
                                // success
                                style={styles.item}
                            >
                                <Input
                                    value={"20kg"}
                                    style={styles.input}
                                //  onChangeText={(emails) => { console.log("emails", emails);
                                //   setEmail(emails) }}
                                />
                                {/* <Icon name='checkmark-circle' /> */}
                            </Item>


                            <TouchableOpacity
                                onPress={login}
                                style={{ marginTop: 50,}}>
                                {loading ?
                                    <Text style={styles.loginButton}>
                                        ...   <ActivityIndicator size="small" color='lightgray' />   ...
                                    </Text> :
                                    <Text style={styles.loginButton}>
                                        UPLOAD+
                                   </Text>
                                }
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
        height:45,
        paddingTop:12
    },
    grayText: {
        color: "#88929c",
        paddingLeft: 6,
        marginTop: 15
    },
    item: {
        marginTop: -10,
        borderBottomColor: "gray"
    },
    input: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: -5
    }


})

export default AddPost;