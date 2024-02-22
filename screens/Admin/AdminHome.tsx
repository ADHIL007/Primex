import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  Alert,
} from 'react-native';
import FlatCardAdmin from '../../components/FlatCardAdmin';
import CountOfSchools from '../../components/CountOfSchools';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {collection, getDocs} from 'firebase/firestore';
import {storeData} from '../AsyncStorage';
import {Firebase_DB} from '../FirebaseConfig';
import store from '../../Redux/Store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type AdminHomeProps = NativeStackScreenProps<RootStackParamList, 'AdminHome'>;

const AdminHome = ({navigation}: AdminHomeProps) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const getSchoolList = async () => {
    try {
      const querySnapshot = await getDocs(collection(Firebase_DB, 'Schools'));
      storeData(
        'SCHOOLS',
        querySnapshot.docs.map(doc => doc.data()),
      );
      const schoolsData = querySnapshot.docs.map(doc => doc.data().schoolName);
      store.dispatch({
        type: 'SCHOOL_COUNT',
        payload: {count: schoolsData.length},
      });
      storeData('SCHOOLLIST', schoolsData);
    } catch (error) {
      console.error('Error getting school list:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const requestsCollection = collection(Firebase_DB, 'Requests');
      const querySnapshot = await getDocs(requestsCollection);
      store.dispatch({
        type: 'REQUESTS',
        payload: {count: querySnapshot.size},
      });
    } catch (error) {
      console.error('Error fetching requests:', error);
      Alert.alert('Error', 'An error occurred while fetching requests.');
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchRequests();
  };

  useEffect(() => {
    getSchoolList();
    setTimeout(() => {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2500); // Display alert for 2 seconds
    }, 1000); // Display alert after 2 seconds
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <CountOfSchools />
        <View style={styles.Flatcontainer}>
          <FlatCardAdmin navigation={navigation} />
        </View>
      </ScrollView>
      {showAlert && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>Refresh by swiping down</Text>
          <MaterialIcons
            name="swipe-down"
            size={24}
            color="#fff"
            style={styles.swipeIcon}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Flatcontainer: {
    flex: 1,
    backgroundColor: '#ffff',
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    height: 600,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#1e272e',
  },
  alertContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 10,
  },
  swipeIcon: {},
});

export default AdminHome;
