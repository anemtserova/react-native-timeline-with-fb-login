import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';

import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';
import Header from '../components/Header';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserTimeline = ({navigation}) => {
  const faChevronCircleDown = parseIconFromClassName(
    'fas fa-chevron-circle-down',
  );
  const [currentIndex, setCurrentIndex] = useState(null);
  const [posts, setPosts] = useState([]);

  const [userToken, setUserToken] = useState(null);
  const user = firebase.auth().currentUser;

  useEffect(() => {
    fetch('http://10.0.2.2:8000/api/posts')
      .then(response => response.json())
      .then(posts => {
        //console.log(JSON.stringify(posts));
        setPosts(posts);
        return posts;
      })
      .catch(error => {
        console.error(error);
      });

    getData();
  }, []);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        return setUserToken(token);
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log('userToken', userToken);

  const Post = ({id, name, text, location}) => {
    return (
      <View>
        <TouchableOpacity
          key={id}
          onPress={() => {
            setCurrentIndex(id === currentIndex ? null : id);
          }}
          style={styles.postCard}
          activeOpacity={0.85}>
          <View style={styles.card}>
            <View style={styles.title}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.location}>{location}</Text>
            </View>
            <View>
              <FontAwesome style={styles.icon} icon={faChevronCircleDown} />
            </View>
          </View>
          {id === currentIndex && (
            <View style={styles.textContainer}>
              <Text style={styles.text}>{text}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <Post
          id={item.id}
          name={item.name}
          text={item.text}
          location={item.location}
          index={index}
          key={item.id}
        />
      </View>
    );
  };
  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const clearData = async () => {
    try {
      await AsyncStorage.clear();
      setUserToken(null);
      navigation.navigate('Home');
      // auth()
      //   .signOut()
      //   .then(() => console.log('User signed out!'));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      {user.displayName ? <Header title={user.displayName} /> : null}

      <View style={styles.listContainer}>
        <FlatList data={posts} renderItem={renderItem} />
        <TouchableOpacity onPress={clearData} style={styles.btn}>
          <Text style={styles.textBtn}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.btnContainer}>
        <TouchableOpacity onPress={clearData} style={styles.btn}>
          <Text style={styles.textBtn}>Sign Out</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(235, 251, 255)',
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    color: 'black',
    fontSize: 30,
  },
  postCard: {
    flexGrow: 1,
    marginBottom: 15,
    marginTop: 15,
    padding: 15,
    width: 320,
    borderBottomWidth: 2,
    // borderRadius: 6,
    // borderStyle: 'solid',
    borderColor: 'rgb(194, 243, 255)',
    // backgroundColor: 'rgb(255, 170, 51)',
  },
  card: {
    flexGrow: 1,
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 28,
    fontWeight: '600',
    textTransform: 'lowercase',
    letterSpacing: -2,
    alignSelf: 'flex-start',
    color: 'rgb(255, 153, 10)',
  },
  location: {
    fontSize: 18,
    //fontWeight: '600',
    textTransform: 'lowercase',

    alignSelf: 'center',
    marginLeft: 12,
    alignSelf: 'flex-start',
    color: 'rgb(0, 180, 224)',
  },
  textContainer: {
    padding: 18,
  },
  text: {
    fontSize: 24,
    lineHeight: 20 * 1.5,
    textAlign: 'justify',
    color: 'rgb(0, 180, 224)',
  },
  icon: {
    fontSize: 25,
    color: 'rgb(255, 153, 10)',
    padding: 2,
    alignSelf: 'center',
    marginLeft: 12,
  },
  title: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  btn: {
    padding: 5,
    margin: 15,
    width: 105,
    height: 35,
    backgroundColor: 'rgb(0, 147, 184)',
    borderRadius: 6,
  },
  textBtn: {
    textAlign: 'center',
    color: 'white',
    textTransform: 'uppercase',
    paddingTop: 3,
  },
});

export default UserTimeline;
