import React, {useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {
  Container,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Content,
  Card,
  CardItem,
  H2,
  Footer,
  Thumbnail,
  Fab,
} from 'native-base';
import messaging from '@react-native-firebase/messaging';
const {width, height} = Dimensions.get('window');
import {useSelector} from 'react-redux';
import {gql, useQuery, useSubscription} from '@apollo/client';
import Header from '../shared/Header';
import {RECEIVER_ADDED} from "../typeDefs/Receiver"

// const GET_USERS = gql`
//   query users{
//   users{
//     name
//     email
//     _id
//   }
// }
// `;



const Home = ({navigation}) => {
  const storeData = useSelector(state => state);

  // const { loading, error, data } = useQuery(GET_USERS);
  // const {data, error, loading } = useSubscription(RECEIVER_ADDED);

  // if (loading)  console.log('Loading...');
  // if (error) console.log(`Error! ${error.message}`);
  // console.log('DATA****==>', data);
  // console.log('2DATA****==>', error);

  const getTokens = async () => {
    let token = await messaging().getToken();
    console.log('token', token);
  };

  useEffect(() => {
    getTokens();
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

  // console.log("netInfo", netInfo);
  return (
    <Container>
      <Header navigation={navigation} title={'Home'} />
      <View style={styles.homeTitleView}>
        <View style={{flex: 1, paddingHorizontal: 10, height: 130}}>
          <Text style={styles.heading}>Food Wastage Reduction</Text>
          <Text style={styles.para}>
            Reducing the wastage of food can boot the economy of a country
          </Text>
        </View>
        <Image
          style={styles.homeTitleImg}
          source={require('../assets/images/home-icon.jpg')}
        />
      </View>

      <Content padder style={{marginTop: -60}}>
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card}>
            <Content style={styles.cardContent}>
              <Image
                style={styles.cardContentImg}
                source={require('../assets/images/foods.jpeg')}
              />
              <Text style={styles.cardContentText}>Food Items</Text>
            </Content>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Content style={styles.cardContent}>
              <Image
                style={styles.cardContentImg}
                source={require('../assets/images/location.jpg')}
              />
              <Text style={styles.cardContentText}>
                {' '}
                Distribution Locations
              </Text>
            </Content>
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card}>
            <Content style={styles.cardContent}>
              <Image
                style={styles.cardContentImg}
                source={require('../assets/images/distribution.jpg')}
              />
              <Text style={styles.cardContentText}>
                Per Family Distribution
              </Text>
            </Content>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Content style={styles.cardContent}>
              <Image
                style={styles.cardContentImg}
                source={require('../assets/images/karachi.jpg')}
              />
              <Text style={styles.cardContentText}>
                {' '}
                Distribution Origin Karachi
              </Text>
            </Content>
          </TouchableOpacity>
        </View>
      </Content>

      {storeData?.user?.role === 'USER' && (
        <Fab
          active={true}
          direction="up"
          containerStyle={{}}
          style={{backgroundColor: '#1e319d'}}
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
    color: "#1e319d",
    textShadowColor: 'gray',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
  },
  para: {
      marginTop:5,
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
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal:7,
  },
  card: {
    borderRadius: 5,
    flexBasis: '47.5%',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 7,
    borderColor:"white",
    marginTop:10,
    // borderWidth: 1,
  },
  cardContent: {
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  cardContentImg: {
    height: 150,
    width: null,
    borderRadius: 50,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 10,
  },
  cardContentText: {
    fontSize: 12,
    marginTop: 5,
    textShadowColor: 'blue',
    textShadowRadius: 1,
  },
});
export default Home;
