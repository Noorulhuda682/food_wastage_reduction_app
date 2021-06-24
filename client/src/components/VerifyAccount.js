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
import {CHECK_CODE} from "../typeDefs/Auth"


const VerifyAccount = ({ navigation }) => {

    const [code, setCode] = useState("");
    const [checkCode, setCheckCode] = useState(false)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [_code, { data, error }] = useMutation(CHECK_CODE);

    // let userobj ={user:{ role: "USER",name:"noor",email:"noorulhuda@gmail.com" }}


    const _verifyCode = async () => {

        if(checkCode){
            setLoading(true)
            console.log("che=======", code);
            _code({
                variables: {
                   code:JSON.parse(code),
                }
            }).then(data => {
                // console.log("Sucess=======", data);
                Alert.alert(`Verification is succussfull`);
                navigation.navigate("Login")
                setLoading(false)
            }).catch(err => {
                Alert.alert(`Error : ${err}`);
                console.log("Sucess=======", err);
                setLoading(false)
            })
            // dispatch(addUser({ role: "RECEIVER" ,name:"noor",email:"noorulhuda@gmail.com" }));
            // navigation.navigate("Home")
            // setLoading(false)
    
            // }
        }else{
            if(code === "") ToastAndroid.showWithGravity(
               "Empty verification code",
                ToastAndroid.SHORT,ToastAndroid.CENTER
            )
            else ToastAndroid.showWithGravity(
                "Invalid verification code",
                 ToastAndroid.SHORT,ToastAndroid.CENTER
             );
        }
      

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
                        Email Verification
                        </Text>
                    </View>

                    <Text
                    style={{
                        backgroundColor:'#e6e9ff',
                        borderRadius:5,
                        paddingHorizontal:7,
                        paddingVertical:10,
                        color:"#4d61ff",
                        marginTop:50
                    }}
                    >
                    We sent you 6 digits  verification code on your email.
                    Enter that to verify in order to get access to fwr app.
                      </Text> 
                

                    <InputText
                        email={code}
                        setEmail={setCode}
                        checkEmail={checkCode}
                        setCheckEmail={setCheckCode}
                        type={"code"}
                        placeholder={"Verification Code"}
                        customStyle={{ marginTop: 50 }}
                    />


                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.forgotPassword}>back-to-login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={_verifyCode}
                        style={{ marginTop: 50 }}>
                        <View style={styles.loginButton} >
                            {loading ? <ActivityIndicator color='white' size="small" />
                                :
                                <Text style={{ color: "white", textAlign: "center" }} >Verify</Text>
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
        marginTop: 90,
        paddingHorizontal: 30,
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
        color:"#4d61ff",
        fontWeight: "bold"
    },
    greyLine: {
        textAlign: "center",
        marginTop: 50,
        color: "lightgray"
    }

})

export default VerifyAccount;