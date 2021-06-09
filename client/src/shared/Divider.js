import React from "react";
import {
    Text,
    StyleSheet
} from "react-native";

const Divider = ({ customStyle }) => {
    return (<Text style={[styles.text,customStyle] }></Text>)
}

const styles = StyleSheet.create({
    text: {
        borderBottomWidth: 2,
        marginTop: -12,
        borderColor: "#e6e6ff"
    }
})

export default Divider;