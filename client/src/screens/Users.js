import React, { useState, useEffect } from 'react';
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
    Fab, Spinner, SwipeRow, Input, Item, List, ListItem
    // Text
} from 'native-base';
const { width, height } = Dimensions.get('window')
import { useSelector } from "react-redux";
import { useQuery, useSubscription } from "@apollo/client";
import { MYPOSTS } from "../typeDefs/Post";
import PostCard from "../shared/PostCard"
import Header from "../shared/Header"
import UserList from "../shared/UserList"
import { USERS, USER_ADDED } from "../typeDefs/User"
import { SearchBar } from '../shared/index';

const AllUsers = ({ navigation }) => {
    const [searchValue, setSearchValue] = useState("")
    const [users, setUsers] = useState(null)
    const storeData = useSelector(state => state);
    const { loading, error, data } = useQuery(USERS);
    const subscriptionUsers = useSubscription(USER_ADDED);


    //  FOR QUERY DATA
    useEffect(() => {
        if (data && data.users) {
            setUsers(data.users)
        }
    }, [data]);
    //  FOR SUBSCRIPTION DATA
    useEffect(() => {
        if (subscriptionUsers.data && subscriptionUsers.data.userAdded) {
            setUsers(subscriptionUsers.data.userAdded)
        }
    }, [subscriptionUsers.data]);


    if (error) Alert.alert(`Error! ${error.message}`);

    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         console.log("navigation**********************", data);
    //     });
    //     return unsubscribe;
    // }, [navigation]);


    // console.log("navigation**********************22", data);

    return (
        <Container>
            <Header navigation={navigation} title="FWR Users" />
            <View style={{ padding: 12 }}>
                <SearchBar
                    type="receivers"
                    value={searchValue}
                    onChange={setSearchValue}
                />
            </View>
            <Content style={styles.mainContent} padder>

                {loading &&
                    <ActivityIndicator style={{ marginTop: 30 }} color="blue" />
                }

                {!loading && users?.length === 0 &&
                    <Text style={styles.noDataText}>No data found!</Text>
                }


                {users?.map((user, index) => {
                    return (
                        <UserList navigation={navigation} user={user} key={index} />
                    )
                })}





            </Content>
        </Container>

    );
}

const styles = StyleSheet.create({
    mainContent: {
        marginTop: -25,
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
    },
    noDataText: {
        marginTop: 10,
        color: "gray",
        textAlign: "center"
    }

})
export default AllUsers;