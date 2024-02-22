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
const TopBanner = () => {
  const [school, setSchool] = useState('');
  const [userID, setUserID] = useState(store.getState().USER);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userID) {
      fetchUserData();
    }
  }, [userID]);

  const fetchUser = async () =>{
    try {
      const data = await AsyncStorage.getItem('USERID');
      if (data) {
        const stringWithoutQuotes = data.replace(/^"(.*)"$/, '$1');
        setUserID(stringWithoutQuotes);
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  }

  const fetchUserData = async () => {
    try {
      const userQuery = collection(Firebase_DB, 'Users');
      const userDocSnapshot = await getDocs(userQuery);
      userDocSnapshot.forEach(doc => {
        const userData = doc.data();
        if (userData.email === userID) {
          setSchool(userData.school);
          store.dispatch({
            type: 'CURRENT_SCHOOL',
            payload: userData.school,
          })
          storeData('SCHOOLNAME', userData.school);
          store.dispatch({
            type: 'CURRENT_USER_DATA',
            payload: userData,
          })

        }
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <View style={styles.container}>
   <Text style={styles.Schoolname}>
  <FontAwesome5 name="school" color="#FFF" size={35} />
  {'\t\t'}
  {school ? school : <Skeleton animation="pulse" width={200} height={35} />}
</Text>

    <Text style={styles.text}>Management Portal</Text>
    <TopBannerTiles/>
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
