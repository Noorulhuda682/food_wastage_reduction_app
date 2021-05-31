import React, {
    useState, useEffect
} from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Alert,
    ToastAndroid
} from 'react-native'
import { Container, Header, Content, Item, Input, Icon, Spinner, Toast } from 'native-base';
import Entypo from "react-native-vector-icons/Entypo";

import {
    emailRegex,
    passwordRegex,
    nameRegex
} from "../config/Regex"


const TextInput = ({
    email,
    setEmail,
    checkEmail,
    setCheckEmail,
    type,
    placeholder,
    customStyle,
    showPassword,
    setShowPassword
}) => {

    useEffect(() => {
        let regex;
        switch (type) {
            case 'email': regex = emailRegex
                break;
            case 'password': regex = passwordRegex
                break;
            case 'name': regex = nameRegex
                break;
        }
        if (regex.test(email) === false) {
            setCheckEmail(false)
        }
        else {
            setCheckEmail(true)
        }
    }, [email])


    return (
        <Item style={[{ marginTop: 25 }, styles.item, customStyle]}
            success={email !== "" && (checkEmail ? true : false)}
            error={email !== "" && (checkEmail ? false : true)}
        >
            <Input
                style={{ fontSize: 15 }}
                placeholder={placeholder}
                value={email}
                onChangeText={(emails) => { setEmail(emails) }}
                secureTextEntry={type === 'password' && showPassword ? true : false}
            />
            {type === 'password' &&
                <Entypo
                    onPress={() => setShowPassword(!showPassword)}
                    name={`${showPassword ? 'eye-with-line': 'eye'}`}
                    size={20} 
                    color="gray"
                    style={{marginRight:10}}
                />
            }
            {email !== "" && <Icon
             style={{ fontSize: 20 }} 
             name={checkEmail ? 'checkmark-circle' : 'close-circle'} 
             onPress={() => email !== "" && !checkEmail && setEmail("")}
             />
            }
            
        </Item>

    );
}



const styles = StyleSheet.create({
    item: {
        paddingLeft: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderRadius: 4,
        backgroundColor: 'white',
        height: 40,
    },
})

export default TextInput;