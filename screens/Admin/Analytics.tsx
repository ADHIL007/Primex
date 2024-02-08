import React, { useState, useEffect, useCallback } from 'react';
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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { getData, storeData } from '../AsyncStorage';
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { Firebase_DB } from '../FirebaseConfig';
import { categorizeByRegion } from './categorize';
import { RegionData } from './categorize';
import store from '../../Redux/Store';

type AnalyticsProps = NativeStackScreenProps<RootStackParamList, 'Analytics'>;

const Analytics = ({ navigation }: AnalyticsProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalSchools, setTotalSchools] = useState(0);
  const [totalStaffs, setTotalStaffs] = useState(0);
  const [regionData, setRegionData] = useState([]);
  const [prevTotalSchools, setPrevTotalSchools] = useState(0); // Added state for previous total schools

  const fetchSchoolsData = async () => {
    try {
      const schools = await getData('SCHOOLS');


      const RegionWiseData = categorizeByRegion(schools);

      const regionArrays: Record<string, RegionData[]> = {};

      // Populate regionArrays with region-wise data
      Object.entries(RegionWiseData).forEach(([region, data]) => {
        // Convert each region's data to an array and store it in regionArrays


        if (!regionArrays[region]) {
          regionArrays[region] = [];
        }
        regionArrays[region].push(data);
        store.dispatch({
          type:`R${region}`,
          payload: {
            data
          }
        })
      });

      // Accumulate totalSchools and totalStaffs after processing all data
      let updatedTotalSchools = totalSchools;
      let updatedTotalStaffs = totalStaffs;

      // Process the accumulated region data
      Object.values(regionArrays).forEach((regionDataArray) => {
        regionDataArray.forEach((data) => {
          updatedTotalSchools += data.totalSchools;
          updatedTotalStaffs += data.totalStaffs;
        });
      });

      // Update state with region-wise data
      console.log(regionArrays);
      setRegionData(regionArrays);

      // Check if the number of schools has changed
      if (updatedTotalSchools !== totalSchools) {
        setTotalSchools(updatedTotalSchools); // Update total schools
        setTotalStaffs(updatedTotalStaffs);   // Update total staffs

        // Update Firebase only if the number of schools changes
        const dbCollection = collection(Firebase_DB, 'Records');
        const docRef = doc(dbCollection, 'SchoolData');

        // Update the document with the new data
        await updateDoc(docRef, { data: regionArrays });
        await storeData('SCHOOLSDATA', regionArrays);
        await storeData('TOTALSCHOOLS', updatedTotalSchools);
        await storeData('TOTALSTAFFS', updatedTotalStaffs);
      }
    } catch (error) {
      console.error('Error fetching schools data:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const refreshData = async () => {
    try {
      const querySnapshot = await getDocs(collection(Firebase_DB, 'Schools'));
      const newData: Array<any> = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        newData.push({
          // You can format the data here as needed
          id: doc.id,
          ...doc.data(),
        });
      });

      console.log('New data:', newData);
      storeData("SCHOOLS", newData);

      store.dispatch({
        type: "SCHOOL_LIST",
        payload: {
          data: newData
        }
      });

      store.dispatch({
        type: "SCHOOL_COUNT",
        payload: {
          count: newData.length
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshData()
    console.log('Refreshing');

    setTimeout(() => {
      fetchSchoolsData();
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchSchoolsData();
  }, []);

  return (
    <>
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
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <PieCharts data={regionData} />
          <AnalyticsDatas count={totalSchools} countOfStaffs={totalStaffs} />
          <RegionCards navigation={navigation} schoolData={regionData} />
        </ScrollView>
      )}
    </>
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
