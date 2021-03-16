import React from "react";
import {
 View,
 Text,
 StyleSheet
} from "react-native"


const Login = () => {
    return(
        <View>
            <Text style={styles.text}>
              LOGIN SCREEN
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize:40,
        textAlign:"center"
    }
})

export default Login;