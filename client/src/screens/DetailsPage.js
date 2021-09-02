import React, { useEffect, useState } from 'react';
import {
    View, Text,
    StyleSheet, Image, BackHandler
} from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

const DetailsPage = ({ route, navigation }) => {
    const [searchValue, setSearchValue] = useState("")

    let { routeName, user } = route.params
    console.log("DETAILPAGE====", route.params);

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
            <Content>
                <Content style={styles.content1}>
                    <Header style={{ backgroundColor: "#1e319d", elevation: 0, shadowOpacity: 0, }}>
                        <Left>
                            <MaterialCommunityIcons onPress={() => navigation.navigate(routeName)} name="keyboard-backspace" size={24} color="white" />
                        </Left>
                        <Right>
                            <Text onPress={() => navigation.navigate("home")} style={styles.home}>Home</Text>
                        </Right>
                    </Header>
                    <View style={styles.userInfo}>
                        {user?.profileImage ?
                            <Image
                                style={styles.profileImage}
                                large source={{ uri: user?.profileImage }}
                            />
                            :
                            <EvilIcons name="user" size={130} color="white" />
                        }
                        <Text style={styles.name}>{user?.name}</Text>
                        <Text style={styles.email}>{user?.email}</Text>
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
                <Content style={{ backgroundColor: "white", paddingHorizontal: 10 }} padder>
                    <ListItem title="Name" name={user?.name ? user.name : "Not Set"} />
                    <ListItem title="Email" name={user?.email ? user.email : "Not Set"} />
                    <ListItem title="Role" name={user?.role ? user.role : "Not Set"} />
                    <ListItem title="UserId" name={user?._id ? user._id : "Not Set"} />
                    <ListItem title="Gender" name={user?.gender ? user.gender : "Not Set"} />
                    <ListItem title="Address" name={user?.address ? user.address : "Not Set"} />
                    <ListItem title="Contact Number" name={user?.contactNumber ? user.contactNumber : "Not Set"} />
                    <ListItem title="City" name={user?.city ? user.city : "Not Set"} />
                    <ListItem title="dateOfBirth" name={user?.dateOfBirth ? user.dateOfBirth : "Not Set"} />
                    <ListItem title="Country" name={user?.country ? user.country : "Not Set"} />
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
        color: "white",
        borderWidth: 1,
        textAlign: "center",
        padding: 6,
        fontSize: 13,
        marginTop: 10,
        paddingHorizontal: 10,
        borderColor: "white",
        borderRadius: 20,
    },
    userInfo: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 30
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
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