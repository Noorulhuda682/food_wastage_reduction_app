import React,{useEffect} from 'react';
import {
    View,
    Text, Dimensions,
    StyleSheet, Image,
    Alert
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import {
    Container, Header, Left, Body, Right, Button, Icon, Title, Content,
    Card, CardItem, H2, Footer, Thumbnail,
    Fab
    // Text
} from 'native-base';
import messaging from '@react-native-firebase/messaging';
const { width, height } = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

const Home = ({ navigation }) => {

    const getTokens = async () => {
        let token = await messaging().getToken();
        console.log("token",token);
    }
 
    useEffect( ()  =>  {
        getTokens();
        messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
            console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
        });

        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log("onNotificationOpenedApp: ", JSON.stringify(remoteMessage));
        })

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
            <Header style={{ backgroundColor: "#00203FFF" }}>
                <Left>
                    <Button transparent onPress={() => navigation.openDrawer()}>
                        <Icon name='menu' />
                    </Button>

                </Left>
                <Body>
                    <Title>Home</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
                    </Button>
                </Right>
            </Header>
            <Content style={styles.mainContent} padder>
                <Content padder style={{ backgroundColor: "" }}>
                    <Text style={styles.heading}>Safe Wasting Food</Text>
                    <Text style={styles.para}>
                        Reducing the wastage of food can boot economy of a country
                     </Text>
                    <Content>
                        <Card>
                            <CardItem>
                                <Left>
                                    {/* <Thumbnail source={require('../assets/images/profile.jpg')} />
                                 */}
                                    <Body>
                                        {/* <Text>NativeBase</Text>
                                        <Text note>GeekyAnts</Text> */}
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Food Items </Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={require('../assets/images/foods.jpeg')} style={{ height: 150, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="thumbs-up" />
                                        <Text>12 Likes</Text>
                                    </Button>
                                </Left>
                                <Body>
                                    <Button transparent>
                                        <Icon active name="chatbubbles" />
                                        <Text>4 Comments</Text>
                                    </Button>
                                </Body>
                                <Right>
                                    <Text>11h ago</Text>
                                </Right>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem>
                                <Left>
                                    {/* <Thumbnail source={require('../assets/images/profile.jpg')} />
                                 */}
                                    <Body>
                                        {/* <Text>NativeBase</Text>
                                        <Text note>GeekyAnts</Text> */}
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Distribution Locations</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={require('../assets/images/location.jpg')} style={{ height: 150, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="thumbs-up" />
                                        <Text>12 Likes</Text>
                                    </Button>
                                </Left>
                                <Body>
                                    <Button transparent>
                                        <Icon active name="chatbubbles" />
                                        <Text>4 Comments</Text>
                                    </Button>
                                </Body>
                                <Right>
                                    <Text>11h ago</Text>
                                </Right>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem>
                                <Left>
                                    {/* <Thumbnail source={require('../assets/images/profile.jpg')} />
                                 */}
                                    <Body>
                                        {/* <Text>NativeBase</Text>
                                        <Text note>GeekyAnts</Text> */}
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Distribution Per Family</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={require('../assets/images/distribution.jpg')} style={{ height: 150, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="thumbs-up" />
                                        <Text>12 Likes</Text>
                                    </Button>
                                </Left>
                                <Body>
                                    <Button transparent>
                                        <Icon active name="chatbubbles" />
                                        <Text>4 Comments</Text>
                                    </Button>
                                </Body>
                                <Right>
                                    <Text>11h ago</Text>
                                </Right>
                            </CardItem>
                        </Card>





                    </Content>
                </Content>


            </Content>
            <Footer style={{ backgroundColor: "white" }}>
                <Fab
                    active={true}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: "#00203FFF" }}
                    position="bottomRight"
                // onPress={() => this.setState({ active: !this.state.active })}
                >
                    <Icon name="share" />
                    {/* <Button style={{ backgroundColor: '#34A34F' }}>
                        <Icon name="logo-whatsapp" />
                    </Button>
                    <Button style={{ backgroundColor: '#3B5998' }}>
                        <Icon name="logo-facebook" />
                    </Button>
                    <Button disabled style={{ backgroundColor: '#DD5144' }}>
                        <Icon name="mail" />
                    </Button> */}
                </Fab>
            </Footer>
        </Container>

    );
}

const styles = StyleSheet.create({
    mainContent: {
        //  paddingTop:20
    },
    heading: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#00203FFF",
        // textAlign:"center"
    },
    para: {
        fontSize: 13,
        paddingLeft: 5,
        color: "#00203FFF",
        paddingBottom: 20
    },
    headContent: {
        paddingTop: 20,
        height: 100,
        backgroundColor: '#adcfe6',
    },
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,

        elevation: 7,
    }

})
export default Home;