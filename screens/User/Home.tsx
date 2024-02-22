import React, { useState } from 'react';
import { View, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import FlatCard from '../../components/FlatCard';
import TopBanner from './TopBanner';
import store from '../../Redux/Store';
import { collection, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Firebase_DB } from '../FirebaseConfig';
import { Facilities } from './Facilities';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const fetchRate = async () => {
    const schoolData = store.getState().CurrentSchoolData;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schoolData),
    };

    try {
      const response = await fetch(
        'https://adhilshah.pythonanywhere.com/rate',
        requestOptions
      );
      const data = await response.json();
      const roundedRating = parseFloat(data.Rating).toFixed(2);
      store.dispatch({ type: 'Update_RATING', payload: roundedRating });

      const collectionRef = collection(Firebase_DB, 'Schools'); // Change 'Schools' to the correct collection name
      const schoolName = store.getState().CurrentSchool; // Change 'schoolname' to 'schoolName'
      console.log('schoolName:', schoolName);

      const querySnapshot = await getDocs(
        query(collectionRef, where('schoolName', '==', schoolName))
      );

      querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        updateDoc(docRef, { rating: roundedRating }); // Fix the updateDoc function call
      });
      querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;
        const docSnapshot = await getDoc(docRef); // Fetch the document data
        const docData = docSnapshot.data(); // Extract the data from the document snapshot
        store.dispatch({ type: 'CURRENT_SCHOOL_DATA', payload: docData }); // Dispatch the data to the store
      });


    } catch (error) {
      console.error('Error fetching rating:', error);
    }
  };

  const onRefresh = () => {

    setRefreshing(true);
fetchRate();

  }

    setTimeout(() => {
      setRefreshing(false);
      fetchRate();
    }, 2000);

  return (
    <View style={styles.container}>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
         <TopBanner />
         <Facilities/>
        <FlatCard navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});
