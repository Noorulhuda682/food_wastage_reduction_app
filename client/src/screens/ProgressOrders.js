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
let PROGRESS_LIST = null;

const ProgressOrders = ({ navigation }) => {
  const storeData = useSelector(state => state);
  const [searchValue, setSearchValue] = useState('');
  const [posts, setPosts] = useState(null);
  const [searchList, setSearchList] = useState([]);
  const subscriptionPosts = useSubscription(POST_ADDED);

  let payload = { status: "PROGRESS" };
  if (storeData.user.role === 'USER') payload.userId = storeData.user._id;
  if (storeData.user.role === 'RECEIVER') payload.receiverId = storeData.user._id;

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
      PROGRESS_LIST = subscriptionPosts.data.postAdded.filter(post => post.status === "PROGRESS")
      setPosts(subscriptionPosts.data.postAdded);
    }
  }, [subscriptionPosts]);

  if (error) Alert.alert(`Error! ${error.message}`);

  // console.log('DAA', posts?.length);
  return (
    <Container>
      <Header navigation={navigation} title="Progress Orders" />
      <View style={{ padding: 12 }}>
        <SearchBar type="post" value={searchValue} onChange={setSearchValue} />
      </View>
      <Content style={styles.mainContent} padder>
        {loading && <ActivityIndicator color="blue" />}

        {((!loading && posts?.length === 0) ||
          (searchValue !== '' && searchList?.length === 0)) && (
            <Text style={styles.noData}>No data found!</Text>
          )}

        {posts?.length !== 0 && PROGRESS_LIST?.length === 0 && <Text style={styles.noData}>No data found!</Text>}
        {searchValue === '' &&
          posts?.map((foodPost, index) => {
            if (foodPost.status === 'PROGRESS') {
              if (storeData.user.role === 'USER') {
                return (
                  storeData.user._id === foodPost.userId && (
                    <PostCard
                      navigation={navigation}
                      foodPost={foodPost}
                      keyInd={index}
                      routeName="progressOrders"
                    />
                  )
                );
              }
              if (storeData.user.role === 'RECEIVER') {
                return (
                  storeData.user._id === foodPost.receiverId && (
                    <PostCard
                      navigation={navigation}
                      foodPost={foodPost}
                      keyInd={index}
                      routeName="progressOrders"
                    />
                  )
                );
              } else {
                return (
                  <PostCard
                    navigation={navigation}
                    foodPost={foodPost}
                    keyInd={index}
                    routeName="progressOrders"
                  />
                );
              }
            }
          })}

        {searchList &&
          searchList?.map((foodPost, index) => (
            <PostCard
              navigation={navigation}
              foodPost={foodPost}
              keyInd={index}
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
export default ProgressOrders;


