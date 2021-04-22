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
import {
    Container, Header, Content, Item, Input, Icon, Spinner,
    Body, Right, Title, Left,
    Card, CardItem, H2, Footer,
} from 'native-base';
import { useSelector, useDispatch } from "react-redux"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddPost = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const data = useSelector(state => state);
    console.log("LOGINDATA===>", data);
    const dispatch = useDispatch();

    const login = () => {
        dispatch(addUser());
        navigation.navigate("SignUp")
    }

    return (
        <KeyboardAvoidingView >
            <ScrollView>
                <Container >
                    <Header style={{ backgroundColor: "#00203FFF" }}>
                        <Left >
                            <Icon onPress={() => navigation.openDrawer()} name='menu' style={{ color: "white" }} />
                        </Left>
                        <Body>
                            <Title>Upload Food</Title>
                        </Body>
                        <Right>
                            <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
                        </Right>
                    </Header>
                    <Content padder>
                        <Text style={styles.grayText} >Food Title</Text>
                        <Item
                            // success
                            style={styles.item}
                        >
                            <Input
                                value={"Biryani"}
                                style={styles.input}
                            //  onChangeText={(emails) => { console.log("emails", emails);
                            //   setEmail(emails) }}
                            />
                            {/* <Icon name='checkmark-circle' /> */}
                        </Item>
                        <Text style={styles.grayText} >Food Desciption</Text>
                        <Item
                            // success
                            style={styles.item}
                        >
                            <Input
                                value={"Only for needy people"}
                                style={styles.input}
                            //  onChangeText={(emails) => { console.log("emails", emails);
                            //   setEmail(emails) }}
                            />
                            {/* <Icon name='checkmark-circle' /> */}
                        </Item>
                        <Text style={styles.grayText} >Food Weight</Text>
                        <Item
                            // success
                            style={styles.item}
                        >
                            <Input
                                value={"20kg"}
                                style={styles.input}
                            //  onChangeText={(emails) => { console.log("emails", emails);
                            //   setEmail(emails) }}
                            />
                            {/* <Icon name='checkmark-circle' /> */}
                        </Item>




                        <Text style={{ marginTop: 50 }}>forgot password</Text>
                        <TouchableOpacity
                            onPress={login}
                            style={{ marginTop: 50 }}>
                            {loading ?
                                <Text style={styles.loginButton}>
                                    ...   <ActivityIndicator size="small" color='lightgray' />   ...
        </Text> :
                                <Text style={styles.loginButton}>
                                    UPLOAD+
        </Text>
                            }
                        </TouchableOpacity>


                    </Content>




                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: "#00203FFF",
        borderRadius: 3,
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        paddingVertical: 10,
    },
    grayText: {
        color: "#88929c",
        paddingLeft: 6,
        marginTop: 15
      },
      item:{
        marginTop: -10,
        borderBottomColor:"gray"
      },
      input:{
        fontSize: 15, 
        fontWeight: "bold",
         marginBottom: -5 
      }


})

export default AddPost;