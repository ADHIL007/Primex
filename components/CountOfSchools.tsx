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
        <View style={styles.circle}>
          {/* Display school count */}
          <Text style={styles.text}>{schoolCount}</Text>
          <Text style={styles.schoolText}>Schools</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 18,
    marginLeft: 5,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    height:220,
    width:220,
    borderRadius:125,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderColor:'#1e272e',
    marginTop: 20,
  },
  text: {
    color: '#1e272e', // Change text color to white
    fontSize: RFPercentage(13.5),

  },
  schoolText: {
    color: '#1e272e', // Change text color to white
    fontSize: RFPercentage(4.5),
    marginTop: 5, // Adjust margin for better spacing
  },
});

export default CountOfSchools;
