import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FlatCardAdmin from '../../components/FlatCardAdmin';
import CountOfSchools from '../../components/CountOfSchools';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { collection, getDocs } from 'firebase/firestore';
import { storeData } from '../AsyncStorage';
import { Firebase_Auth, Firebase_DB } from '../FirebaseConfig';
import store from '../../Redux/Store';

type AdminHomeProps = NativeStackScreenProps<RootStackParamList, 'AdminHome'>;

const AdminHome = ({ navigation }: AdminHomeProps) => {
  const [schools, setSchools] = useState<string[]>([]);
  const [schoolCount, setSchoolCount] = useState(0);
  const [reqs, setReqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [refreshing, setRefreshing] = useState(false);




  const getSchoolList = async () => {
    try {
      const querySnapshot = await getDocs(collection(Firebase_DB, 'Schools'));
      storeData('SCHOOLS', querySnapshot.docs.map((doc) => doc.data()));
      const schoolsData = querySnapshot.docs.map((doc) => doc.data().schoolName);
      setSchools(schoolsData);
      setSchoolCount(schoolsData.length);
      store.dispatch({
        type: 'SCHOOL_COUNT',
        payload: {
          count: schoolsData.length,
        },
      });
      storeData('SCHOOLLIST', schoolsData);
    } catch (error) {
      console.error('Error getting school list:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const requestsCollection = collection(Firebase_DB, 'Requests');
      const querySnapshot = await getDocs(requestsCollection);

      store.dispatch({
        type :'REQUESTS',payload:{
          count: querySnapshot.size
        }
      })
    } catch (error) {
      console.error('Error fetching requests:', error);
      Alert.alert('Error', 'An error occurred while fetching requests.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchRequests();
  };

  useEffect(() => {
    getSchoolList();
  }, []);
  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <CountOfSchools  />
      <FlatCardAdmin navigation={navigation} />
    </ScrollView>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
