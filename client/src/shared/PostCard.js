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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from "react-native-vector-icons/Entypo"
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
    const storeData = useSelector(state => state);
    const [focusKey, setFocusKey] = useState(null)
    // console.log("PostCard=====", foodPost);
    var user = foodPost?.user?.length ? foodPost?.user[0] : [];
    var receiver = foodPost?.receiver?.length ? foodPost?.receiver[0] : [];

    return (
        <TouchableOpacity key={key} style={{ marginTop: 20, borderBottomWidth: 1, paddingBottom: 5, borderColor: "lightgray", flex: 1, flexDirection: "row", marginRight: 10 }}>
            <View style={{ width: "30%" }}>

                {foodPost.img1 !== null ?
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
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "gray", marginRight: 3 }} >
                            {storeData?.user?.role === "USER" ? 'Receiver' : 'Uploader'}
                        </Text>
                        <Thumbnail style={{ height: 22, width: 22 }} source={require('../assets/images/profile.jpg')} />
                        <Text style={{ marginLeft: 5, fontSize: 11 }}>Noorul Huda</Text>

                    </Button>

                    <TouchableOpacity transparent style={{ marginTop: 10 }}
                        onPress={() => navigation.navigate("map")}
                    >
                        <Text style={{ marginLeft: 5, fontSize: 11 }}><MaterialCommunityIcons name="map-marker" size={20} color="#00238b" />Map</Text>
                    </TouchableOpacity>
                </Button>

                {focusKey === key && <View style={{ flex: 1, flexDirection: "row", width: "60%" }}>
                    {storeData?.user?.role === "USER" &&
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
                    }
                    {storeData?.user?.role === "USER" &&

                        <TouchableOpacity style={{
                            backgroundColor: "#ea1715",
                            marginHorizontal: 2,
                            borderRadius: 3,
                            paddingHorizontal: 15,
                            paddingVertical: 5,
                        }}>
                            <Text style={{ color: "white" }}>
                                <AntDesign name="delete" size={15} color="white" />
                                {` `}Delete
                            </Text>
                        </TouchableOpacity>
                    }
                    {storeData?.user?.role === "RECEIVER" &&
                        foodPost.status === "NEW" ?
                        <TouchableOpacity style={[styles.updateBtn, { backgroundColor: "#00203FFF", }]}>
                            <MaterialIcons name="delivery-dining" size={20} color="white" />
                            <Text style={{ color: "white", }}>
                                {`   `}Accept Delivering
                            </Text>
                        </TouchableOpacity>
                        : foodPost.status === "PROGRESS" ?
                            <TouchableOpacity style={[styles.updateBtn, {backgroundColor:"#b4006b", }]}>
                                <MaterialCommunityIcons name="cursor-pointer" size={19} color="white" />
                                <Text style={{ color: "white", }}>
                                    {` `} Received Food
                                </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={[styles.updateBtn, { backgroundColor: "green", }]}>
                                    <Entypo name="check" size={20} color="white" />
                                <Text style={{ color: "white", }}>
                                    {` `}Delivered
                                </Text>
                            </TouchableOpacity>
                    }
                </View>}

            </View>

        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    updateBtn: {
        marginHorizontal: 2,
        borderRadius: 3,
        paddingHorizontal: 15,
        height: 37,
        width: 200,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})
export default PostCard;