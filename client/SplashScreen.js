import React, {
    useState, useEffect
} from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image
} from 'react-native'
import { Container, Header, Content, Item, Input, Icon, Spinner, Toast } from 'native-base';
import { useSelector, useDispatch } from "react-redux"


export default SplashScreen = () => {
    return (
        <View style={{
            backgroundColor: '#1e319d',
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Image style={{
                width: 130,
                height: 130,
                borderRadius: 100,
                borderWidth: 2
            }} source={require("./src/assets/images/app-logo.jpeg")} />
            <Text style={{
                marginTop: 15,
                color: "white",
                fontWeight: "bold",
                fontSize: 10,
            }}>NEVER WASTE FOOD</Text>
        </View>
        // <ImageBackground style={{ flex: 1 }} source={require("./src/assets/images/splash.png")}>
        // </ImageBackground>
    )
}