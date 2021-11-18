import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
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

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({navigation}) => {
  const [curUserToken, setCurUserToken] = useState('');
  const [curUserName, setCurUserName] = useState('');

  return (
    <View style={styles.homeScreen}>
      <Text style={styles.text}>Click the button to sign out</Text>
      <TouchableOpacity style={styles.btn}>
        <Button
          color="pink"
          title="Sign-Out"
          onPress={() => {
            auth()
              .signOut()
              .then(() => console.log('User signed out!'));
            // AsyncStorage.setItem('token', null).then(e =>
            //   console.log('storeToken error occurred: ', e),
            // );
            // AsyncStorage.setItem('username', null).then(e => {
            //   console.log('storeName error occurred: ', e);
            // });
          }}></Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 100,
    width: 220,
    margin: 30,
    fontSize: 30,
  },
});

export default Logout;
