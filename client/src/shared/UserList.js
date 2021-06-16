import React, { useEffect } from 'react';
import {
    View, ActivityIndicator,
    Text, Dimensions,
    StyleSheet, Image, Alert, TextInput,
    TouchableOpacity
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    Container, Left, Body, Right, Button, Icon, Title, Content,
    Card, CardItem, H2, Footer, Thumbnail,
    Fab, Spinner, SwipeRow, Input, Item, List, ListItem
    // Text
} from 'native-base';
const { width, height } = Dimensions.get('window')
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { MYPOSTS } from "../typeDefs/Post";
import PostCard from "../shared/PostCard"
import Header from "../shared/Header";


const UserList = ({ navigation, user, index }) => {

    return (

        <View key={index} style={{
            marginTop: 10,
        }}>
            <SwipeRow
                leftOpenValue={75}
                rightOpenValue={-75}
                left={
                    <Button success onPress={() => alert('Add')}>
                        <Icon active name="add" />
                    </Button>
                }
                style={{
                    // backgroundColor: "pink",
                    height: 70,
                    padding: 0,
                    margin: 0,
                    // borderBottomWidth:0
                }}
                body={
                    <View style={{
                        width: "100%",
                    }}>
                        <View style={{
                            backgroundColor: "white",
                            flex: 1,
                            flexDirection: "row"
                        }}>
                            <View style={{ flex: 1.5, backgroundColor: "white", height: 60 }}>
                                {user.profileImage ?

                                    <Image style={{
                                        height: 58, width: 60, marginTop: -13
                                    }} source={{ uri: user.profileImage }} />
                                    :
                                    <Text style={{
                                        backgroundColor: "white", textAlign: "center",
                                        backgroundColor: "red", marginTop: -13, backgroundColor: "lightgray",
                                        width: 60, height: 60,
                                    }}>

                                        <Entypo name="user" size={52} color="white" />
                                    </Text>
                                }

                            </View>
                            <View style={{
                                flex: 5.5, marginTop: -10,
                            }}>
                                <Text style={{ color: "black", fontWeight: "bold", fontSize: 15 }}>{user.name}</Text>
                                <Text style={{ color: "gray", fontSize: 11 }}>{user.email}</Text>
                            </View>
                            <View style={{
                                flex: 1, justifyContent: "center",
                                alignItems: "flex-end"
                            }}>
                                <Text style={{ color: "blue" }}>View</Text>
                            </View>
                        </View>
                    </View>
                }
                right={
                    <Button danger onPress={() => alert('Trash')}>
                        <Icon active name="trash" />
                    </Button>
                }
            />
        </View>


    );
}

const styles = StyleSheet.create({
    mainContent: {
        //  paddingTop:20
        textAlign: "center",
        // flex:1,
        // alignItems:"center"
    },
    heading: {
        fontWeight: "bold",
        fontSize: 35,
        color: "#00203FFF"
        // textAlign:"center"
    },
    para: {
        fontSize: 16,
        paddingLeft: 5,
        color: "#00203FFF",
        paddingBottom: 20
    },
    headContent: {
        paddingTop: 20,
        height: 100,
        backgroundColor: '#adcfe6',
    },
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,

        elevation: 7,
    }

})
export default UserList;