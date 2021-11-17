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

function HomeScreen({navigation}) {
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    console.log('result', result);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    console.log('faceboook token:', facebookCredential.token);
    // Sign-in the user with the credential
    auth().signInWithCredential(facebookCredential);
    const user = firebase.auth().currentUser;
    console.log('user', user);
    return user;
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Facebook Sign-In"
        onPress={() =>
          onFacebookButtonPress().then(() =>
            console.log('Signed in with Facebook!'),
          )
        }></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 100,
    width: 220,
  },
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

export default HomeScreen;
