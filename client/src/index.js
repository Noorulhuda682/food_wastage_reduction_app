import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import {
    MainHome,
    SignUp,
    Login,
    ForgotPassword,
    ResetPassword,
    VerifyAccount,
    SetProfile
} from "./components/index"
import { useSelector } from "react-redux";
import { light, dark } from "./assets/themingColors"
import {readData} from "./config/setToken";

const Stack = createStackNavigator()

const StackNavigation = () => {
    const store = useSelector(state => state)
    console.log("chnageLightTheme", store.user);


    return (
        store.user.role ?
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home"
                screenOptions={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false
                }}
            >
                <Stack.Screen name="Home" component={MainHome} />
            </Stack.Navigator>
        </NavigationContainer>
        :
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login"
                screenOptions={{
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    headerShown: false
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="forgotPassword" component={ForgotPassword} />
                <Stack.Screen name="resetPassword" component={ResetPassword} />
                <Stack.Screen name="verifyAccount" component={VerifyAccount} />
                <Stack.Screen name="setProfile" component={SetProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation;