import React, { useEffect, useState } from 'react';
import {
    View, ActivityIndicator,
    Text, Dimensions,
    StyleSheet, Image, Alert, TextInput,
    TouchableOpacity
} from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title, Content,
    Card, CardItem, H2, Footer, Thumbnail,
    Fab, Spinner, SwipeRow, Input, Item
    // Text
} from 'native-base';
const { width, height } = Dimensions.get('window')
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { MYPOSTS } from "../typeDefs/Post";


const PostCard = ({ navigation, foodPost, key }) => {
    
    const [focusKey, setFocusKey] = useState(null)
    console.log("PostCard=====", foodPost);

    return (
        <TouchableOpacity key={key} style={{ marginTop: 20, borderBottomWidth: 1, paddingBottom: 5, borderColor: "lightgray", flex: 1, flexDirection: "row", marginRight: 10 }}>
            <View style={{ width: "30%" }}>

                {foodPost.img1 ?
                    <Image source={{ uri: foodPost.img1 }} style={{
                        height: 120, width: null, flex: 1, borderRadius: 5,
                    }} />
                    :
                    <Image source={require('../assets/images/foods.jpeg')} style={{
                        height: 120, width: null, flex: 1, borderRadius: 5,
                    }} />
                }


            </View>

            <View style={{ marginLeft: "4%", backgroundColor: "white", width: "66%" }}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{foodPost.title}</Text>
                    <TouchableOpacity onPress={() => setFocusKey(focusKey === null ? key : null)}>
                        <MaterialCommunityIcons name="dots-vertical" size={22} color="blue" />
                    </TouchableOpacity>

                </View>
                <Text style={{ color: "gray", fontSize: 14 }}>
                    Quantity: {foodPost.quantity}

                </Text>
                <Text style={{ color: "gray" }}>Weight: {foodPost.weight}</Text>
                <Text style={{ color: "gray" }}>Status: not Given {` `}
                    <FontAwesome name="star" size={12} color="#DAA520" />
                    <FontAwesome name="star" size={12} color="#DAA520" />
                    <FontAwesome name="star" size={12} color="#DAA520" />
                </Text>

                <Button transparent style={{
                    width: "100%"
                }}>
                    <Button transparent>
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "gray" }} >Receiver : </Text>
                        <Thumbnail style={{ height: 22, width: 22 }} source={require('../assets/images/profile.jpg')} />
                        <Text style={{ marginLeft: 5, fontSize: 11 }}>Noorul Huda</Text>

                    </Button>

                    <Button transparent style={{ marginRight: 10 }}>
                        <MaterialCommunityIcons name="map-marker" size={20} color="#00238b" />
                        <Text style={{ marginLeft: 5, fontSize: 11 }}>Map</Text>
                    </Button>
                </Button>

                {focusKey === key &&  <View style={{ flex: 1, flexDirection: "row", width: "60%" }}>
                    <TouchableOpacity style={{
                        backgroundColor: "#00203FFF", marginHorizontal: 2, borderRadius: 3,
                        paddingHorizontal: 15,
                        paddingVertical: 5,


                    }}>
                        <Text style={{ color: "white" }}>
                            <Feather name="edit" size={15} color="white" />
                            {`  `}Edit{`  `}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: "#ea1715", marginHorizontal: 2, borderRadius: 3,
                        paddingHorizontal: 15,
                        paddingVertical: 5,


                    }}>
                        <Text style={{ color: "white" }}>

                            <AntDesign name="delete" size={15} color="white" />
                            {` `}Delete
                                    </Text>
                    </TouchableOpacity>

                </View>}

            </View>

        </TouchableOpacity>

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
export default PostCard;