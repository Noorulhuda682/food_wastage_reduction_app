import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from "react-redux";
import {
  Container, Left, Body, Right, Button, Icon, Title, Content,
  Card, CardItem, H2, Footer, Badge,
  Fab, Thumbnail, Item, Input
} from "native-base"
import Header from "../shared/Header"

const Profile = ({ navigation }) => {
  const {user} = useSelector(state => state);
     
  console.log("USER",user);

  const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
  
  return (
    <Container>
      <Header navigation={navigation} title={"Profile"}/>
      <Content >
        <View style={{
          alignItems: "center", borderBottomWidth: 1,
          borderBottomColor: "lightgray", paddingBottom: 20,
          marginBottom: 10
        }}>
          <View>
            <Thumbnail
              size={50}
              style={styles.profileImage}
              large source={require('../assets/images/profile.jpg')}
            />
            <Badge success style={styles.badge}></Badge>
          </View>

          <Text style={{ fontWeight: 'bold', marginTop: 10 }}>{user.name}</Text>

          <Text style={{color:"#4d61ff",
          padding:5,paddingHorizontal:30,marginTop:20,backgroundColor:'#e6e9ff',marginBottom:-10}}>
            ROLE :  {user.role}</Text>
        </View>

        <Content style={{ paddingHorizontal: "5%" }} padder>
          <Text style={{ color: "lightgray", fontWeight: "bold", textAlign: "center", }} >Edit Profile</Text>
          <Text style={styles.grayText} >Username</Text>
          <Item
            // success
            style={styles.item}
          >
            <Input
              value={"Noorul Huda"}
              style={styles.input}
            //  onChangeText={(emails) => { console.log("emails", emails);
            //   setEmail(emails) }}
            />
            {/* <Icon name='checkmark-circle' /> */}
          </Item>
          <Text style={styles.grayText} >Email</Text>
          <Item style={styles.item}>
            <Input
              value={user.email}
              style={styles.input}
            //  onChangeText={(emails) => { console.log("emails", emails);
            //   setEmail(emails) }}
            />
            {/* <Icon name='checkmark-circle' /> */}
          </Item>
          <Text style={styles.grayText} >Gender</Text>
          <Item style={styles.item}>
            <Input
              value={"Male"}
              style={styles.input}
            //  onChangeText={(emails) => { console.log("emails", emails);
            //   setEmail(emails) }}
            />
            {/* <Icon name='checkmark-circle' /> */}
          </Item>
          <Text style={styles.grayText} >Date of Birth</Text>
          <Item style={styles.item}>
            <Input
              value={"03/07/1996"}
              style={styles.input}
            //  onChangeText={(emails) => { console.log("emails", emails);
            //   setEmail(emails) }}
            />
            {/* <Icon name='checkmark-circle' /> */}
          </Item>
          <Text style={styles.grayText} >Address</Text>
          <Item style={styles.item}>
            <Input
              value={"gulshan sikandar abad keamari karachi"}
              style={styles.input}
            //  onChangeText={(emails) => { console.log("emails", emails);
            //   setEmail(emails) }}
            />
            {/* <Icon name='checkmark-circle' /> */}
          </Item>
        </Content>
        <View style={styles.btnsView} padder>
          <Button style={styles.button}>
            <Text style={styles.btnText}>Cancel</Text>
          </Button>
          <Button
            style={[styles.button, styles.activeBtn]}
          >
            <Text style={[styles.btnText, styles.activeBtnText]}>Save</Text>
          </Button>
        </View>
      </Content>

    </Container>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    height: 130,
    width: 130,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 25
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
    marginTop: 20
  },
  button: {
    borderColor: "#00203FFF",
    borderWidth: 1,
    backgroundColor: "white",
    paddingHorizontal: 25,
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
    borderBottomColor: "gray"
  },
  input: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: -5
  },
  badge: {
    width: 23,
    height: 23,
    borderWidth: 1,
    borderColor: "lightgray",
    marginTop: -25,
    alignSelf: "flex-end"
  }

})

export default Profile;