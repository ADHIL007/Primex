import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FlatCardAdmin from '../../components/FlatCardAdmin';
import CountOfSchools from '../../components/CountOfSchools';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { collection, getDocs } from 'firebase/firestore';
import { storeData } from '../AsyncStorage';
import { Firebase_Auth, Firebase_DB } from '../FirebaseConfig';

type AdminHomeProps = NativeStackScreenProps<RootStackParamList, 'AdminHome'>;

const AdminHome = ({ navigation }: AdminHomeProps) => {
  const auth = Firebase_Auth;
  const [schools, setSchools] = useState<string[]>([]);

  const getSchoolList = async () => {
    try {
      const querySnapshot = await getDocs(collection(Firebase_DB, 'Schools'));
      storeData('SCHOOLS',querySnapshot.docs.map((doc) => doc.data()))
      const schoolsData = querySnapshot.docs.map((doc) => doc.data().schoolName);
      setSchools(schoolsData);
      storeData('SCHOOLLIST', schoolsData);
    } catch (error) {
      console.error('Error getting school list:', error);
    }
  };

  useEffect(() => {
    getSchoolList();
  }, []);

  return (
    <View style={styles.container}>
      <CountOfSchools length={schools.length} />
      <FlatCardAdmin navigation={navigation} />
    </View>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
