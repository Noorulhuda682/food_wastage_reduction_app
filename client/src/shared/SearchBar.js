import React from 'react';
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

const SearchBar = ({ navigation, value, type, onChange }) => {
    return (
        <Item style={{
            marginBottom: 10, paddingHorizontal: 15,
            backgroundColor: "#e6e8ff", borderRadius: 5,
        }}>
            <Icon name="ios-search" style={{ color: "#1e319d" }} />
            <Input
                placeholder="Search by name"
                value={value}
                onChangeText={(newValue) => { onChange(newValue) }}
            />
            {/* {type === "post" ?
                <MaterialCommunityIcons name="post-outline" size={24} color="#1e319d" />
                :
                <Icon name="ios-people" style={{ color: "#1e319d" }} />
            } */}
        </Item>
    );
}

const styles = StyleSheet.create({


})
export default SearchBar;