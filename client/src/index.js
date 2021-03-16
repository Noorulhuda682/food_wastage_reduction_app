import React from "react";
import {
 View,
 Text,
 StyleSheet
} from "react-native"

import {
    Login,
    SignUp
} from "./components"


const FoodWastageReductionApp = () => {
    return(
        <View>
            <Text style={[styles.text,{backgroundColor:"#efefef",color:"dodgerblue"}]}>
              Welcome to Food Wastage Reduction App
            </Text>
            <Login/>
            <SignUp/>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize:40,
        textAlign:"center"
    }
})

export default FoodWastageReductionApp;