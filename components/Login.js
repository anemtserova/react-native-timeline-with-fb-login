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

const Login = ({navigation}) => {
  const [curUserToken, setCurUserToken] = useState('');
  const [curUserName, setCurUserName] = useState('');

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    //console.log('result', result);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    console.log('token from data', data.accessToken);
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    setCurUserToken(facebookCredential.token);
    //console.log('faceboook token:', facebookCredential.token);
    // try {
    // const userData = JSON.stringify(data);
    // AsyncStorage.setItem('token', userData);
    //   );
    // } catch (e) {
    //   console.log('storeToken error occurred: ', e);
    // }
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);

    // const user = firebase.auth().currentUser;
    // console.log(user);
    // setCurUserName(user.displayName);

    // try {
    //   await AsyncStorage.setItem('username', JSON.stringify(user.displayName));
    // } catch (e) {
    //   console.log('storeName error occurred: ', e);
    // }
  }

  //console.log(curUserName, curUserToken);

  // const storeToken = async curUserToken => {
  //   try {
  //     const token = await AsyncStorage.setItem('token', curUserToken);
  //     return token != null ? JSON.parse(token) : null;
  //   } catch (e) {
  //     console.log('storeToken error occurred: ', e);
  //   }
  // };

  // const storeName = async curUserName => {
  //   try {
  //     const username = await AsyncStorage.setItem('username', curUserName);
  //     return username != null ? JSON.parse(username) : null;
  //   } catch (e) {
  //     console.log('storeName error occurred: ', e);
  //   }
  // };
  AsyncStorage.setItem('token', curUserToken);

  return (
    <View style={styles.homeScreen}>
      <Text style={styles.text}>You have to log in to continue</Text>
      <TouchableOpacity style={styles.btn}>
        <Button
          color="pink"
          title="Facebook Sign-In"
          onPress={() => {
            onFacebookButtonPress()
              .then(() => console.log('Signed in with Facebook!'))
              .then(() => navigation.navigate('Timeline'));
            // storeToken();
            // storeName();
            // console.log(
            //   'username and token:',
            //   AsyncStorage.getItem('username'),
            //   AsyncStorage.getItem('token'),
            // );
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
  text: {
    marginBottom: 15,
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

export default Login;
