import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {Container, Icon, Content, Fab} from 'native-base';
import messaging from '@react-native-firebase/messaging';
import {useSelector} from 'react-redux';
import Header from '../shared/Header';
import {cardListData} from '../config/homeCardList';

const Home = ({navigation}) => {
  const storeData = useSelector(state => state);

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

  return (
    <Container>
      <Header navigation={navigation} title={'Menu'} />
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
        <Text style={[styles.heading, {paddingLeft: 10, color: 'black'}]}>
          What we do
        </Text>
        <View style={styles.cardContainer}>
          {cardListData.map(cardItem => (
            <View style={styles.card}>
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
    color: '#1e319d',
    textShadowColor: 'gray',
    textShadowOffset: {width: -1, height: 1},
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
    shadowOffset: {width: 0, height: 0},
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
    marginLeft: 7,
  },
  cardTitle: {
    fontSize: 16,
    marginTop: -4,
    textShadowColor: 'blue',
    textShadowRadius: 1,
  },
  cardParagraph: {
    color: 'gray',
  },
});
export default Home;
