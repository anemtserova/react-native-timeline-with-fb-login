import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const FbButton = ({buttonTitle, color}) => {
  return (
    <View style={styles.button}>
      <Button title={buttonTitle} color={color}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 220,
    margin: 15,
    //backgroundColor: 'red',
  },
  btn: {
    height: 100,
    width: 220,
  },
});

export default FbButton;
