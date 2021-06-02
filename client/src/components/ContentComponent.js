import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from "@react-navigation/drawer"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Thumbnail, Switch, Left, Right, Container, Content, Body, List, ListItem, Badge } from 'native-base';
import { useTheme } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../redux/actions/user"
import { toggleTheme } from "../redux/actions/theming";
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {clearStorage} from "../config/setToken";

// AIzaSyDG6vNwyXyphQygBpy-HDmz36ppHI4bOQY
import {
    userRoutes,
    receiverRoutes,
    adminRoutes
} from "../config/routes"
var displayRoutes = [];

const DrawerContent = (props) => {
    const netInfo = useNetInfo();
    const { navigation } = props;
    const { colors } = useTheme();
    const [switchValue, setSwitchValue] = useState(false)
    const { title, background, card, text, border, notification, icon } = colors;

    const data= useSelector(state => state);
    // console.log("DrawerContentData===>saad", data);
    const dispatch = useDispatch();
    
    switch (data?.user?.role){
        case "USER": displayRoutes = userRoutes
            break;
        case "RECEIVER": displayRoutes = receiverRoutes
            break;
        case "ADMIN": displayRoutes = adminRoutes
            break;
    }

    useEffect(() => {
        switch (data?.user?.role){
            case "USER": displayRoutes = userRoutes
                break;
            case "RECEIVER": displayRoutes = receiverRoutes
                break;
            case "ADMIN": displayRoutes = adminRoutes
                break;
        }
    }, [])

    return (
        <Container style={{ flex: 1, backgroundColor: background }}>
            <DrawerContentScrollView {...props}>
                <Content style={styles.mainView}>
                    <View style={styles.profileView}>
                        <View>
                            <Thumbnail
                                size={50}
                                style={styles.profileImage}
                                large source={require('../assets/images/profile.jpg')}
                            />
                            <Badge success={netInfo.type === 'wifi' && netInfo.isConnected ? true : false} style={styles.badge}></Badge>
                        </View>
                        <Text style={[styles.profileName, { color: title }]} >Ajaz uddinaa</Text>
                        <Text style={styles.profileEmail}>@gmail.com</Text>
                    </View>
                    <DrawerItem style={styles.drawerItem}
                        icon={({ color, size }) => {
                            return <FontAwesome name="home" size={22} color={icon} />
                        }}
                        label="Home"
                        inactiveTintColor='gray'
                        onPress={() => { navigation.navigate("home") }}
                    />

                    {
                        displayRoutes.map((route ,index) => {
                            return (
                                <DrawerItem key={index} style={styles.drawerItem}
                                    icon={({ color, size }) => {
                                        switch (route.iconCompnay) {
                                            case "MaterialCommunityIcons":
                                                return <MaterialCommunityIcons name={route.iconName} size={route.iconSize} color={icon} />
                                            case "FontAwesome":
                                                return <FontAwesome name={route.iconName} size={route.iconSize} color={icon} />
                                            case "AntDesign":
                                                return <AntDesign name={route.iconName} size={route.iconSize} color={icon} />
                                            case "MaterialIcons":
                                                return <MaterialIcons name={route.iconName} size={route.iconSize} color={icon} />
                                            case "FontAwesome5":
                                                return <FontAwesome5 name={route.iconName} size={route.iconSize} color={icon} />
                                        }
                                    }}
                                    label={route.label}
                                    inactiveTintColor='gray'
                                    onPress={() => { navigation.navigate(route.routeName) }}
                                />)
                        })
                    }



                    <List style={{ paddingTop: 100 }}>
                        <ListItem>
                            <Left>
                                <Text style={{ color: 'gray', paddingVertical: 5 }}>Dark Mode</Text>
                            </Left>
                            <Right>
                                <Switch
                                    value={switchValue}
                                    onValueChange={() => {
                                        setSwitchValue(!switchValue);
                                        dispatch(toggleTheme())
                                    }}
                                />
                            </Right>
                        </ListItem>
                    </List>

                    <DrawerItem style={[styles.drawerItem, { paddingTop: 150 }]}
                        icon={({ color, size }) => {
                            return <AntDesign name="logout" size={23} color={icon} />
                        }}
                        label="Logout"
                        inactiveTintColor='gray'
                        onPress={ async () => { 
                            dispatch(removeUser());
                            clearStorage()
                            navigation.navigate('Login')
                        }}
                    />
                </Content>
            </DrawerContentScrollView>
        </Container>
    );
}
const styles = StyleSheet.create({
    mainView: {
        // borderWidth:1,
        // borderColor:'red',
    },
    profileView: {
        // borderWidth: 1,
        // borderColor: 'red',
        paddingVertical: 25,
        display: 'flex',
        alignItems: "center"
    },
    profileImage: {
        height: 80,
        width: 80,
        // borderWidth:1,
        borderColor: 'lightgray',
    },
    profileName: {
        fontWeight: "bold",
        fontSize: 18
    },
    profileEmail: {
        color: 'gray',
    },
    drawerItem: {
        borderBottomWidth: 1,
        borderColor: 'lightgray'
    },
    badge: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: "white",
        marginTop: -25,
        alignSelf: "flex-end"
    }

})
export default DrawerContent;