import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert, Image
} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from "react-redux";
import {
  Container, Content, Item, Input
} from "native-base"
import Header from "../shared/Header"
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DropDownInput from "../shared/DropDown";
import Divider from "../shared/Divider";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { UPDATE_RECEIVER, GET_RECEIVER } from "../typeDefs/Receiver"
import { UPDATE_USER, GET_USER } from "../typeDefs/User"
import uploadImageToCloud from "../config/uploadImageToCloudinary";
import setImageFileForCloudinary from "../config/setImageForCloudinary";
import { addUser } from "../redux/actions/user"

const options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Profile = ({ navigation }) => {
  const { user } = useSelector(state => state);
  // const state = useSelector(state => state);
  console.log("user", user);
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState(user?.name)
  const [gender, setGender] = useState(user?.gender)
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth)
  const [address, setAddress] = useState(user?.address)
  const [country, setCountry] = useState(user?.country)
  const [city, setCity] = useState(user?.city)
  const [contact, setContact] = useState(user?.contactNumber)
  const [profile, setProfile] = useState(user?.profileImage)

  const dispatch = useDispatch();
  const [updateUser, { }] = useMutation((user.role === "USER") ? UPDATE_USER : UPDATE_RECEIVER)
  // const { refetch } = useQuery((user.role === "USER") ? GET_USER : GET_RECEIVER, { variables: (user.role === "USER") ? { userId: user?._id } : { receiverId: user?._id } });
  // console.log("USER**", user);
  // var { refetch } = useQuery(GET_RECEIVER, { variables: { receiverId: user?._id } });

  const [
    getUser,
    { loading, data, error }
  ] = useLazyQuery(user.role === "USER" ? GET_USER : GET_RECEIVER);



  const launchCameraHandler = () => {
    launchImageLibrary(options, (response) => {
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

  const updateUserHandler = async () => {
    setLoader(true)


    var updateObj = {
      name,
      gender,
      dateOfBirth,
      address,
      country,
      city,
      contactNumber: parseFloat(contact),
    }


    // console.log("1==============", updateObj);

    if (user.role === "USER") updateObj.userId = user._id
    else updateObj.receiverId = user._id

    // IMAGE UPLOADING TO CLOUDINARY 
    if (profile !== user?.profileImage) {
      // Alert.alert(`running`)
      let imageFile = setImageFileForCloudinary(profile)
      let data = await uploadImageToCloud(imageFile)
      var { uploading, message, url } = data
      // console.log("URL=======", url);
      if (uploading) {
        updateObj.profileImage = url
      } else {
        Alert.alert(`${message}`)
        setLoader(false)
        return false
      }
    }

    // mutation
    await updateUser({
      variables: updateObj
    }).then(async (res) => {
      Alert.alert(`Changes Saved Successfully`);
      if (user.role === "USER") await getUser({ variables: { userId: user?._id } })
      else await getUser({ variables: { receiverId: user?._id } })

      let updatedUser = { ...user };
      updatedUser.name = name
      updatedUser.gender = gender
      updatedUser.dateOfBirth = dateOfBirth
      updatedUser.address = address
      updatedUser.country = country
      updatedUser.city = city
      updatedUser.contactNumber = contact;
      if (updateObj.profileImage) updatedUser.profileImage = updateObj.profileImage

      dispatch(addUser(updatedUser));
      // console.log('11122[][][][][', data, "]]]]]]]]", getProfile.current);
      setLoader(false)
    }).catch(error => {
      setLoader(false)
      console.log("GEtting Err:", error);
      Alert.alert(`Error! : ${error}`);
    })
    // console.log("OBJ=======", updateObj);
  }

  // if (data?.getReceiver && handler) {
  //   dispatch(addUser(data?.getReceiver));
  //   setHandler(false)
  // }
  // if (data?.getUser && handler) {
  //   dispatch(addUser(data?.getUser));
  //   setHandler(false)
  // }

  // console.log('[][][][][', data,);

  // useEffect(() => {
  //   // console.log('[][][][][', data, "]]]]]]]]", getProfile.current);
  //   // if (data?.getReceiver) dispatch(addUser(data?.getReceiver));
  //   // if (data?.getUser) dispatch(addUser(data?.getUser));
  // }, [handler, data]);

  return (
    <Container >
      <Header navigation={navigation} title={"Profile"} />
      <Content >
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

            {profile ?
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
              color: "#4d61ff", borderRadius: 3, justifyContent: "center", alignItems: "center",
              padding: 10, paddingHorizontal: 15, marginTop: 20, backgroundColor: '#e6e9ff', marginBottom: -10
            }}>
              <FontAwesome5 name="critical-role" size={20} color="blue" />
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
              placeholder="example Aijaz Khan"
              placeholderTextColor="lightgray"

            />
          </Item>


          <DropDownInput
            pickerItems={["Select gender", "male", "female"]}
            onChange={setGender}
            customeStyle={{ elevation: 0, height: 45, borderBottomWidth: 1, borderColor: "lightgray" }}
            pickerStyle={{ fontSize: 14 }}
            selectedValue={gender}
          />
          <Divider />
          <DropDownInput
            pickerItems={["Select Country", "India", "Pakistan", "Canada",]}
            onChange={setCountry}
            customeStyle={{ elevation: 0, height: 45, borderBottomWidth: 1, borderColor: "lightgray" }}
            pickerStyle={{ fontSize: 14 }}
            selectedValue={country}
          />
          <Divider />
          <DropDownInput
            pickerItems={["Select City", "Karachi", "Islamabad", "Peshawar", "Dehli", "Mumbai", "Vancouver"]}
            onChange={setCity}
            customeStyle={{ elevation: 0, height: 45, borderBottomWidth: 1, borderColor: "lightgray" }}
            pickerStyle={{ fontSize: 14 }}
            selectedValue={city}
          />
          <Divider />

          {/* <Text style={styles.grayText} >Date of Birth</Text>
          <Item style={styles.item}>
            <Input
              value={dateOfBirth}
              style={styles.input}
              placeholder="3rd july 1996"
              placeholderTextColor="lightgray"
              onChangeText={(emails) => setDateOfBirth(emails)}
            />
          </Item> */}

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
              value={contact?.toString()}
              style={styles.input}
              keyboardType="numeric"
              placeholder="example 03341828064"
              placeholderTextColor="lightgray"
              onChangeText={(emails) => setContact(emails)}
            />
          </Item>
          {/* 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 */}
        </Content>
        <View style={styles.btnsView} padder>
          <TouchableOpacity
            onPress={updateUserHandler}
            style={[styles.button, styles.activeBtn, { marginLeft: 10 }]}
          >
            <Text style={[styles.btnText, styles.activeBtnText]}>
              {!loader ? "Save Changes" : "Saving..."}
            </Text>

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
    justifyContent: "space-between",
    padding: 30,
    paddingBottom: 150,
    marginTop: 25
  },
  button: {
    borderColor: "#1e319d",
    flexBasis: "35%",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  btnText: {
    color: "#1e319d",
    // fontWeight: 'bold',
  },
  activeBtn: {
    backgroundColor: "#1e319d",
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
    // fontWeight: "bold",
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

