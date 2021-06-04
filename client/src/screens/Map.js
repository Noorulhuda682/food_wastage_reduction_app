import React,{useState,useEffect} from 'react';
import {
    View,
    Text, Dimensions,
    StyleSheet, Image,PermissionsAndroid,Platform,

} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title, Content,
    Card, CardItem, H2, Footer, Thumbnail, List, ListItem,
    // Text
} from 'native-base';
import Geolocation from '@react-native-community/geolocation';
const { width, height } = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

const Map = ({ navigation }) => {
    const [currentLongitude, setCurrentLongitude] = useState(null);
    const [currentLatitude,setCurrentLatitude ] = useState(null);
    const [locationStatus,setLocationStatus  ] = useState('');


    useEffect(() => {
      
        // getOneTimeLocation();
        const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
                getOneTimeLocation();
                subscribeLocationLocation();
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        getOneTimeLocation();
                        // subscribeLocationLocation();
                    } else {
                        setLocationStatus('Permission Denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };
        requestLocationPermission();
        return () => {
            // Geolocation.clearWatch(watchID);
        };
    }, []);



    const getOneTimeLocation = () => {
        console.log("LATLONG===>1");
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => {
            setLocationStatus('You are Here');
            console.log("LATLONG===>",position);
    
            //Setting Longitude state
            setCurrentLongitude(position.coords.longitude);
            
            //Setting Longitude state
            setCurrentLatitude(position.coords.latitude);
          },
          (error) => {
            setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0
          },
        );
      };


      const subscribeLocationLocation = () => {
          console.log("Working");
         Geolocation.watchPosition(
          (position) => {
            //Will give you the location on location change
            console.log("Workingposition",position);
            setLocationStatus('You are Here');
            console.log(position);
    
            setCurrentLongitude(position.coords.longitude);
            
            //Setting Longitude state
            setCurrentLatitude(position.coords.latitude);
          },
          (error) => {
            setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 1000
          },
        );
      };

      

console.log("currentLatitude=======",currentLatitude,currentLongitude);
    return (
        <Container>
            <Header style={{ backgroundColor: "#00203FFF" }}>
                <Left>
                    <Button transparent onPress={() => navigation.openDrawer()}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>Map Area</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
                    </Button>
                </Right>
            </Header>
            <Content>
             <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{
                        flex: 1,
                        height: 590
                    }}
                    showsUserLocation
                    initialRegion={{
                        latitude:  currentLatitude ? currentLatitude : 24.8607,
                        longitude:currentLatitude?currentLatitude:67.0011,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}

                >
                    <Marker
                        coordinate={{ latitude:currentLatitude ? currentLatitude :  24.8607
                            ,longitude: currentLongitude ? currentLongitude:67.0011,}}
                    >
                        <MaterialCommunityIcons name="map-marker" size={50} color="#00238b" />
                    </Marker>
                </MapView>
                <List>
                    <ListItem thumbnail onPress={subscribeLocationLocation}>
                        <Left>
                            <Thumbnail square source={require('../assets/images/foods.jpeg')} />
                        </Left>
                        <Body>
                            <Text>Sankhadeep { `${currentLongitude}`}</Text>
                            <Text note numberOfLines={1}>Its time to help poorty . .</Text>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text>View</Text>
                            </Button>
                        </Right>
                    </ListItem>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail square source={require('../assets/images/foods.jpeg')} />
                        </Left>
                        <Body>
                            <Text>Sankhadeep</Text>
                            <Text note numberOfLines={1}>Its time to help poorty . .</Text>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text>View</Text>
                            </Button>
                        </Right>
                    </ListItem>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail square source={require('../assets/images/foods.jpeg')} />
                        </Left>
                        <Body>
                            <Text>Sankhadeep</Text>
                            <Text note numberOfLines={1}>Its time to help poorty . .</Text>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text>View</Text>
                            </Button>
                        </Right>
                    </ListItem>
                </List>
            </Content>
            {/* <Content style={{height:100}}>
                <Text>
                    User Information
                </Text>
            </Content> */}

        </Container>

    );
}

const styles = StyleSheet.create({

})
export default Map;