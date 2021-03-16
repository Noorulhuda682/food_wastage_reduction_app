import React from "react";
import {
 View,
 Text,
 StyleSheet
} from "react-native"


const SignUp = () => {
    return(
        <View>
            <Text style={styles.text}>
              SignUp SCREEN
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

export default SignUp;