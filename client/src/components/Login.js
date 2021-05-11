import React, {
    useState,useEffect
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
} from 'react-native'
import { Container, Header, Content, Item, Input, Icon, Spinner } from 'native-base';
import { useSelector, useDispatch } from "react-redux"
import { addUser } from "../store/actions/user"
import {gql,useMutation} from "@apollo/client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  saveData,
  readData
} from "../config/setToken"

const LOGIN = gql`
 mutation login($email:String! $password:String!){
  login(email:$email password:$password){
    token
    user {
      _id
      name
      email
    }
  }
}

`;

const Login =  ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState(true);
    const storeData = useSelector(state => state);
    // console.log("storeData===>", storeData);
    const dispatch = useDispatch();

      
    const [_login, {data} ] = useMutation(LOGIN);
    console.log("login===",data);
   
    if(data?.login?.user && change ){
        saveData("norr123");
        dispatch(addUser());
        navigation.navigate("Home")
        setChange(false)
    } 

  


    const login = () => {
       
        _login({
            variables:{
                email:email,
                password:password
            }
        })       

       
    }

   

    return (
        <KeyboardAvoidingView style={style.keyboradAvoid}>
            <ScrollView>
                <Container style={style.container}>
                    <View style={style.logoView}>
                        <Image style={{width:210,height:180}} source={require("../assets/images/app-logo.jpeg")} />
                    </View>
                    <Item style={[{ marginTop: 40 }, style.input]} success>
                        <Input placeholder='email...' value={email} onChangeText={(emails) => {setEmail(emails) }}
                        />
                        <Icon name='checkmark-circle' />
                    </Item>
                    <Item style={[{ marginTop: 25 }, style.input]} error>
                        <Input placeholder='password....'
                            value={password} onChangeText={(pass) => {  setPassword(pass) }}
                        />
                        <Icon
                            //  name='checkmark-circle'
                            name='close-circle'
                        />
                    </Item>


                    <Text style={{ marginTop: 50 }}>forgot password</Text>

                    <TouchableOpacity
                        onPress={login}
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
        marginTop: 110,
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
        backgroundColor: "#00203FFF",
        borderRadius: 3,
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        paddingVertical: 10,
    },



})

export default Login;