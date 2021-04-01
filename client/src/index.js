import React from 'react';
import 'react-native-gesture-handler';

import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Home, SignUp, Login } from "./components/index"


const Stack = createStackNavigator()

const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Home"
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    )
}

export default StackNavigation;