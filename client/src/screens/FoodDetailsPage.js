import React, { useEffect, useState } from 'react';
import {
    View, Text, ImageBackground,
    StyleSheet, Image, BackHandler, TouchableOpacity
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

    // console.log("DETAILPAGE====",route.params);
    // let { routeName, user } = route.params

    // useEffect(() => {
    //     const backAction = () => {
    //         navigation.navigate(routeName);
    //         return true;
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //         "hardwareBackPress",
    //         backAction
    //     );

    //     return () => backHandler.remove();
    // }, [route]);

    return (
        <Container>
            <Content style={{ backgroundColor: "white" }}>
                <ImageBackground style={styles.coverPhoto}
                    resizeMode='cover'
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYUzb2VVE2Kw9sI_bHK-Z5wYTMHNvGMths8A&usqp=CAU" }}
                >
                    <Header style={{ backgroundColor: null, elevation: 0 }}>
                        <Left>
                            <TouchableOpacity style={styles.squareBox}>
                                <MaterialCommunityIcons
                                    onPress={() => navigation.navigate(routeName)}
                                    name="keyboard-backspace" size={24} color="gray" />
                            </TouchableOpacity>
                        </Left>
                        <Right>
                            <TouchableOpacity style={styles.squareBox}>
                                <FontAwesome name="home" size={20} color="gray" />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                </ImageBackground>
                <Content padder style={{ paddingTop: 20 }}>
                    <Text style={styles.title}>Special Biryani</Text>
                    <Text style={styles.line1}></Text>
                    <Text style={styles.line2}></Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap" }}>
                        <TouchableOpacity style={styles.squareBoxBottom}>
                            <Text style={{ color: "gray" }}>Quantity</Text>
                            <Text style={{ fontSize: 30, fontWeight: "bold" }}>50</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.squareBoxBottom}>
                            <Text style={{ color: "gray" }}>Weight</Text>
                            <Text style={{ fontSize: 25, fontWeight: "bold" }}>50kg</Text>
                        </TouchableOpacity>
                    </View>


                    <Text style={[styles.title, { marginTop: 20, fontSize: 15, color: "black" }]}>Description </Text>
                    <Text style={{ color: "gray" }}>
                        This is the app for needy people only
                    </Text>

                    <Text style={[styles.title,{marginTop:30}]}>Uploader</Text>
                    <Text style={styles.line1}></Text>
                    <Text style={styles.line2}></Text>


                    <Text style={[styles.title,{marginTop:30}]}>Receiver</Text>
                    <Text style={styles.line1}></Text>
                    <Text style={styles.line2}></Text>
                    
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
    }
})
export default FoodDetailsPage;