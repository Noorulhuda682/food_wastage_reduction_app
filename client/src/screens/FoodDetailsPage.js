import React, { useEffect, useState } from 'react';
import {
    View, Text, ImageBackground,
    StyleSheet, Image, BackHandler, TouchableOpacity, Alert
} from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    Container, Left, Body, Right, Header, Thumbnail, Button, Icon, Title,
    Content, Item, Input,
    List,
} from 'native-base';
import { useSelector } from "react-redux";
import { POSTS } from "../typeDefs/Post";
import { ListItem } from "../shared/index"
import { NavigationContainer } from '@react-navigation/native';

const FoodDetailsPage = ({ route, navigation }) => {
    const [searchValue, setSearchValue] = useState("")
    let { routeName, foodPost } = route.params
    // console.log("DETAILPAGE====", routeName, foodPost);
    // let { routeName, user } = route.params

    useEffect(() => {
        const backAction = () => {
            navigation.navigate(routeName);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [route]);

    return (
        <Container>
            <Content style={{ backgroundColor: "white" }}>
                <ImageBackground style={styles.coverPhoto}
                    resizeMode='cover'
                    source={{ uri: foodPost.img1 }}
                >
                    <Header style={{ backgroundColor: null, elevation: 0 }}>
                        <Left>
                            <TouchableOpacity onPress={() => navigation.navigate(routeName)}
                                style={styles.squareBox}>
                                <MaterialCommunityIcons
                                    name="keyboard-backspace" size={24} color="gray" />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ borderWidth: 0 }}>
                            <TouchableOpacity
                                style={[styles.squareBox, { width: "100%" }]}>
                                <Text style={{ color: "gray" }}>Food Details</Text>
                            </TouchableOpacity>
                        </Body>
                        <Right>
                            <TouchableOpacity onPress={() => navigation.navigate("home")}
                                style={styles.squareBox}>
                                <FontAwesome name="home" size={20} color="gray" />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                </ImageBackground>
                <Content padder style={{ paddingTop: 20 }}>
                    <Text style={styles.title}>{foodPost.title}</Text>
                    <Text style={styles.line1}></Text>
                    <Text style={styles.line2}></Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap" }}>
                        <TouchableOpacity style={styles.squareBoxBottom}>
                            <Text style={{ color: "gray" }}>Quantity</Text>
                            <Text style={{ fontSize: 30, fontWeight: "bold" }}>{foodPost.quantity}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.squareBoxBottom}>
                            <Text style={{ color: "gray" }}>Weight</Text>
                            <Text style={{ fontSize: 25, fontWeight: "bold" }}>{foodPost.weight}</Text>
                        </TouchableOpacity>
                    </View>


                    <Text style={[styles.title, { marginTop: 25, fontSize: 15, color: "black" }]}>Description </Text>
                    <Text style={{ color: "gray", marginTop: 5 }}>
                        {foodPost.description}
                    </Text>

                    <Text style={[styles.title, { marginTop: 30, fontSize: 22 }]}>Uploader</Text>
                    <Text style={styles.line1}></Text>
                    <Text style={styles.line2}></Text>
                    <TouchableOpacity style={styles.userView}>
                        {foodPost.user[0].profileImage ? <Image
                            style={styles.userProfile}
                            source={{ uri: foodPost.user[0].profileImage }}
                        /> :
                            <EvilIcons name="user" style={{ marginLeft: -20 }} size={130} color="lightgray" />
                        }
                        <View style={styles.userInfo}>
                            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>{foodPost.user[0].name}</Text>
                            <Text style={{ fontSize: 13, color: "gray" }}>{foodPost.user[0].email}</Text>
                        </View>
                    </TouchableOpacity>


                    <Text style={[styles.title, { marginTop: 30, fontSize: 22 }]}>Rider</Text>
                    <Text style={styles.line1}></Text>
                    <Text style={styles.line2}></Text>
                    {foodPost.receiver.length ?
                        <TouchableOpacity style={styles.userView}>
                            {foodPost.receiver[0].profileImage ? <Image
                                style={styles.userProfile}
                                source={{ uri: foodPost.receiver[0].profileImage }}
                            /> :
                                <EvilIcons name="user" style={{ marginLeft: -20 }} size={130} color="lightgray" />
                            }
                            <View style={styles.userInfo}>
                                <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>{foodPost.receiver[0].name}</Text>
                                <Text style={{ fontSize: 13, color: "gray" }}>{foodPost.receiver[0].email}</Text>
                            </View>
                        </TouchableOpacity>
                        : <Text>No Rider</Text>
                    }


                </Content>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    content1: {
        backgroundColor: "#1e319d",
        height: 50,
        // paddingHorizontal: 10
    },
    content2: {
        backgroundColor: "white"
    },
    coverPhoto: {
        height: 220,
        borderRadius: 50
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
    squareBoxBottom: {
        backgroundColor: "white",
        // height: 50,
        // width: 46,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        shadowOpacity: 0.1,
        shadowColor: "navy",
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold"
    },
    line1: {
        width: "50%",
        marginTop: 5,
        borderTopWidth: 1,
        borderColor: "lightgray"
    },
    line2: {
        width: "50%",
        marginTop: 3,
        borderTopWidth: 1,
        borderColor: "lightgray",
        width: "60%",
        marginTop: -13
    },
    userView: {
        flexDirection: "row",
        paddingLeft: 10
    },
    userProfile: {
        height: 90,
        width: 90,
        borderRadius: 50,
        marginRight: 15,
    },
    userInfo: {
        paddingVertical: 10,
        justifyContent: "space-around"
    }
})
export default FoodDetailsPage;