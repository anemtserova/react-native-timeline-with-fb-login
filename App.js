import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import Header from './components/Header';
import PostItem from './components/PostItem';

import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [post, setPost] = useState([
    {
      id: 1,
      bg: '#A8DDE9',
      color: '#3F5B98',
      username: 'stella_doro',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed tempus urna et pharetra pharetra massa massa ultricies.',
    },

    {
      id: 2,
      bg: '#A8DDE9',
      color: '#3F5B98',
      username: 'monika25',
      text: 'Elementum integer enim neque volutpat ac tincidunt vitae. Amet aliquam id diam maecenas ultricies mi. Sagittis id consectetur purus ut faucibus pulvinar. Vestibulum mattis ullamcorper velit sed ullamcorper.',
    },

    {
      id: 3,
      bg: '#A8DDE9',
      color: '#3F5B98',
      username: 'venera han',
      text: 'Augue neque gravida in fermentum et. Varius sit amet mattis vulputate. Tortor consequat id porta nibh venenatis cras sed felis. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis.',
    },

    {
      id: 4,
      bg: '#A8DDE9',
      color: '#3F5B98',
      username: 'boy_vs_world',
      text: 'Diam quam nulla porttitor massa id neque aliquam vestibulum. Sagittis id consectetur purus ut. Tincidunt lobortis feugiat vivamus at augue eget. Ipsum dolor sit amet consectetur. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Posuere morbi leo urna molestie at elementum eu.',
    },
    {
      id: 5,
      bg: '#A8DDE9',
      color: '#3F5B98',
      username: 'doyle',
      text: 'Tincidunt lobortis feugiat vivamus at augue eget. Ipsum dolor sit amet consectetur. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Posuere morbi leo urna molestie at elementum eu. ',
    },
  ]);

  return (
    // <View style={styles.container}>
    //   <Header title="Your Timeline" />
    //   <FlatList data={post} renderItem={({item}) => <PostItem item={item} />} />
    // </View>
    <View style={styles.container}>
      <Header title="Your Timeline" />
      {post.map(({id, bg, color, username, text}, index) => {
        return (
          <TouchableOpacity
            key={id}
            onPress={() => {
              setCurrentIndex(index === currentIndex ? null : index);
            }}
            style={styles.postCard}
            activeOpacity={0.85}>
            <View style={[styles.card, {backgroundColor: bg}]}>
              <Text style={styles.name}>{username}</Text>
              {index === currentIndex && (
                <View style={styles.textContainer}>
                  <Text style={[styles.text, {color}]}>{text}</Text>
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
    fontSize: 44,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: -2,
  },
  textContainer: {
    borderBottomColor: 'darkslateblue',
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 24,
    lineHeight: 20 * 1.5,
    textAlign: 'center',
    // color: 'white',
  },
});

export default App;
