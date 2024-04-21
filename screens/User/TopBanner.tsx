import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import store from '../../Redux/Store';
import {collection, getDocs} from 'firebase/firestore';
import {Firebase_DB} from '../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TopBannerTiles from './TopBannerTiles';
import {Skeleton} from '@rneui/themed';
import {storeData} from '../AsyncStorage';
import Svg, {Path} from 'react-native-svg';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const TopBanner = ({
  school,
  isLoading,
  location,
  staffs,
  students,
  region,
  rating,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Schoolname}>
        <FontAwesome5 name="school" color="#FFF" size={35} />
        {'\t\t'}
        {school ? (
          school
        ) : (
          <Skeleton animation="pulse" width={200} height={35} />
        )}
      </Text>

      <Text style={styles.text}>Management Portal</Text>
      <TopBannerTiles
        isLoading={isLoading}
        location={location}
        staffs={staffs}
        students={students}
        region={region}
        rating={rating}
      />
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        scaleX={1.9}
        scaleY={2.6}
        style={{ top: heightPercentageToDP("-6%") }}
        >
        <Path
          fill="#ffff"
          fill-opacity="1"
          d="M0,64L48,90.7C96,117,192,171,288,213.3C384,256,480,288,576,293.3C672,299,768,277,864,229.3C960,181,1056,107,1152,85.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </Svg>
    </View>
  );
};

export default TopBanner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#18dcff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#18dcff',
    height: 300,
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    fontFamily: 'Raleway',
    textAlign: 'center',
  },
  Schoolname: {
    fontSize: 35,
    color: '#FFF',
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
