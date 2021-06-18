import React, { useEffect, useState } from 'react';
import {
    View,
    Text, Dimensions,
    StyleSheet, Image, ActivityIndicator
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    Container, Left, Body, Right, Button, Icon, Title, Content, Item, Input
} from 'native-base';
import { useQuery } from "@apollo/client";
import Header from "../shared/Header"
import { POSTS } from "../typeDefs/Post"
import PostCard from "../shared/PostCard"
import { SearchBar } from '../shared/index';

const AllPosts = ({ navigation }) => {
    const [searchValue, setSearchValue] = useState("")
    const { loading, error, data } = useQuery(POSTS);

    return (
        <Container>
            <Header navigation={navigation} title="All Posts" />
            <View style={{ padding: 12 }}>
                <SearchBar
                    type="receivers"
                    value={searchValue}
                    onChange={setSearchValue}
                />
            </View>
            <Content style={styles.mainContent} padder>



                {loading &&
                    <ActivityIndicator color="blue" />
                }

                {data?.posts.map((foodPost, key) => <PostCard foodPost={foodPost} key={key} />
                )}

                {!loading && !data.posts.length &&
                    <Text style={styles.noDataText}>No data found!</Text>
                }


            </Content>
        </Container>

    );
}

const styles = StyleSheet.create({
    mainContent: {
        marginTop:-15,
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
    },
    noDataText:{
        
    }

})
export default AllPosts;