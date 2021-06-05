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

const LOGIN = gql`
 mutation login($email:String! $password:String!){
  login(email:$email password:$password){
    token
    user {
      _id
      name
      email
      role
    }
  }
}

`;

const ResetPassword = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState(false)
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState(true);
    const dispatch = useDispatch();

    // let userobj ={user:{ role: "USER",name:"noor",email:"noorulhuda@gmail.com" }}


    const [_login, { data, error }] = useMutation(LOGIN);




    const login = async () => {

        // if (email === "") {
        //     ToastAndroid.showWithGravity(
        //         `Enter ${password === "" ? "email and password" : "email"}`,
        //         ToastAndroid.SHORT,
        //         ToastAndroid.CENTER
        //     );
        //     return false
        // }

        // if (password === "") ToastAndroid.showWithGravity(
        //     "Enter password",
        //     ToastAndroid.SHORT,
        //     ToastAndroid.CENTER
        // );
        // setLoading(true)
        // if (checkEmail && checkPassword) {
        // Alert.alert("Run Login api")


        _login({
            variables: {
                email: "sad@gmail.com",
                password: "Saad1234"
            }
        }).then(data => {
            console.log("LOGIN=======", data);
            saveData(data?.login?.token);
            ToastAndroid.showWithGravity(
                "Login Successfull",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            dispatch(addUser(data?.login?.user));
            navigation.navigate("Home")
            setChange(false)
        }).catch(err => {
            Alert.alert(`Error : ${err}`);
        })

        // dispatch(addUser({ role: "RECEIVER" ,name:"noor",email:"noorulhuda@gmail.com" }));
        // navigation.navigate("Home")
        // setLoading(false)

        // }

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
                        backgroundColor:'#e6e9ff',
                        borderRadius:5,
                        paddingHorizontal:7,
                        paddingVertical:10,
                        color:"#4d61ff",
                        marginTop:50
                        // borderColor:"#808eff",
                        // borderWidth:1
                    }}
                    >
                    We sent you the OTP code on your gmail. enter the code below then type new password.     
                    </Text>
                

                    <InputText
                        email={email}
                        setEmail={setEmail}
                        checkEmail={checkEmail}
                        setCheckEmail={setCheckEmail}
                        type={"email"}
                        placeholder={"OTP Code"}
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
        color:"#4d61ff",
        fontWeight: "bold"
    },
    greyLine: {
        textAlign: "center",
        marginTop: 50,
        color: "lightgray"
    }

})

export default ResetPassword;