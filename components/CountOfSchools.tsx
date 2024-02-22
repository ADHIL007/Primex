import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import store from '../Redux/Store';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { getData } from '../screens/AsyncStorage';

const CountOfSchools = () => {
  const [staffs, setStaffs] = useState(null);

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const staffsData = await getData('TOTALSTAFFS');
        setStaffs(staffsData);
      } catch (error) {
        console.error('Error fetching staffs:', error);
      }
    };

    fetchStaffs();
  }, []);

  // Access the SCHOOL_COUNT directly from the Redux store
  const schoolCount = store.getState().SCHOOL_COUNT;

  return (
    <View style={styles.container}>
      {/* Admin container */}
      <View style={styles.adminContainer}>
        <MaterialCommunityIcons name="account" color="#1e272e" size={24} />
        <Text style={styles.adminText}>Admin</Text>
      </View>
      {/* Circle container */}
      <View style={styles.circleContainer}>
        {/* Left semicircle */}
        <View style={styles.semicircleContainer}>
          <Text style={styles.smalltext}>4</Text>
          <Text style={styles.smalltextlabel}>Regions</Text>
        </View>
        {/* Circle */}
        <View style={styles.circle}>
          {/* Display school count */}
          <Text style={styles.text}>{schoolCount}</Text>
          <Text style={styles.schoolText}>Schools</Text>
        </View>
        {/* Right semicircle */}
        <View style={styles.semicircleContainer}>
        <Text style={styles.smalltext}>{staffs}</Text>
          <Text style={styles.smalltextlabel}>Staffs</Text>
        </View>
      </View>
      <View style={styles.line}></View>
    </View>
  );
};

const styles = StyleSheet.create({
line:{
  width: '60%',
  height: 6,
  borderRadius: 5,
  marginTop: 60,
  backgroundColor: '#fff',
},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    backgroundColor: '#1e272e',
    marginTop: 10,
  },
  majorcircleContainer:{
    display:'flex',
    flexDirection:'row',
   backgroundColor: '#fff',
  },
  smalltext:{
    color: '#1e272e', // Change text color to white
    fontSize: RFPercentage(4),
    fontFamily: 'Railway',
  },
  smalltextlabel:{
    color: '#1e272e', // Change text color to white
    fontSize: RFPercentage(2),
    fontFamily: 'Railway',
  },
  semicircleContainer:{
    height:80,
    width:80,
    borderRadius:125,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:0.5,

    marginHorizontal: 10, // Add margin horizontally
    marginTop: 135,
    backgroundColor: '#fff',
  },
  adminContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffff',

    padding: 10,
    borderRadius: 20,
    zIndex: 1, // Ensure admin container is above the circle container
  },
  adminText: {
    color:"#1e272e",
    fontSize: RFPercentage(2.5),
    marginLeft: 5,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', // Align items horizontally
  },
  circle: {
    height:190,
    width:190,
    borderRadius:95,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:15,
    borderColor: '#00FEFC',
    marginTop: 35,
    backgroundColor: '#fff',
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
