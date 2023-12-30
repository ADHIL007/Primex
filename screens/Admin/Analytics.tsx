import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Image,
} from 'react-native';
import PieCharts from '../../components/PieCharts';
import AnalyticsDatas from '../../components/AnalyticsDatas';
import RegionCards from '../../components/RegionCards';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {getData} from '../AsyncStorage';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Firebase_DB } from '../FirebaseConfig';

type AnalyticsProps = NativeStackScreenProps<RootStackParamList, 'Analytics'>;

const Analytics = ({navigation}: AnalyticsProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalSchools, setTotalSchools] = useState(0);
  const [totalStaffs, setTotalStaffs] = useState(0);
  const [schoolData, setSchoolData] = useState([]);



  const [RegionData, setRegionData] = useState([]);



  const fetchSchoolsData = async () => {
    try {
      const schoolsData = await getData('SCHOOLS');
      let totalStaffs = 0;
      let regionData: any[] = [];

      schoolsData.forEach((school) => {
        const staffs = parseInt(school.numberOfStaffs) || 0;
        const students = parseInt(school.numberOfStudents) || 0;

        totalStaffs += staffs;

        const regionIndex = regionData.findIndex((region) => region.Rid === school.region);

        if (regionIndex !== -1) {
          regionData[regionIndex].schoolsCount += 1;
          regionData[regionIndex].students += students;
          regionData[regionIndex].staffs += staffs;
        } else {
          regionData.push({
            name: `Region ${school.region}`,
            staffs: staffs,
            students: students,
            stocksrate: 0,
            Rid: school.region,
            schoolsCount: 1,
          });
        }
      });

      setTotalStaffs(totalStaffs);
      setTotalSchools(schoolsData.length);
      setSchoolData(schoolsData);
      setRegionData(regionData);

      const docRef = doc(Firebase_DB, 'Records', 'SchoolData'); // Replace 'your_document_id' with the actual document ID

      const docSnap = await getDoc(docRef);
      // Check if totalSchools has changed
      const prevTotalSchools = getDoc(docRef).totalSchools

      if(prevTotalSchools !== totalSchools) {
        // Update the total staffs and set the regionData state
        setTotalStaffs(totalStaffs);
        setTotalSchools(schoolsData.length);
        setSchoolData(schoolsData);
        setRegionData(regionData);

        // Fetch the existing document from the Records collection


        // Update the Records collection if the document exists
        if (docSnap.exists()) {
          await updateDoc(docRef, {
            totalSchools: totalSchools,
            totalStaffs: totalStaffs,
            RegionData: regionData,
          });
        } else {
          // Otherwise, add a new document to the Records collection
          const DbCollection = collection(Firebase_DB, 'Records');
          await addDoc(DbCollection, {
            totalSchools: totalSchools,
            totalStaffs: totalStaffs,
            RegionData: regionData,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching schools data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchSchoolsData();
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchSchoolsData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Image
            source={require('../../assets/Backgrounds/bear.png')}
            style={styles.image}
          />
          <Text style={styles.message}>Loading...</Text>
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#00B8A9"
          />
        </View>
      ) : (
        <>
          <PieCharts />
          <AnalyticsDatas count={totalSchools} countOfStaffs={totalStaffs} />
          <RegionCards navigation={navigation} schoolData={RegionData}  />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    resizeMode: 'contain',
    marginTop: 10,
  },
  message: {
    fontSize: 18,
    color: '#333',
    fontStyle: 'italic',
    textAlign: 'center',
    opacity: 0.5,
    marginBottom: 20,
  },
  loadingIndicator: {
    marginBottom: 20,
  },
});

export default Analytics;
