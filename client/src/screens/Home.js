import React from 'react';
import {
    View,
    Text, Dimensions,
    StyleSheet,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title, Content,
    Card, CardItem, H2, Footer,
    Fab
    // Text
} from 'native-base';
const { width, height } = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

const Home = ({ navigation }) => {
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
                        <Card style={styles.card}>
                            <CardItem header button >
                                <H2 style={{}}>Header</H2>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>
                                        //Your text here
                                   </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.card}>
                            <CardItem header button >
                                <H2 style={{}}>Header</H2>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>
                                        //Your text here
                                   </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.card}>
                            <CardItem header button >
                                <H2 style={{}}>Header</H2>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>
                                        //Your text here
                                   </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.card}>
                            <CardItem header button >
                                <H2 style={{}}>Header</H2>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>
                                        //Your text here
                                   </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Content>

                {/* <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{ flex: 1, height: SCREEN_HEIGHT }}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                        image={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiB-bRDmzoE5zTM3sEhBjygRx8IA0XwHgvnQ&usqp=CAU' }}
                    />
                </MapView> */}
            </Content>
            <Footer style={{backgroundColor:"white"}}>
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
        fontSize: 35,
        color: "#00203FFF"
        // textAlign:"center"
    },
    para: {
        fontSize: 16,
        paddingLeft: 5,
        color: "#00203FFF",
        paddingBottom:20
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