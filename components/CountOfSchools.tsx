import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import store from '../Redux/Store';
import { RFPercentage } from 'react-native-responsive-fontsize';

const CountOfSchools = () => {
  // Access the SCHOOL_COUNT directly from the Redux store
  const schoolCount = store.getState().SCHOOL_COUNT;

  return (
    <View style={styles.container}>
      {/* Admin container */}
      <View style={styles.adminContainer}>
        <MaterialCommunityIcons name="account" color="#fff" size={24} />
        <Text style={styles.adminText}>Admin</Text>
      </View>
      {/* Circle container */}
      <View style={styles.circleContainer}>
        {/* Left semicircle */}
        <View style={styles.semicircleContainer}></View>
        {/* Circle */}
        <View style={styles.circle}>
          {/* Display school count */}
          <Text style={styles.text}>{schoolCount}</Text>
          <Text style={styles.schoolText}>Schools</Text>
        </View>
        {/* Right semicircle */}
        <View style={styles.semicircleContainer}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    height: 200,
    borderColor: '#1e272e',
  },
  majorcircleContainer:{
    display:'flex',
    flexDirection:'row',

  },
  semicircleContainer:{
    height:80,
    width:80,
    borderRadius:125,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:0.5,
    borderColor:'#1e272e',
    marginHorizontal: 10, // Add margin horizontally
    marginTop: 90,
  },
  adminContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e272e',
    padding: 10,
    borderRadius: 20,
    zIndex: 1, // Ensure admin container is above the circle container
  },
  adminText: {
    color: '#fff',
    fontSize: RFPercentage(2.5),
    marginLeft: 5,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', // Align items horizontally
  },
  circle: {
    height:160,
    width:160,
    borderRadius:125,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:0.5,
    borderColor:'#1e272e',
    marginTop: 20,
  },
  text: {
    color: '#1e272e', // Change text color to white
    fontSize: RFPercentage(10.5),
    fontFamily: 'Railway',
  },
  schoolText: {
    color: '#1e272e', // Change text color to white
    fontSize: RFPercentage(3),
  },
});

export default CountOfSchools;
