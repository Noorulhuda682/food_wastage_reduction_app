import React, { useEffect } from 'react';
import {
    View, ActivityIndicator,
    Text, Dimensions,
    StyleSheet, Image, Alert, TextInput,
    TouchableOpacity
} from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
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
import PostCard from "../shared/PostCard"

const MyPosts = ({ navigation }) => {
    const storeData = useSelector(state => state);
    console.log("MyPosts===>", storeData?.user._id);

    const { loading, error, data } = useQuery(MYPOSTS, {
        variables: { userId: storeData?.user._id }
    });


    if (error) Alert.alert(`Error! ${error.message}`);

    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         console.log("navigation**********************", data);
    //     });
    //     return unsubscribe;
    // }, [navigation]);


    console.log("navigation**********************22", data, storeData?.user._id );

    return (
        <Container>
            <Header style={{ backgroundColor: "#00203FFF" }}>
                <Left>
                    <Button transparent onPress={() => navigation.openDrawer()}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>MyPosts</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
                    </Button>
                </Right>
            </Header>
            <Content style={styles.mainContent} padder>

                <Item style={{ marginBottom: 10,marginTop:-10 }}>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" />
                    <Icon name="ios-people" />
                </Item>
  
                {loading &&
                 <ActivityIndicator color="blue" />
                }

                 {data?.userPosts.map( (foodPost,key) =>  <PostCard foodPost={foodPost} key={key} /> )}

                {/* <PostCard/>
                <PostCard/> */}

               
            </Content>
        </Container>

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
export default MyPosts;