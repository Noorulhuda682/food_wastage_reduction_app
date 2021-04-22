import React from 'react';
import {
    View,
    Text, Dimensions,
    StyleSheet,Image
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title, Content,
    Card, CardItem, H2, Footer,Thumbnail,
    Fab
    // Text
} from 'native-base';
const { width, height } = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width

const AllPosts = ({ navigation }) => {
    return (
        <Container>
            <Header style={{ backgroundColor: "#00203FFF" }}>
                <Left>
                    <Button transparent onPress={() => navigation.openDrawer()}>
                        <Icon name='menu' />
                    </Button>

                </Left>
                <Body>
                    <Title>All Posts</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
                    </Button>
                </Right>
            </Header>
            <Content style={styles.mainContent} padder>
                <Content padder style={{ backgroundColor: "" }}>
                    <Content>
                        <Card>
                            <CardItem>
                                <Left>
                                <Thumbnail source={require('../assets/images/profile.jpg')} />
                                    <Body>
                                        <Text >by ajaz</Text>
                                        <Text style={{fontWeight:"bold",fontSize:20}} note>Biryani</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={require('../assets/images/foods.jpeg')} style={{ height: 130, width: null, flex: 1 }} />
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
                                <Thumbnail source={require('../assets/images/profile.jpg')} />
                                    <Body>
                                        <Text >by darius</Text>
                                        <Text style={{fontWeight:"bold",fontSize:20}} note>Biryani</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={require('../assets/images/foods.jpeg')} style={{ height: 130, width: null, flex: 1 }} />
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
                                <Thumbnail source={require('../assets/images/profile.jpg')} />
                                    <Body>
                                        <Text >by noor</Text>
                                        <Text style={{fontWeight:"bold",fontSize:20}} note>Biryani</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={require('../assets/images/foods.jpeg')} style={{ height: 130, width: null, flex: 1 }} />
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
export default AllPosts;