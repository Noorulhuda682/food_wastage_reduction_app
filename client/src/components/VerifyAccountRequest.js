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
import { VERIFY_EMAIL } from "../typeDefs/Auth"

const VerifyAccountRequest = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState(false)
    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState(true);
    const dispatch = useDispatch();

    const [requestToVerifyAccount, { data, error }] = useMutation(VERIFY_EMAIL);




    const sendRequest = async () => {
        if (email === "" || email === " " || email === undefined || email === null) {
            ToastAndroid.showWithGravity(
                "Empty input email",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false
        }
        // 
        setLoading(true)
        requestToVerifyAccount({
            variables: {
                email,
            }
        }).then(({ data }) => {
            ToastAndroid.showWithGravity(
                "Request is successfull",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            setLoading(false)
            // console.log("data", data);
            navigation.navigate('verifyAccount');
        }).catch(err => {
            setLoading(false)
            Alert.alert(`Error : ${err}`);
        })

        // setLoading(false)
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
                            Verify Email
                        </Text>
                    </View>

                    <Text
                        style={{
                            backgroundColor: '#e6e9ff',
                            borderRadius: 10,
                            paddingHorizontal: 7,
                            paddingVertical: 10,
                            color: "#4d61ff",
                            borderColor: "#808eff",
                            // borderWidth:2
                        }}
                    >Type your email below to get 6 digit code in respect to verify your email  </Text>
                    <InputText
                        email={email}
                        setEmail={setEmail}
                        checkEmail={checkEmail}
                        setCheckEmail={setCheckEmail}
                        type={"email"}
                        placeholder={"type email... "}
                        customStyle={{ marginTop: 50 }}
                    />


                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.forgotPassword}>back-to-login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={sendRequest}
                        style={{ marginTop: 50 }}>
                        <View style={styles.loginButton} >
                            {loading ? <ActivityIndicator color='white' size="small" />
                                :
                                <Text style={{ color: "white", textAlign: "center" }} >Send Request</Text>
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
        fontWeight: "bold",
        marginBottom: 100,
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

export default VerifyAccountRequest;


