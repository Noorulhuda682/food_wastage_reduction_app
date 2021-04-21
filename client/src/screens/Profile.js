import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
  Container, Header, Left, Body, Right, Button, Icon, Title, Content,
  Card, CardItem, H2, Footer,
  Fab, Thumbnail
} from "native-base"

const Profile = ({ navigation }) => {
  const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

  return (
    <Container>
      <Header style={{ backgroundColor: "#00203FFF" }}>
        <Left>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name='menu' />
          </Button>

        </Left>
        <Body>
          <Title>My Profile</Title>
        </Body>
        <Right>
          <Button transparent>
            <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
          </Button>
        </Right>
      </Header>
      <Content >
        <View style={{
          alignItems: "center", borderBottomWidth: 1,
          borderBottomColor: "lightgray", paddingBottom: 20,
          marginBottom:10
        }}>
          <Thumbnail
            size={50}
            style={styles.profileImage}
            large source={require('../assets/images/profile.jpg')} />
        </View>
        <View style={{alignItems:"center"}}>
          <Text>
            <Text style={styles.letftText}>Name : </Text>
            <Text style={styles.rightText}>
              Noorul Huda
            </Text>
          </Text>
        </View>
      </Content>

    </Container>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    height: 150,
    width: 150,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: 25
  },
  letftText:{
   fontWeight:'bold',
   fontSize:18
  },
  rightText:{
    fontSize:18,
    color:'gray',
    marginLeft:20,
    backgroundColor:"lightgray"
  }
})

export default Profile;