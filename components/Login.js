import React, {useState, useContext, useEffect} from 'react';
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
import UserTimeline from './UserTimeline';

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

    // const user = firebase.auth().currentUser;
    // console.log(user);
    // setCurUserName(user.displayName);
  }

  //console.log(curUserName, curUserToken);

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
          // setCurUserToken(usertoken);
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
    <View>
      <View style={styles.homeScreen}>
        <Text style={styles.text}>You have to log in to continue</Text>
        <TouchableOpacity style={styles.btn}>
          <Button
            color="pink"
            title="Facebook Sign-In"
            onPress={() => {
              onFacebookButtonPress().then(() =>
                console.log('Signed in with Facebook!'),
              );

              setData();
            }}></Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,

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
