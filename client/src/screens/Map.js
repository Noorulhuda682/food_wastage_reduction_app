import React, { useState, useEffect, useRef } from 'react';
import {
    Text, Dimensions,
    StyleSheet, PermissionsAndroid, Platform, View,
    BackHandler, Alert
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Callout } from 'react-native-maps';
import {
    Container, Content,
} from 'native-base';
import Header from '../shared/Header';
import Geolocation from '@react-native-community/geolocation';
const { width, height } = Dimensions.get('window')
import MapPostBar from '../shared/MapPostBar';
// "AIzaSyDG6vNwyXyphQygBpy-HDmz36ppHI4bOQY"
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

const Map = ({ route, navigation }) => {

    // console.log("PARAMS===", route.params);
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => navigation.navigate("progressOrders") }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    let { post } = route.params;

    const [currentLongitude, setCurrentLongitude] = useState(null);
    const [currentLatitude, setCurrentLatitude] = useState(null);
    const [locationStatus, setLocationStatus] = useState('');
    const [latitudeDelta, setLatitudeDelta] = useState(1.0)
    const [longitudeDelta, setLongitudeDelta] = useState(1.0)
    longitudeDelta
    const markerRef = useRef(null);

    const onRegionChangeComplete = () => {
        if (markerRef && markerRef.current && markerRef.current.showCallout) {
            markerRef.current.showCallout();
        }
    };

    const [userLocation, setUserLocation] = useState({
        latitude: post.user[0].latitude,
        longitude: post.user[0].longitude
    })

    const [receiverLocation, setReceiverLocation] = useState({
        latitude: post.receiver[0].latitude,
        longitude: post.receiver[0].longitude
    })




    const subscribeLocationLocation = () => {
        console.log("Working");
        Geolocation.watchPosition(
            (position) => {
                //Will give you the location on location change
                console.log("Workingposition", position);
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

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                // if (!hasUnsavedChanges) {
                //   // If we don't have unsaved changes, then we don't need to do anything
                //   return;
                // }

                // Prevent default behavior of leaving the screen
                console.log("BACK===", e);
                // e.preventDefault();

            }),
        [navigation]
    );



    // console.log("currentLatitude=======", currentLatitude, currentLongitude);

    return (
        <Container>
            <Header navigation={navigation} title="Map Area" />
            <Content style={{
                // borderWidth:2,borderColor:"red"
            }}>
                <View style={styles.cardView}>
                    <MapPostBar
                        navigation={navigation}
                        foodPost={post}
                        hideMapIcon
                    />
                </View>
                <MapView
                    onRegionChangeComplete={onRegionChangeComplete}
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{
                        flex: 1,
                        height: 590
                    }}
                    showsUserLocation
                    initialRegion={{
                        latitude: currentLatitude ? currentLatitude : 24.8607,
                        longitude: currentLatitude ? currentLatitude : 67.0011,
                        latitudeDelta,
                        longitudeDelta
                    }}
                >



                    <Marker
                        coordinate={userLocation}
                    // ref={markerRef}
                    >
                        <MaterialCommunityIcons name="map-marker" size={50} color="#00238b" />
                        {/* <Callout tooltip={false} >
                            <Text>User</Text>
                        </Callout> */}
                    </Marker>

                    <Marker
                        // coordinate={receiverLocation}
                        coordinate={{ latitude: 24.8607, longitude: 67.0011 }}

                    // ref={markerRef}
                    >
                        <FontAwesome5 name="biking" size={30} color="#00238b" />
                        {/* <Callout tooltip={false} >
                            <Text>Rider</Text>
                        </Callout> */}
                    </Marker>



                    <Polyline
                        coordinates={[
                            userLocation,
                            // receiverLocation,
                            { latitude: 24.8607, longitude: 67.0011 }
                        ]}
                        strokeColor="navy"
                        strokeWidth={3}
                        geodesic={true}
                    />

                </MapView>

            </Content>
        </Container>

    );
}

const styles = StyleSheet.create({
    cardView: {
        paddingHorizontal: 10,
        marginTop: -15,
    }
})
export default Map;