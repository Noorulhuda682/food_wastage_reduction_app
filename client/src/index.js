import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { MainHome, SignUp, Login } from "./components/index"
import {useSelector} from "react-redux";
import {light,dark} from "./assets/themingColors"

const Stack = createStackNavigator()

const StackNavigation = () => {
    const {changeLightTheme} = useSelector(state => state)
    console.log("chnageLightTheme",changeLightTheme);

    return (
        <NavigationContainer theme={!changeLightTheme ? light : dark}>
            <Stack.Navigator initialRouteName="Home"
                screenOptions={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false
                }}
            >
                <Stack.Screen name="Home" component={MainHome} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation;