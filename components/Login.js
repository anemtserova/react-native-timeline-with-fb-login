import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
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
import UserTimeline from './UserTimeline';
import {faRubleSign} from '@fortawesome/free-solid-svg-icons';

const Login = ({navigation}) => {
  const [curUserToken, setCurUserToken] = useState(null);
  const [curUserName, setCurUserName] = useState('');

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    //console.log('result', result);
    if (result.isCancelled) {
      navigation.navigate('Home');
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

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  const setData = async () => {
    try {
      const token = await AsyncStorage.setItem('token', curUserToken);
      navigation.navigate('Timeline');
      if (token !== null) {
        setUserToken(token);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      await AsyncStorage.getItem('token').then(usertoken => {
        if (usertoken != null) {
          setCurUserToken(usertoken);
          navigation.navigate('Timeline');
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log('login usertoken', curUserToken);

  return (
    <View style={styles.homeScreen}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={require('../img/balloons.png')} />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.text}>Sign in to continue</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          onFacebookButtonPress().then(() =>
            console.log('Signed in with Facebook!'),
          );
          setData();
        }}
        style={styles.btnBox}>
        <Text style={styles.textBtn}>Facebook Sign-In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    flexDirection: 'column',

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(235, 251, 255)',
  },
  btnBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 205,
    height: 70,
    marginTop: 20,
    backgroundColor: 'rgb(0, 147, 184)',
    borderRadius: 8,
  },
  textBox: {
    marginBottom: 15,
  },
  text: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '700',
    color: 'rgb(0, 147, 184)',
  },
  textBtn: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  img: {
    width: 300,
    height: 300,
  },
  imgContainer: {
    marginBottom: 55,
  },
});

export default Login;
