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
import { POSTS } from "../typeDefs/Post";
import { ListItem } from "../shared/index"

const DetailsPage = ({ navigation }) => {
    const [searchValue, setSearchValue] = useState("")
    // const { loading, error, data } = useQuery(POSTS);

    return (
        <Container>
            <Content>
                <Content style={styles.content1}>
                    <Header style={{ backgroundColor: "#1e319d", elevation: 0, shadowOpacity: 0, }}>
                        <Left>
                            <MaterialCommunityIcons onPress={() => navigation.goBack()} name="keyboard-backspace" size={24} color="white" />
                        </Left>
                        <Right>
                            <Text style={styles.home}>Home</Text>
                        </Right>
                    </Header>
                    <View style={styles.userInfo}>
                        <Thumbnail
                            size={50}
                            style={styles.profileImage}
                            large source={require("../assets/images/app-logo.jpeg")}
                        />
                        <Text style={styles.name}>Name</Text>
                        <Text style={styles.email}>email</Text>
                    </View>
                    <View style={styles.actionsView}>
                        <View style={styles.postView}>
                            <Text style={styles.postTotal}>111</Text>
                            <Text style={styles.postTitle}>Posts</Text>
                        </View>
                        <View style={styles.feedbacksView}>
                            <Text style={styles.postTotal}>111</Text>
                            <Text style={styles.postTitle}>Feedbacks</Text>
                        </View>
                    </View>
                </Content>
                <Content style={{ backgroundColor: "white",paddingHorizontal:15 }} padder>
                    <ListItem title="Name" name="Sher Zaman" />
                    <ListItem title="Gender" name="Male" />
                    <ListItem title="Country" name="Pakistan" />

                </Content>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    content1: {
        backgroundColor: "#1e319d",
        height: 350,
        paddingHorizontal: 10
    },
    content2: {
        backgroundColor: "white"
    },
    home: {
        color: "white"
    },
    userInfo: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 30
    },
    profileImage: {
        height: 100,
        width: 100,
        borderColor: 'lightgray',
    },
    name: {
        color: "white",
        fontSize: 20,
        paddingTop: 10
    },
    email: {
        color: "lightgray"
    },
    actionsView: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 40
    },
    postView: {
        // borderWidth:1,
    },
    postTotal: {
        textAlign: "center",
        color: "white",
        fontSize: 27,
        fontWeight: "bold"
    },
    postTitle: {
        textAlign: "center",
        color: "white",
    },
    feedbacksView: {
        // borderWidth:1
    },
    listView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5
    },
    itemLine: {
        borderBottomWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
        marginLeft: "7%",
        marginTop: -5
    }
})
export default DetailsPage;