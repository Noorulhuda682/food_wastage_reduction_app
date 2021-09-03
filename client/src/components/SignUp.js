import React, { useState, useContext } from 'react';
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
  ToastAndroid,
  Alert,
} from 'react-native';
import {
  Container,
  Content
} from 'native-base';

import DropDownInput from '../shared/DropDown';
import InputText from '../shared/TextInput';
import { useMutation } from '@apollo/client';
import { ADDUSER, ADDRECEIVER } from '../typeDefs/Auth';
import { ChangeTokenHandlerContext } from '../../App';
import { useDispatch } from 'react-redux';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SignUp = ({ navigation }) => {
  const ChangeTokenHandler = useContext(ChangeTokenHandlerContext);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [checkName, setCheckName] = useState(false);
  const [email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');

  const [addingUser, { }] = useMutation(ADDUSER);
  const [addingReceiver, { }] = useMutation(ADDRECEIVER);

  const signUp = () => {
    if (name === '' || name === undefined || name === ' ' || name === null) {
      ToastAndroid.showWithGravity(
        'Enter username',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return false;
    }
    if (
      email === '' ||
      email === undefined ||
      email === ' ' ||
      email === null
    ) {
      ToastAndroid.showWithGravity(
        'Enter email',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return false;
    }
    if (
      password === '' ||
      password === undefined ||
      password === ' ' ||
      password === null
    ) {
      ToastAndroid.showWithGravity(
        'Enter password',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return false;
    }
    if (role === '' || role === undefined || role === ' ' || role === null) {
      ToastAndroid.showWithGravity(
        'Select Account Type',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return false;
    }

    setLoading(true);
    if (checkEmail && checkPassword && checkName && role) {
      let register = role === 'USER' ? addingUser : addingReceiver;
      register({
        variables: {
          name,
          email,
          password,
        },
      })
        .then(({ data }) => {
          // var {token, user} = role === 'USER' ? data.addUser : data.addReceiver;
          console.log('REGISTER=======', data, '***************');
          // saveData(token);
          // ChangeTokenHandler(token);
          Alert.alert('Registration Successfull');
          // dispatch(addUser(user));
          navigation.navigate('verifyAccount');
          setLoading(false);
        })
        .catch(err => {
          Alert.alert('Error', JSON.stringify(err.message));
          setLoading(false);
        });
    }
  };

  return (
    <Container>
      <Content style={styles.content}>
        <View style={styles.headingView}>
          <Text style={styles.headingTitle}>Create Account</Text>
        </View>

        <InputText
          email={name}
          setEmail={setName}
          checkEmail={checkName}
          setCheckEmail={setCheckName}
          type={'name'}
          placeholder={'Name...'}
          customStyle={{ marginTop: 50, marginRight: 1 }}
          icon={<AntDesign name="user" size={14} color="lightgray" />}
        />
        <InputText
          email={email}
          setEmail={setEmail}
          checkEmail={checkEmail}
          setCheckEmail={setCheckEmail}
          type={'email'}
          placeholder={'Email...'}
          customStyle={{ marginTop: 12, marginRight: 1 }}
          icon={<Entypo name="email" size={14} color="lightgray" />}
        />

        <InputText
          email={password}
          setEmail={setPassword}
          checkEmail={checkPassword}
          setCheckEmail={setCheckPassword}
          type={'password'}
          placeholder={'Password...'}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          customStyle={{ marginTop: 12, marginRight: 1 }}
          icon={<FontAwesome5 name="key" size={14} color="lightgray" />}
        />

        {password !== '' && !checkPassword && (
          <Text style={{ color: 'red', fontSize: 13 }}>
            Password should container at least one digit, one lower case,
            one upper case, 8 mentioned characters!
          </Text>
        )}

        <DropDownInput
          pickerItems={['Account Type', 'USER', 'RECEIVER']}
          onChange={setRole}
          selectedValue={role}
        />

        <TouchableOpacity onPress={signUp} style={{ marginTop: 50 }}>
          <View style={styles.loginButton}>
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Sign Up
              </Text>
            )}
          </View>
        </TouchableOpacity>

        <Text style={styles.greyLine}>
          ------------------------------------------------------------------
        </Text>

        <TouchableOpacity
          style={{ marginBottom: 100 }}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signUp}>
            Already have an account?{' '}
            <Text style={styles.signUpBlue}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  headingView: {
    backgroundColor: '#e6e8ff',
    borderWidth: 1,
    borderColor: '#1e319d',
    textAlign: 'center',
    padding: 30,
    borderRadius: 100,
    borderLeftWidth: 15,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  headingTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 1,
  },
  headingText: {
    color: '#d1d8ff',
    fontSize: 17,
    paddingLeft: 5,
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: 'lightgray',
  },
  inputView: {},
  input: {
    shadowColor: '#000',
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
    backgroundColor: '#1e319d',
    borderRadius: 6,
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  greyLine: {
    textAlign: 'center',
    marginTop: 20,
    color: 'lightgray',
  },
  signUp: {
    textAlign: 'center',
    marginTop: 20,
    color: 'black',
  },
  signUpBlue: {
    color: '#4d61ff',
    fontWeight: 'bold',
  },
});

export default SignUp;
