import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import store from '../../Redux/Store';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { Firebase_DB } from '../FirebaseConfig';
import { Skeleton } from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { getData, storeData } from '../AsyncStorage';

const TopBannerTiles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [schoolData, setSchoolData] = useState({});
  const [staffs, setStaffs] = useState(0);
  const [region, setRegion] = useState('');
  const [students, setStudents] = useState(0);
  const [rating, setRating] = useState(0);
  const [location, setLocation] = useState('');


// Assuming initialData is null or an appropriate initial value
const [data, setData] = useState('');

useEffect(() => {
  const fetchSchools = async () => {
    try {
      // Check if SCHOOLNAME is not null
      const data = await getData('SCHOOLNAME');
      setData(data);
      if (data) {
        // If data is null or empty, fetch it
        if (!data) {
          const newData = await getData('SCHOOLNAME');
          setData(newData);
        }

        // Proceed only if data is available
        if (data) {
          // Remove surrounding quotes from the fetched data
          const stringWithoutQuotes = data.replace(/^"(.*)"$/, '$1');

          const schoolsCollectionRef = collection(Firebase_DB, 'Schools');
          const schoolsSnapshot = await getDocs(schoolsCollectionRef);

          schoolsSnapshot.forEach(doc => {
            const schoolData = doc.data();
            if (schoolData.schoolName === stringWithoutQuotes) {
              setSchoolData(schoolData);
              store.dispatch({
                type: 'CURRENT_SCHOOL_DATA',
                payload: schoolData,
              });
              setStaffs(schoolData.numberOfStaffs);
              setRegion(schoolData.region);
              // Ensure to parse integers correctly and add boys and girls for total students
              setStudents(parseInt(schoolData.boys) + parseInt(schoolData.girls));
              setRating(schoolData.rating);
              setLocation(schoolData.location);
              storeData('PREVPASS', schoolData.prevpass);
            }
          });
        } else {
          console.error('Data is null or empty');
        }
      } else {
        console.error('SCHOOLNAME is null or undefined');
      }
    } catch (error) {
      console.error('Error fetching schools data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  setTimeout(() => {
    fetchSchools();
  },2000)
}, [data]); // Add data and SCHOOLNAME as dependencies to re-fetch if they change


  return (
    <View style={styles.container}>
        <View style={styles.gridContainer}>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
              width: '100%',
              padding: 15,
              marginTop: 10,
              height: 'auto',
            }}>
              <Text style={[styles.gridItemText, {fontSize: RFPercentage(2.1)}]}>Location: </Text>
           {isLoading ? (
        <Skeleton animation="pulse" width={20} height={15} />
      ) : ( <Text style={[styles.gridItemText, {fontSize: RFPercentage(2.1)}]}>
              {`${location}`}
            </Text >)}
            <MaterialIcons
              name="location-on"
              size={RFPercentage(1.7)}
              color="#333"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              padding: 5,
              width: '70%',
              height: 120,
            }}>
            <View
              style={{
                width: '50%',
                height: '50%',
                flexDirection: 'column',
                alignItems: 'center',

                borderWidth: .3
              }}>
            {isLoading ? (
        <Skeleton animation="pulse" width={50} height={25} />
      ) : (  <Text
                style={[
                  styles.gridItemText,
                  {fontWeight: 'bold', fontSize: RFPercentage(3.5)},
                ]}>{`${staffs}`}</Text>)}
              <Text style={{color: '#333'}}>Staffs</Text>
            </View>

            <View style={{
                width: '50%',
                height: '50%',
                flexDirection: 'column',
                alignItems: 'center',
                borderWidth: .3
              }}>
           {isLoading ? (
        <Skeleton animation="pulse" width={50} height={25} />
      ) : (   <Text style={[
                  styles.gridItemText,
                  {fontWeight: 'bold', fontSize: RFPercentage(3.5)},
                ]}>{`${region}`}</Text>)}
                <Text style={{color: '#333'}}>Region</Text>
            </View>

            <View style={{
                width: '50%',
                height: '50%',
                flexDirection: 'column',
                alignItems: 'center',
                borderWidth: .3
              }}>
             {isLoading ? (
        <Skeleton animation="pulse" width={50} height={25} />
      ) : ( <Text style={[
                  styles.gridItemText,
                  {fontWeight: 'bold', fontSize: RFPercentage(3.5)},
                ]}>{` ${students}`}</Text>)}
                <Text style={{color: '#333'}}> Students</Text>
            </View>
          </View>
          <View style={{
                width: '30%',
                height: 110,
                flexDirection: 'column',
                alignItems: 'center',
                borderWidth: .3
              }}>
          {isLoading ? (
        <Skeleton animation="pulse" width={70} height={75} />
      ) : (  <Text style={[
                  styles.gridItemText,
                  {fontWeight: 'bold', fontSize: RFPercentage(7.5)},
                ]}>4.1</Text>)}
            <Text style={{color: '#333'}}>Rating</Text>
          </View>
        </View>

    </View>
  );
};

export default TopBannerTiles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItemText: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
    color: '#333',
  },
});
