import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
  BackHandler
} from 'react-native';
import { Container, Icon, Content, Fab } from 'native-base';
import messaging from '@react-native-firebase/messaging';
import { useSelector } from 'react-redux';
import Header from '../shared/Header';
import { cardListData } from '../config/homeCardList';
import { useMutation } from "@apollo/client"
import { UPDATE_USER } from "../typeDefs/User";
import { UPDATE_RECEIVER } from "../typeDefs/Receiver";
import Geolocation from '@react-native-community/geolocation';

const Home = ({ navigation }) => {
  const storeData = useSelector(state => state);
  const [updateUser, { }] = useMutation( (storeData?.user?.role === "USER" || storeData?.user?.role === "ADMIN") ? UPDATE_USER : UPDATE_RECEIVER);

  

  useEffect(async () => {

    if(storeData.user){
      let position;
      await requestLocationPermission()
        .then(res => { position = res }).catch(err => console.log("EE===", err))
      let { latitude, longitude } = position;
      console.log("Postion==>", latitude, longitude);
      let token = await messaging().getToken();

      let payload = (storeData?.user?.role === "USER" || storeData?.user?.role === "ADMIN") ? { userId: storeData?.user?._id } : { receiverId: storeData?.user?._id }
      token && (payload.pushToken = token)
      latitude && (payload.latitude = latitude)
      longitude && (payload.longitude = longitude)


      updateUser({
        variables: payload
      }).then(res => {
        console.log("LOG===", res);
      }).catch(err => {
        Alert.alert(`QQQ  ${err}`)
        console.log("err===", res);
      })

    }

  }, [])


  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }
      });

  }, []);

  // console.log("storeData", storeData);

  return (
    <Container>
      <Header navigation={navigation} title={'Menu'} />
      <View style={styles.homeTitleView}>
        <View style={{ flex: 1, paddingHorizontal: 10, height: 130 }}>
          <Text style={styles.heading}>Food Wastage Reduction</Text>
          <Text style={styles.para}>
            Reducing the wastage of food can boost the economy of a country
          </Text>
        </View>
        <Image
          style={styles.homeTitleImg}
          source={require('../assets/images/home-icon.jpg')}
        />
      </View>
      <Content padder style={{ marginTop: -60 }}>
        <Text style={[styles.heading, { paddingLeft: 10, color: 'black' }]}>
          What we do
        </Text>
        <View style={styles.cardContainer}>
          {cardListData.map((cardItem, key) => (
            <View style={styles.card} key={key}>
              <Image style={styles.cardContentImg} source={cardItem.imgUrl} />
              <View style={styles.cardRight}>
                <Text style={styles.cardTitle}>{cardItem.title}</Text>
                <Text style={styles.cardParagraph}>{cardItem.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </Content>
      {storeData?.user?.role === 'USER' && (
        <Fab
          active={true}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#1e319d' }}
          position="bottomRight"
          onPress={() => navigation.navigate('addPost')}>
          <Icon name="add" />
        </Fab>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  mainContent: {},
  heading: {
    fontSize: 22,
    color: '#1e319d',
    textShadowColor: 'gray',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  para: {
    marginTop: 5,
    fontSize: 12,
    color: 'gray',
  },
  homeTitleView: {
    borderColor: 'white',
    paddingTop: 25,
    height: 150,
    paddingHorizontal: 10,
    borderBottomWidth: 0,
    borderWidth: 1,
    height: 230,
    flexDirection: 'row',
  },
  homeTitleImg: {
    flex: 1,
    height: 130,
    width: 120,
    borderRadius: 50,
    borderBottomLeftRadius: 0,
  },
  card: {
    borderRadius: 5,
    flexBasis: '47.5%',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    borderColor: 'white',
    marginTop: 10,
    padding: 10,
  },
  cardContentImg: {
    height: 150,
    width: 120,
    borderRadius: 50,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 0,
  },
  cardRight: {
    flex: 2,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 17,
    color: "navy"
    // textShadowColor: 'blue',
    // textShadowRadius: 1,
  },
  cardParagraph: {
    color: 'gray',
    marginTop: 5
  },
});
export default Home;






const requestLocationPermission = async () => {

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location Access Required',
      message: 'This App needs to Access your location',
    },
  );

  return new Promise((resolve, reject) => {

    if (Platform.OS === 'ios') {
      // getOneTimeLocation();
      // subscribeLocationLocation();
    } else {
      try {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          let check = Geolocation.getCurrentPosition(
            //Will give you the current location
            position => resolve(position.coords),
            error => reject(error),
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge:60000
            },
          );
          console.log("1positioning|||===>", check);

        } else {
          // console.log("Permission Denied", error);
          reject("Permission Denied")
        }
      } catch (err) {
        console.warn(err);
        reject(err)
      }
    }

  });
};