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
    Fab, Spinner, SwipeRow, Input, Item
    // Text
} from 'native-base';
const { width, height } = Dimensions.get('window')
import { useSelector } from "react-redux";
import { useQuery, useSubscription } from "@apollo/client";
import Header from "../shared/Header"
import UserList from "../shared/UserList"
import { SearchBar } from '../shared/index';
import { RECEIVERS,RECEIVER_ADDED } from "../typeDefs/Receiver";

const AllReceivers = ({ navigation }) => {
    const [searchValue, setSearchValue] = useState("")
    const storeData = useSelector(state => state);
    // console.log("AllReceivers===>", storeData);

    var { loading, error, data } = useQuery(RECEIVERS);
    const [receivers, setReceivers] = useState(null)

    const subscriptionReceivers = useSubscription(RECEIVER_ADDED);


    if (error) Alert.alert(`Error! ${error.message}`);

    //  FOR QUERY DATA
    useEffect(() => {
        if (data && data.receivers) {
            setReceivers(data.receivers)
        }
    }, [data]);

    //  FOR SUBSCRIPTION DATA
    useEffect(() => {
        if (subscriptionReceivers.data && subscriptionReceivers.data.receiverAdded) {
            setReceivers(subscriptionReceivers.data.receiverAdded)
        }
    }, [subscriptionReceivers.data]);

    // React.useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         console.log("navigation**********************", data);
    //     });
    //     return unsubscribe;
    // }, [navigation]);

    console.log("navigation**********************23", data);

    return (
        <Container>
            <Header navigation={navigation} title="FWR Receivers" />
            <View style={{ padding: 12 }}>
                <SearchBar
                    type="receivers"
                    value={searchValue}
                    onChange={setSearchValue}
                />
            </View>
            <Content style={styles.mainContent} padder>


                {loading &&
                    <ActivityIndicator style={{marginTop:30}} color="blue" />
                }


                {!loading && receivers?.length === 0 &&
                    <Text style={styles.noDataText}>No data found!</Text>
                }

                {receivers && receivers.map((receiver, index) => {
                    return (
                        <UserList navigation={navigation} user={receiver} key={index} />
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
        paddingBottom: 50,
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
export default AllReceivers;