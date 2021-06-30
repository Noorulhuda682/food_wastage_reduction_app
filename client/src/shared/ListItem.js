import React, { useEffect, useState } from 'react';
import {
    View,
    Text, Dimensions,
    StyleSheet, Image, ActivityIndicator
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    Container, Left, Body, Right, Header, Thumbnail, Button, Icon, Title,
    Content, Item, Input,
    List,
} from 'native-base';
import { useQuery } from "@apollo/client";
// import Header from "../shared/Header"
import { POSTS } from "../typeDefs/Post"

const ListItem = ({ navigation,title,name }) => {
    const [searchValue, setSearchValue] = useState("")
    // const { loading, error, data } = useQuery(POSTS);

    return (
        <View style={{marginTop:10}}>
            <View style={styles.listView}>
                <View style={{ flexDirection: "row" }} >
                    <Entypo name="list" size={20} color="rgba(0,0,0,0.3)" />
                    <Text style={{
                        color: "rgba(0,0,0,0.3)", 
                        // fontWeight: "bold",
                        fontSize: 15, marginLeft: 15
                    }}>
                        {title}
                    </Text>
                </View>
                <View>
                    <Text style={{
                        color: "rgba(0,0,0,0.3)", 
                        // fontWeight: "bold",
                        fontSize: 15, marginLeft: 10
                    }}>
                        {name}
                    </Text>
                </View>
            </View>
            <Text style={styles.itemLine}></Text>
        </View>
    );
}

const styles = StyleSheet.create({

    listView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5
    },
    itemLine: {
        borderBottomWidth: 1,
        borderColor: "#EDF2F8",
        marginLeft: "7%",
        marginTop: -5
    }
})
export default ListItem;