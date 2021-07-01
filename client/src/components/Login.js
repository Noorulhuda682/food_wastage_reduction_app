import React, {
    useState, useEffect, useContext
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
import { NavigationActions, StackActions } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux"
import { addUser } from "../redux/actions/user"
import { gql, useMutation } from "@apollo/client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
    saveData,
} from "../config/setToken"

import InputText from "../shared/TextInput"
import { ChangeTokenHandlerContext } from "../../App"
import { LOGIN } from "../typeDefs/Auth"

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Login = ({ navigation }) => {
    const ChangeTokenHandler = useContext(ChangeTokenHandlerContext);

    const [email, setEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState(false)
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    // const storeData = useSelector(state => state);
    // console.log("storeData===>", storeData.user.role);
    const dispatch = useDispatch();




    const [_login, { data, error }] = useMutation(LOGIN);


    const login = async () => {

        if (email === "") {
            ToastAndroid.showWithGravity(
                `Enter ${password === "" ? "email and password" : "email"}`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false
        }

        if (password === "") ToastAndroid.showWithGravity(
            "Enter password",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        setLoading(true)

        _login({
            variables: {
                email,
                password
            }
        }).then(({ data }) => {
            console.log("LOGIN=======", data);
            if (data?.login?.user?.verification !== "VERIFIED") {
                Alert.alert("Sorry! Your email is not verified")
                setLoading(false)
                return false;
            }
            saveData(data?.login?.token);
            ChangeTokenHandler(data?.login?.token);
            ToastAndroid.showWithGravity(
                "Login Successfull",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            dispatch(addUser(data?.login?.user));
            setLoading(false)
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }]
            })
        }).catch(err => {
            setLoading(false)
            Alert.alert(`Error : ${err}`);
        })

    }



    return (
        <KeyboardAvoidingView style={styles.keyboradAvoid}>
            <ScrollView>
                <Container style={styles.container}>
                    <View style={styles.logoView}>
                        <Image style={{
                            width: 150, height: 150, borderWidth: 5,
                            borderRadius: 100,
                            borderColor: '#d1d8ff',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,
                            elevation: 3,
                        }} source={require("../assets/images/app-logo.jpeg")} />
                        <Text style={styles.logoTitle}>
                            Food Wastage Reduction
                        </Text>
                    </View>


                    <InputText
                        email={email}
                        setEmail={setEmail}
                        checkEmail={checkEmail}
                        setCheckEmail={setCheckEmail}
                        type={"email"}
                        placeholder={"Email..."}
                        customStyle={{ marginTop: 50 }}
                        icon={<Entypo name="email" size={17} color="lightgray" />}
                    />

                    <InputText
                        email={password}
                        setEmail={setPassword}
                        checkEmail={checkPassword}
                        setCheckEmail={setCheckPassword}
                        type={"password"}
                        placeholder={"Password..."}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        customStyle={{ marginTop: 12 }}
                        icon={<FontAwesome5 name="key" size={17} color="lightgray" />}
                    />


                    <View style={styles.linksView}>
                        <TouchableOpacity onPress={() => navigation.navigate("forgotPassword")}>
                            <Text style={styles.forgotPassword}>forgot-password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("verifyAccount")}>
                            <Text style={styles.forgotPassword}>verify-email</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={login}
                        style={{ marginTop: 20 }}>
                        <View style={styles.loginButton} >
                            {loading ? <ActivityIndicator color='white' size="small" />
                                :
                                <Text style={{ color: "white", textAlign: "center" }} >LOGIN</Text>
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
        paddingBottom: 400,
    },
    container: {
        marginTop: 100,
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
        fontWeight: "bold",
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
        color: "#4d61ff",
        fontWeight: "bold"
    },
    greyLine: {
        textAlign: "center",
        marginTop: 30,
        color: "lightgray"
    },
    linksView: {
        flexDirection: "row-reverse",
        paddingVertical: 5,
        justifyContent: "space-between"
    }

})

export default Login;