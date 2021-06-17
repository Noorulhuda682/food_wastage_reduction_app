import React, { useState,useEffect } from 'react';
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
    Container, Left, Body, Right, Button, Icon, Title, Content,
    Card, CardItem, H2, Footer, Thumbnail,
    Fab, Spinner, SwipeRow, Input, Item
    // Text
} from 'native-base';
const { width, height } = Dimensions.get('window')
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { POSTS} from "../typeDefs/Post";
import PostCard from "../shared/PostCard"
import Header from "../shared/Header"
import { SearchBar } from '../shared/index';

const NewOrders = ({ navigation }) => {
    const storeData = useSelector(state => state);
    const [searchValue, setSearchValue] = useState("")
    // console.log("MyPosts===>", storeData?.user._id);

    const { loading, error, data } = useQuery(POSTS,{
        variables:{
            status:"NEW"
        }
    });


    if (error) Alert.alert(`Error! ${error.message}`);

    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         console.log("navigation**********************", data);
    //     });
    //     return unsubscribe;
    // }, [navigation]);


    // console.log("navigation**********************22", data, storeData?.user._id );

    return (
        <Container>
            <Header navigation={navigation} title="New Orders"/>
            <View style={{ padding: 12 }}>
                <SearchBar
                    type="receivers"
                    value={searchValue}
                    onChange={setSearchValue}
                />
            </View>
            <Content style={styles.mainContent} padder>

              
                {loading &&
                 <ActivityIndicator color="blue" />
                }

                 {data?.posts?.map( (foodPost,key) =>  <PostCard navigation={navigation} foodPost={foodPost} key={key} /> )}

                 {!loading && !data?.posts?.length &&
                 <Text style={{color:"gray",textAlign:"center"}}>No data found!</Text>
                }

           

               
            </Content>
        </Container>

    );
}

const styles = StyleSheet.create({
    mainContent: {
        marginTop:-15,
        textAlign: "center",
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
export default NewOrders;