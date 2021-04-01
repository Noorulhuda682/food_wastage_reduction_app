import React, {
    useState
} from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from 'react-native'
import { Container, Header, Content, Item, Input, Icon, Spinner } from 'native-base';



const Login = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)


    return (
        <KeyboardAvoidingView  style={style.keyboradAvoid}>
            <ScrollView>
                <Container style={style.container}>
                    <View style={style.logoView}>
                        <Image source={require("../assets/logo.jpeg")} />
                    </View>
                    <Item style={[{ marginTop: 70 }, style.input]} success>
                        <Input placeholder='email...' value={email} onChangeText={(emails) => { console.log("emails", emails); setEmail(emails) }}
                        />
                        <Icon name='checkmark-circle' />
                    </Item>
                    <Item style={[{ marginTop: 25 }, style.input]} error>
                        <Input placeholder='password....'
                            value={password} onChangeText={(pass) => { setPassword(pass) }}
                        />
                        <Icon
                            //  name='checkmark-circle'
                            name='close-circle'
                        />
                    </Item>


                    <Text style={{ marginTop: 50 }}>forgot password</Text>

                    <TouchableOpacity
                        onPress={() => { navigation.navigate("SignUp") }}
                        style={{ marginTop: 50 }}>
                        {loading ?
                            <Text style={style.loginButton}>
                                  ...   <ActivityIndicator size="small" color='lightgray' />   ...
                            </Text> :
                            <Text style={style.loginButton}>
                                LOGIN
                            </Text>
                        }
                    </TouchableOpacity>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const style = StyleSheet.create({
    keyboradAvoid: {
        flex: 1,
        backgroundColor: "white"
    },
    scrollView: {

    },
    container: {
        marginTop: 150,
        paddingHorizontal: 40,
    },
    logoView: {
        display: "flex",
        alignItems: "center"
    },
    inputView: {
    },
    input: {
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
        fontSize: 15,
        height: 40,
    },
    loginButton: {
        backgroundColor: '#082860',
        borderRadius: 3,
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        paddingVertical: 10,
    },



})

export default Login;