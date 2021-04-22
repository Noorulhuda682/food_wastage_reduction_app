import React from 'react';
import {
    View,
    Text, Dimensions,
    StyleSheet, Image
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title, Content,
    Card, CardItem, H2, Footer, Thumbnail, List, ListItem,
    // Text
} from 'native-base';
const { width, height } = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

const Map = ({ navigation }) => {
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
            <Content >
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{
                        flex: 1,
                        height: 390
                    }}
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
                </MapView>
                <List>
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