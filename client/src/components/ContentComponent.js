import React, { useState,useContext } from 'react';
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet
} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItem
} from "@react-navigation/drawer"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Thumbnail, Switch, Left, Right, Container, Content, Body, List, ListItem } from 'native-base';
import { useTheme } from '@react-navigation/native';
import { ThemeContext } from "../../App"


const DrawerContent = (props) => {
    const { navigation } = props;
    const { colors } = useTheme();

    const [switchValue, setSwitchValue] = useState(false)

    const value = useContext(ThemeContext);

    const {title,background,card,text,border,notification,icon} = colors;

    return (
        <Container style={{ flex: 1, backgroundColor: background }}>
            <DrawerContentScrollView {...props}>
                <Content style={styles.mainView}>
                    <View style={styles.profileView}>
                        <Thumbnail
                            size={50}
                            style={styles.profileImage}
                            source={require('../assets/profile.jpg')} />
                        <Text style={[styles.profileName,{color:title}]} >Ajaz uddin</Text>
                        <Text style={styles.profileEmail}>@gmail.com</Text>
                    </View>
                    <DrawerItem style={styles.drawerItem}
                        icon={({ color, size }) => {
                            return <FontAwesome name="home" size={22} color={icon} />
                        }}
                        label="Home"
                        inactiveTintColor='gray'
                        onPress={() => { }}
                    />
                    <DrawerItem style={styles.drawerItem}
                        icon={({ color, size }) => {
                            return <MaterialCommunityIcons name="post-outline" size={24} color={icon} />
                        }}
                        label="All Posts"
                        inactiveTintColor='gray'
                        onPress={() => { }}
                    />
                    <DrawerItem style={styles.drawerItem}
                        icon={({ color, size }) => {
                            return <MaterialCommunityIcons name="post-outline" size={24} color={icon} />
                        }}
                        label="My Posts"
                        inactiveTintColor='gray'
                        onPress={() => { }}
                    />
                    <DrawerItem style={styles.drawerItem}
                        icon={({ color, size }) => {
                            return <MaterialIcons name="post-add" size={24} color={icon} />
                        }}
                        label="Add Post"
                        inactiveTintColor='gray'
                        onPress={() => { }}
                    />
                   

                    <List style={{ paddingTop: 100 }}>
                        <ListItem>
                            <Left>
                                <Text style={{color:'gray',paddingVertical:5}}>Dark Mode</Text>
                            </Left>
                            <Right>
                                <Switch
                                    value={switchValue}
                                    onValueChange={() => { 
                                        setSwitchValue(!switchValue)
                                        value.handleTheme();
                                    }}
                                />
                            </Right>
                        </ListItem>
                    </List>

                    <DrawerItem style={[styles.drawerItem,{paddingTop:150}]}
                        icon={({ color, size }) => {
                            return <AntDesign name="logout" size={23} color={icon} />
                        }}
                        label="Logout"
                        inactiveTintColor='gray'
                        onPress={() => { navigation.navigate('Login') }}
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
    }

})
export default DrawerContent;