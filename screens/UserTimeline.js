import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';

import Header from '../components/Header';

import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';

const UserTimeLine = () => {
  const faChevronCircleDown = parseIconFromClassName(
    'fas fa-chevron-circle-down',
  );
  const [currentIndex, setCurrentIndex] = useState(null);
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    fetch('http://10.0.2.2:8000/api/posts')
      .then(response => response.json())
      .then(posts => {
        console.log(JSON.stringify(posts));
        setPosts(posts);
        return posts;
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    // <View style={styles.container}>
    //   <Header title="Your Timeline" />
    //   <FlatList data={post} renderItem={({item}) => <PostItem item={item} />} />
    // </View>
    <View style={styles.container}>
      <Header title="Your Timeline" />
      <Button onPress={getAllPosts} title="Press me" color="#f194ff" />
      {posts.map(({id, name, text, location}, index) => {
        return (
          <TouchableOpacity
            key={id}
            onPress={() => {
              setCurrentIndex(index === currentIndex ? null : index);
            }}
            style={styles.postCard}
            activeOpacity={0.85}>
            <View style={[styles.card]}>
              <View style={styles.title}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.location}>{location}</Text>
                <FontAwesome style={styles.icon} icon={faChevronCircleDown} />
              </View>
              {index === currentIndex && (
                <View style={styles.textContainer}>
                  <Text style={[styles.text]}>{text}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    color: 'black',
    fontSize: 30,
  },
  postCard: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: -2,
  },
  location: {
    fontSize: 18,
    //fontWeight: '600',
    textTransform: 'lowercase',
    letterSpacing: -2,
    alignSelf: 'center',
    marginLeft: 12,
  },
  textContainer: {
    borderBottomColor: '#f194ff',
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 24,
    lineHeight: 20 * 1.5,
    textAlign: 'center',
    // color: 'white',
  },
  icon: {
    fontSize: 20,
    color: '#f194ff',
    padding: 2,
    alignSelf: 'center',
    marginLeft: 12,
  },
  title: {
    flexDirection: 'row',
  },
});

export default UserTimeLine;
