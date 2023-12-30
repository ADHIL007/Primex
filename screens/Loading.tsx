import React from 'react';
import { ActivityIndicator, StyleSheet, View, Image, Text } from 'react-native';

const ActivityIndicatorComponent = ({ text }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="green" />
    <Image source={require('../assets/gifs/signup.gif')} style={styles.image} />
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 20,
    width: 150, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    resizeMode: 'contain',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default ActivityIndicatorComponent;
