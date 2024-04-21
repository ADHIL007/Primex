import React, {useEffect, useState} from 'react';
import {View, StyleSheet, RefreshControl, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import FlatCard from '../../components/FlatCard';
import TopBanner from './TopBanner';
import {
  collection,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import {Firebase_DB} from '../FirebaseConfig';
import {getData, storeData} from '../AsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../../Redux/Store';
import Suggestions from '../../components/Suggestions';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: HomeProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const fetchRating = async () => {
    const schoolData = store.getState().CurrentSchoolData;
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(schoolData),
    };

    try {
      const response = await fetch(
        'https://adhilshah.pythonanywhere.com/rate',
        requestOptions,
      );
      const data = await response.json();
      const roundedRating = parseFloat(data.Rating).toFixed(2);
      store.dispatch({type: 'Update_RATING', payload: roundedRating});

      const collectionRef = collection(Firebase_DB, 'Schools'); // Change 'Schools' to the correct collection name
      const schoolName = store.getState().CurrentSchool; // Change 'schoolname' to 'schoolName'
      console.log('schoolName:', schoolName);

      const querySnapshot = await getDocs(
        query(collectionRef, where('schoolName', '==', schoolName)),
      );

      querySnapshot.forEach(doc => {
        const docRef = doc.ref;
        updateDoc(docRef, {rating: roundedRating}); // Fix the updateDoc function call
      });
      querySnapshot.forEach(async doc => {
        const docRef = doc.ref;
        const docSnapshot = await getDoc(docRef); // Fetch the document data
        const docData = docSnapshot.data(); // Extract the data from the document snapshot
        store.dispatch({type: 'CURRENT_SCHOOL_DATA', payload: docData}); // Dispatch the data to the store
      });
    } catch (error) {
      console.error('Error fetching rating:', error);
    }
  };

  const fetchRate = async () => {
    try {
      fetchRating()
      const collectionRef = collection(Firebase_DB, 'Schools'); // Change 'Schools' to the correct collection name
      const schoolName = store.getState().CurrentSchool; // Change 'schoolname' to 'schoolName'
      console.log('schoolName:', schoolName);

      const querySnapshot = await getDocs(
        query(collectionRef, where('schoolName', '==', schoolName)),
      );

      querySnapshot.forEach(async doc => {
        const docData = doc.data(); // Extract the data from the document
        const roundedRating = parseFloat(docData.Rating).toFixed(2);
        store.dispatch({type: 'Update_RATING', payload: roundedRating});

        const docRef = doc.ref;
        updateDoc(docRef, {rating: roundedRating}); // Fix the updateDoc function call

        store.dispatch({type: 'CURRENT_SCHOOL_DATA', payload: docData}); // Dispatch the data to the store
      });
    } catch (error) {
      console.error('Error fetching rating:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const data = await AsyncStorage.getItem('USERID');
      const userID = data ? JSON.parse(data) : '';
      if (userID) {
        fetchUserData(userID);
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  const fetchUserData = async (userID: string) => {
    try {
      const userQuerySnapshot = await getDocs(collection(Firebase_DB, 'Users'));
      userQuerySnapshot.forEach(doc => {
        const userData = doc.data();
        if (userData.email === userID) {
          const school = userData.school;
          store.dispatch({type: 'CURRENT_SCHOOL', payload: school});
          storeData('SCHOOLNAME', school);
          store.dispatch({type: 'CURRENT_USER_DATA', payload: userData});
          fetchSchools(school);
        }
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchSchools = async (school: string) => {
    try {
      const schoolsQuerySnapshot = await getDocs(
        collection(Firebase_DB, 'Schools'),
      );
      schoolsQuerySnapshot.forEach(doc => {
        const schoolData = doc.data();
        if (schoolData.schoolName === school) {
          setSchoolData(schoolData);
          store.dispatch({type: 'CURRENT_SCHOOL_DATA', payload: schoolData});
          setStaffs(parseInt(schoolData.numberOfStaffs));
          setRegion(schoolData.region);
          setStudents(parseInt(schoolData.boys) + parseInt(schoolData.girls));
          setRating(parseFloat(schoolData.rating));
          setLocation(schoolData.location);
          storeData('PREVPASS', schoolData.prevpass);
        }
      });
    } catch (error) {
      console.error('Error fetching schools data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const [schoolData, setSchoolData] = useState({});
  const [staffs, setStaffs] = useState(0);
  const [region, setRegion] = useState('');
  const [students, setStudents] = useState(0);
  const [rating, setRating] = useState(0);
  const [location, setLocation] = useState('');
  useEffect(() => {
    fetchUser();

    setTimeout(() => {
      fetchRate();
    }, 1500);
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    fetchUser();

    setTimeout(() => {
      fetchRate();
      setRefreshing(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TopBanner
          school={schoolData.schoolName}
          isLoading={isLoading}
          location={location}
          staffs={staffs}
          students={students}
          region={region}
          rating={rating}
        />
        <Suggestions data ={schoolData} />
        <FlatCard navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
});
