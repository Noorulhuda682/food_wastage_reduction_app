import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert, Image
} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from "react-redux";
import {
  Container, Left, Body, Right, Button, Icon, Title, Content,
  Card, CardItem, H2, Footer, Badge,
  Fab, Thumbnail, Item, Input
} from "native-base"
import Header from "../shared/Header"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DropDownInput from "../shared/DropDown";
import Divider from "../shared/Divider";

const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Profile = ({ navigation }) => {
  const { user } = useSelector(state => state);

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [gender, setGender] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState()
  const [address, setAddress] = useState()
  const [country, setCountry] = useState()
  const [city, setCity] = useState()
  const [contact, setContact] = useState(null)


  const [profile, setProfile] = useState(user?.profileImage)

  console.log("USER", user);
  const launchCameraHandler = () => {
    launchCamera(options, (response) => {
      console.log('Response = ', response);
      checkPhotoValidation(response)
    });
  }

  const checkPhotoValidation = async (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      Alert.alert(`${response.customButton}`);
    } else {
      setProfile(response.uri)
    }
  }

  const updateUserHandler = () => {
      let updateObj = {
         name,
         email,
         gender,
         dateOfBirth,
         address,
         country,
         city,
         contact
      }
      console.log("OBJ=======",updateObj);
  }


  const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

  return (
    <Container style={{ paddingBottom: 50 }}>
      <Header navigation={navigation} title={"Profile"} />
      <Content>
        <View style={{
          alignItems: "center", borderBottomWidth: 1,
          borderBottomColor: "#e6e6ff", paddingBottom: 20,
        }}>
          <View style={{ borderColor: "lightgray", justifyContent: "center", alignItems: "center" }}>


            <TouchableOpacity onPress={launchCameraHandler}
              style={{ marginBottom: -10, marginLeft: 140, marginTop: 50 }}
            >
              <Text style={{ color: "blue" }}>
                <MaterialIcons name="edit" style={{ marginTop: 15, fontSize: 17 }} color="blue" />
                edit profile
              </Text>
            </TouchableOpacity>

            {profile  ?
              <Image
                size={50}
                style={styles.profileImage}
                large source={{ uri: profile }}
              />
              :
              <Text style={styles.profileCircle}>
                {name && name[0]}
              </Text>
            }

            <Text style={{ fontWeight: 'bold', marginTop: 10, color: "black" }}>{user.name}</Text>

            <Text style={{
              color: "#4d61ff",borderRadius:3,justifyContent:"center",alignItems:"center",
              padding: 10, paddingHorizontal: 15, marginTop: 20, backgroundColor: '#e6e9ff', marginBottom: -10
            }}>
              <FontAwesome5 name="critical-role"  size={20} color="blue" />
              {"    "}ROLE :  {user.role}</Text>

          </View>
        </View>

        <Content style={{ paddingHorizontal: "5%" }} padder>
          <Text style={{ color: "lightgray", fontWeight: "bold", textAlign: "center", }} >Edit Profile</Text>

          <Text style={styles.grayText} >Username</Text>
          <Item
            style={styles.item}
          >
            <Input
              value={name}
              style={styles.input}
              onChangeText={(emails) => setName(emails)}
            />
          </Item>

          <Text style={styles.grayText} >Email</Text>
          <Item style={styles.item}>
            <Input
              value={email}
              style={styles.input}
              onChangeText={(emails) => setEmail(emails)}
            />
          </Item>

          <DropDownInput
            pickerItems={["Select gender", "male", "female"]}
            onChange={setGender}
            customeStyle={{ elevation: 0, height: 45, borderBottomWidth: 1, borderColor: "lightgray" }}
            pickerStyle={{ fontSize: 14 }}
          />
          <Divider />
          <DropDownInput
            pickerItems={["Select Country", "India", "Pakistan", "Canada",]}
            onChange={setCountry}
            customeStyle={{ elevation: 0, height: 45, borderBottomWidth: 1, borderColor: "lightgray" }}
            pickerStyle={{ fontSize: 14 }}
          />
          <Divider />
          <DropDownInput
            pickerItems={["Select City", "Karachi", "Islamabad", "Peshawar", "Dehli", "Mumbai", "Vancouver"]}
            onChange={setCity}
            customeStyle={{ elevation: 0, height: 45, borderBottomWidth: 1, borderColor: "lightgray" }}
            pickerStyle={{ fontSize: 14 }}
          />
          <Divider />

          <Text style={styles.grayText} >Date of Birth</Text>
          <Item style={styles.item}>
            <Input
              value={dateOfBirth}
              style={styles.input}
              onChangeText={(emails) => setDateOfBirth(emails)}
            />
          </Item>

          <Text style={styles.grayText} >Address</Text>
          <Item style={styles.item}>
            <Input
              value={address}
              style={styles.input}
              onChangeText={(emails) => setAddress(emails)}
            />
          </Item>

          <Text style={styles.grayText} >Contact#</Text>
          <Item style={styles.item}>
            <Input
              value={contact}
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(emails) => setContact(emails)}
            />
          </Item>
        </Content>
        <View style={styles.btnsView} padder>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={updateUserHandler}
            style={[styles.button, styles.activeBtn]}
          >
            <Text style={[styles.btnText, styles.activeBtnText]}>Save</Text>
          </TouchableOpacity>
        </View>
      </Content>
    </Container>
  );
}




const styles = StyleSheet.create({
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
  },
  letftText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  rightText: {
    fontSize: 18,
    color: 'gray',
    marginLeft: 20,
    backgroundColor: "lightgray"
  },
  btnsView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: "10%",
    marginTop: 25
  },
  button: {
    borderColor: "#00203FFF",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  btnText: {
    color: "#00203FFF",
    fontWeight: 'bold',
  },
  activeBtn: {
    backgroundColor: "#00203FFF",
    borderRadius: 3
  },
  activeBtnText: {
    color: "white"
  },
  grayText: {
    color: "#88929c",
    paddingLeft: 6,
    marginTop: 15
  },
  item: {
    marginTop: -10,
    borderBottomColor: "#e6e6ff",
    borderWidth: 1
  },
  input: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: -5
  },
  profileCircle: {
    color: "gray",
    height: 100, width: 100, backgroundColor: "white",
    borderRadius: 50, textAlign: "center", fontSize: 30,
    paddingTop: 30, borderWidth: 1, borderColor: "lightgray",
    fontWeight: "bold",
  }
})

export default Profile;

