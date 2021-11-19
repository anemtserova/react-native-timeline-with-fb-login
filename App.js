import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './components/Login';
import UserTimeline from './components/UserTimeline';
import Logout from './components/Logout';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Login} />
        <Stack.Screen name="Timeline" component={UserTimeline} />
        <Stack.Screen name="Logout" component={Logout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
