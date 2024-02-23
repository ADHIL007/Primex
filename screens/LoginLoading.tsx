import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import { collection, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Firebase_DB } from './FirebaseConfig';
import { Text } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import store from '../Redux/Store';

const LoginLoading = () => {
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
fetchRate();
  return (

<View style={styles.lottiecontainer}>
          <LottieView source={require('../assets/gifs/Loginsuccess.json')} autoPlay loop style={{flex: 1,width: 600, height: 600}} />
       <Text style={styles.lottieText}>Login SuccessFull</Text>
       <Text style={[styles.lottieText, {fontSize: 30,top: "70%"}]}>Redirecting...</Text>
        </View>

  )
}

export default LoginLoading

const styles = StyleSheet.create({
    lottiecontainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      },
      lottieText:{
        position: 'absolute',
        top:'65%',
    fontSize: 40,
    color: '#1e272e',

      },
      lottCont: {
        flex: 1,

      },

})
