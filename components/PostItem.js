import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';

const PostItem = ({item}) => {
  const faChevronCircleDown = parseIconFromClassName(
    'fas fa-chevron-circle-down',
  );
  return (
    <TouchableOpacity style={styles.postItem}>
      <View style={styles.postItemView}>
        <Text style={styles.postItemText}>{item.text}</Text>

        <FontAwesome style={styles.icon} icon={faChevronCircleDown} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postItem: {
    padding: 15,
    backgroundColor: 'yellow',
    borderBottomWidth: 1,
    borderColor: 'darkgray',
  },
  postItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postItemText: {
    fontSize: 25,
    color: 'darkslateblue',
  },
  icon: {
    fontSize: 20,
    color: 'red',
    padding: 2,
  },
});

export default PostItem;
