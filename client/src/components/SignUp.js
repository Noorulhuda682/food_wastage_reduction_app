import React, {
  useState
} from 'react';
import {
  View,
  Text,
  // Button,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native'
import { Container, Header, Content, Item, Input, Icon, Spinner, Button, } from 'native-base';
import { Picker } from '@react-native-picker/picker';
import DropDownInput from "../shared/DropDown"


const SignUp = ({ navigation }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [role,setRole] = useState("")

  const signUp = () => {
    setLoading(true)
  }


  return (
    <KeyboardAvoidingView style={styles.keyboradAvoid}>
      <ScrollView>
        <Container style={styles.container}>
          <View style={styles.headingView}>
            <Text style={styles.headingTitle}>
              Create Account
                      </Text>
            <Text style={styles.headingText}>
              SignUp to get starget!
            </Text>
          </View>
          <Item style={[{ marginTop: 70 }, styles.input]} success>
            <Input placeholder='Name...' value={name} onChangeText={(inpVal) => { console.log("emails", emails); setName(inpVal) }}
            />
            <Icon name='checkmark-circle' />
          </Item>
          <Item style={[{ marginTop: 25 }, styles.input]} success>
            <Input placeholder='Email...' value={email} onChangeText={(emails) => { console.log("emails", emails); setEmail(emails) }}
            />
            <Icon name='checkmark-circle' />
          </Item>
          <Item style={[{ marginTop: 25 }, styles.input]} error>
            <Input placeholder='Password....'
              value={password} onChangeText={(pass) => { setPassword(pass) }}
            />
            <Icon
              //  name='checkmark-circle'
              name='close-circle'
            />
          </Item>



       
            
          <DropDownInput 
            pickerItems={["Account Type","USER","RECEIVER",]}
            onChange={setRole}
          />

        

          <TouchableOpacity
            onPress={signUp}
            style={{ marginTop: 50 }}>
            <View style={styles.loginButton} >
              {loading ? <ActivityIndicator color='white' size="small" />
                :
                <Text style={{ color: "white", textAlign: "center" }} >Sign Up</Text>
              }
            </View>
          </TouchableOpacity>

          <Text style={styles.greyLine}>
            ------------------------------------------------------------------
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Login")} >
            <Text style={styles.signUp}>
              Already have an account? <Text style={styles.signUpBlue}>Log In</Text>
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
    marginTop: 150,
    paddingHorizontal: 40,
  },
  headingView: {
    // display: "flex",
    // alignItems: "center"
  },
  headingTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  headingText: {
    fontWeight: 'bold',
    color: '#BCC6CC',
    fontSize: 17,
    paddingLeft: 5
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
  greyLine: {
    textAlign: "center",
    marginTop: 50,
    color: "lightgray"
  },
  signUp: {
    textAlign: "center",
    marginTop: 20,
    color: "black"
  },
  signUpBlue: {
    color: "#1e319d",
    fontWeight: "bold",
  },


})

export default SignUp;