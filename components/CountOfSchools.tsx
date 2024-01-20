import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getData } from '../screens/AsyncStorage';
import store from '../Redux/Store';

const CountOfSchools = () => {


  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Backgrounds/school.jpg')}
        style={styles.bannerImage}
      />
      <View style={styles.adminContainer}>
        <MaterialCommunityIcons name="account" color="#fff" size={24} />
        <Text style={styles.adminText}>Admin</Text>
      </View>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.text}>{store.getState().SCHOOL_COUNT}</Text>
          <Text style={styles.schoolText}>Schools</Text>
        </View>
      </View>
    </View>
  );
};

export default CountOfSchools;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  adminContainer: {
    position: 'absolute',
    top: 20,
    left: 20, // Adjust the left position as needed
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 20,
  },
  adminText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 5,
  },
  circleContainer: {
    position: 'absolute',
    top: 100,
    alignItems: 'center',
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Add elevation for a shadow effect
  },
  text: {
    color: '#333',
    fontSize: 50,
    fontWeight: 'bold',
  },
  schoolText: {
    color: '#333',
    fontSize: 16,
    marginBottom: 5,
  },
});
