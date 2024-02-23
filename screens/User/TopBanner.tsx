import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import store from '../../Redux/Store';
import { collection, getDocs } from 'firebase/firestore';
import { Firebase_DB } from '../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TopBannerTiles from './TopBannerTiles';
import { Skeleton } from '@rneui/themed';
import { storeData } from '../AsyncStorage';
const TopBanner = ({school, isLoading,location ,staffs,students,region,rating}) => {

  return (
    <View style={styles.container}>
   <Text style={styles.Schoolname}>
  <FontAwesome5 name="school" color="#FFF" size={35} />
  {'\t\t'}
  {school ? school : <Skeleton animation="pulse" width={200} height={35} />}
</Text>

    <Text style={styles.text}>Management Portal</Text>
    <TopBannerTiles isLoading={isLoading} location={location} staffs={staffs} students={students} region={region} rating={rating}/>
  </View>

  );
};

export default TopBanner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e272e',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#1e272e',
height: 300
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    fontFamily: 'Raleway',
    textAlign: 'center',

  },
  Schoolname:{
    fontSize: 35,
    color: '#FFF',
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    textAlign: 'center',

  }
});
