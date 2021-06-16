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
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Camera from "./Camera";
// import uploadImageToCloud from "../config/uploadImageToCloudinary";
// import setImageFileForCloudinary from "../config/setImageForCloudinary";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux"
import { removeUser } from "../redux/actions/user"
import { clearStorage } from "../config/setToken";
// import { ADDPOST } from "../typeDefs/Post"
// import PostTextInput from "../shared/PostTextInput"



const CustomeHeader = ({ navigation, title }) => {
    const dispatch = useDispatch();
    const [showBtn, setShowBtn] = useState(false)
    
    // "#00203FFF" this is older blue

    return (
        <Header style={styles.Header}>
            <Left >
                <Icon onPress={() => navigation.openDrawer()} name='menu' style={{ color: "white" }} />
            </Left>
            <Body style={{flex:2}}>
                <Title>{title}</Title>
            </Body>
            <Right >
                {showBtn &&
                    <TouchableOpacity
                        onPress={async () => {
                            dispatch(removeUser());
                            clearStorage()
                            navigation.navigate('Login')
                        }}
                        style={{
                            backgroundColor: "white", width: 100, height: 40,
                            position: "absolute", top: 5, right: 22, borderRadius: 5, zIndex: -1,
                            flex: 1, alignItems: "center", justifyContent: "center",
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,
                            elevation: 3,
                        }}>
                        
                        <Text style={{
                            color: "gray",
                        }}>
                          <AntDesign name="logout" size={13} color={"gray"} />  logout</Text>
                    </TouchableOpacity>

                }

                <TouchableOpacity onPress={() => setShowBtn(!showBtn)}>
                    <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
                </TouchableOpacity>
            </Right>
        </Header>
    );
}

const styles = StyleSheet.create({
    Header: {
        backgroundColor: "#1e319d"
    }

})

export default CustomeHeader;