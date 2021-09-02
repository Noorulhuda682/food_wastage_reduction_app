import React, { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Container,
  Content,
} from 'native-base';
import { useSelector } from 'react-redux';
import { useQuery, useSubscription } from '@apollo/client';
import { POSTS, POST_ADDED } from '../typeDefs/Post';
import PostCard from '../shared/PostCard';
import Header from '../shared/Header';
import { SearchBar } from '../shared/index';
let NEW_LIST = null;

const NewOrders = ({ navigation }) => {
  const storeData = useSelector(state => state);
  const [searchValue, setSearchValue] = useState('');
  const [posts, setPosts] = useState(null);
  const [searchList, setSearchList] = useState([]);
  const subscriptionPosts = useSubscription(POST_ADDED);

  let payload = { status: 'NEW' };
  if (storeData.user.role === 'USER') payload.userId = storeData.user._id;
  const { loading, error, data } = useQuery(POSTS, {
    variables: payload,
  });

  useEffect(() => {
    setSearchList(
      posts !== null &&
      posts.filter(item =>
        item.title.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );
  }, [searchValue]);

  //  FOR QUERY DATA
  useEffect(() => {
    if (data && data.posts) {
      setPosts(data.posts);
    }
  }, [data]);

  //  FOR SUBSCRIPTION DATA
  useEffect(() => {
    if (subscriptionPosts.data && subscriptionPosts.data.postAdded) {
      NEW_LIST = subscriptionPosts.data.postAdded.filter(post => post.status === "NEW")
      setPosts(subscriptionPosts.data.postAdded);
    }
  }, [subscriptionPosts]);

  if (error) Alert.alert(`Error! ${error.message}`);

  // console.log('DAA====>', posts?.length); 
  return (
    <Container>
      <Header navigation={navigation} title="New Orders" />
      <View style={{ padding: 12 }}>
        <SearchBar type="post" value={searchValue} onChange={setSearchValue} />
      </View>

      <Content style={styles.mainContent} padder>


        {loading && <ActivityIndicator color="blue" />}

        {((!loading && posts?.length === 0) ||
          (searchValue !== '' && searchList?.length === 0)) && (
            <Text style={styles.noData}>No data found!</Text>
          )}

        {posts?.length !== 0 && NEW_LIST?.length === 0 && <Text style={styles.noData}>No data found!</Text>}

        {searchValue === '' &&
          posts?.map((foodPost, key) => {
            if (foodPost.status === 'NEW') {
              if (storeData.user.role === 'USER') {
                return (
                  storeData.user._id === foodPost.userId && (
                    <PostCard
                      navigation={navigation}
                      foodPost={foodPost}
                      keyInd={key}
                      routeName={"newOrders"}
                      key={key}
                    />
                  )
                );
              } else {
                return (
                  <PostCard
                    navigation={navigation}
                    foodPost={foodPost}
                    keyInd={key}
                    routeName={"newOrders"}
                    key={key}
                  />
                );
              }
            }
          })}

        {searchList &&
          searchList?.map((foodPost, key) => (
            <PostCard
              navigation={navigation}
              foodPost={foodPost}
              keyInd={key}
              routeName={"newOrders"}
              key={key}
            />
          ))}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    marginTop: -15,
    textAlign: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 35,
    color: '#00203FFF',
    // textAlign:"center"
  },
  para: {
    fontSize: 16,
    paddingLeft: 5,
    color: '#00203FFF',
    paddingBottom: 20,
  },
  headContent: {
    paddingTop: 20,
    height: 100,
    backgroundColor: '#adcfe6',
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,

    elevation: 7,
  },
  noData: {
    color: 'gray',
    textAlign: 'center'
  }
});
export default NewOrders;
