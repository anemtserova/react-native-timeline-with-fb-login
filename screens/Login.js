import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
import AuthProvider from '../providers/AuthProvider';

const {fbLogin} = useContext(AuthProvider);

const Login = ({navigation}) => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  return (
    <View>
      <FbButton
        buttonTitle="Sign in with Facebook"
        buttonType="facebook"
        color="black"
        backgroundColor="blue"
        onPress={() => fbLogin()}
      />
    </View>
  );
};
