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
import { useSelector, useDispatch } from "react-redux"
import { addUser } from "../redux/actions/user"
import { gql, useMutation } from "@apollo/client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
    saveData,
    readData
} from "../config/setToken"
import {
    emailRegex,
    passwordRegex
} from "../config/Regex"
import InputText from "../shared/TextInput"

import { RESET_PASSWORD } from "../typeDefs/Auth"

const ResetPassword = ({ navigation }) => {

    const [code, setCode] = useState("");
    const [checkCode, setCheckCode] = useState(false)
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState(true);
    const dispatch = useDispatch();

    // let userobj ={user:{ role: "USER",name:"noor",email:"noorulhuda@gmail.com" }}


    const [resetPass, { data, error }] = useMutation(RESET_PASSWORD);




    const login = async () => {

        if (!checkCode) {
            ToastAndroid.showWithGravity(
                "Invalide or unacceptable value of OTP input",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false
        }

        if (!checkPassword) {
            ToastAndroid.showWithGravity(
                "Invalid or unacceptable password",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false
        }


        setLoading(true)
        resetPass({
            variables: {
                code: JSON.parse(code),
                newPassword: password
            }
        }).then(({ data }) => {
            ToastAndroid.showWithGravity(
                "Password updated successfully",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            setLoading(false)
            console.log("data", data);
            navigation.navigate("Login")
        }).catch(err => {
            setLoading(false)
            Alert.alert(`Error : ${err}`);
        })

        setLoading(false)

    }



    return (
        <KeyboardAvoidingView style={styles.keyboradAvoid}>
            <ScrollView>
                <Container style={styles.container}>
                    <View style={styles.logoView}>
                        {/* <Image style={{ width: 170, height: 170,borderWidth:2,
                            borderRadius:100,
                            borderColor:'#d1d8ff'}} source={require("../assets/images/app-logo.jpeg")} /> */}
                        <Text style={styles.logoTitle}>
                            Reset Password
                        </Text>
                    </View>

                    <Text
                        style={{
                            backgroundColor: '#e6e9ff',
                            borderRadius: 5,
                            paddingHorizontal: 7,
                            paddingVertical: 10,
                            color: "#4d61ff",
                            marginTop: 50
                            // borderColor:"#808eff",
                            // borderWidth:1
                        }}
                    >
                        We sent you the OTP code on your gmail. enter the code below then type new password.
                    </Text>




                    <InputText
                        email={code}
                        setEmail={setCode}
                        checkEmail={checkCode}
                        setCheckEmail={setCheckCode}
                        type={"code"}
                        placeholder="OTP Code"
                        customStyle={{ marginTop: 50 }}
                    />

                    <InputText
                        email={password}
                        setEmail={setPassword}
                        checkEmail={checkPassword}
                        setCheckEmail={setCheckPassword}
                        type={"password"}
                        placeholder={"Type new password..."}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                    />



                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.forgotPassword}>back-to-login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={login}
                        style={{ marginTop: 50 }}>
                        <View style={styles.loginButton} >
                            {loading ? <ActivityIndicator color='white' size="small" />
                                :
                                <Text style={{ color: "white", textAlign: "center" }} >Reset</Text>
                            }
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.greyLine}>
                        ------------------------------------------------------------------
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")} >
                        <Text style={styles.signUp}>
                            New User? <Text style={styles.signUpBlue}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>

                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboradAvoid: {
        flex: 1,
        backgroundColor: "white"
    },
    scrollView: {

    },
    container: {
        marginTop: 160,
        paddingHorizontal: 40,
    },
    logoView: {
        display: "flex",
        alignItems: "center"
    },
    inputView: {
    },
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
    loginButton: {
        backgroundColor: "#1e319d",
        borderRadius: 6,
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        paddingVertical: 13,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,
    },
    logoTitle: {
        fontSize: 15,
        color: '#d1d8ff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1,
        fontWeight: "bold"
    },
    signUp: {
        textAlign: "center",
        marginTop: 20,
        fontWeight: "bold"
    },
    signUpBlue: {
        color: "#4d61ff"
    },
    forgotPassword: {
        marginTop: 20,
        textAlign: "right",
        color: "#4d61ff",
        fontWeight: "bold"
    },
    greyLine: {
        textAlign: "center",
        marginTop: 50,
        color: "lightgray"
    }

})

export default ResetPassword;