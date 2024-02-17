import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import store from '../../Redux/Store';
import {collection, getDocs} from 'firebase/firestore';
import {Firebase_DB} from '../FirebaseConfig';
import {Skeleton} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RFPercentage} from 'react-native-responsive-fontsize';

const TopBannerTiles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [schoolData, setSchoolData] = useState({});
  const [staffs, setStaffs] = useState(0);
  const [region, setRegion] = useState('');
  const [students, setStudents] = useState(0);
  const [rating, setRating] = useState(0);
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const stringWithoutQuotes = store
        .getState()
        .CurrentSchool.replace(/^"(.*)"$/, '$1');
      const schoolsCollectionRef = collection(Firebase_DB, 'Schools');
      const schoolsSnapshot = await getDocs(schoolsCollectionRef);
      schoolsSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.schoolName === stringWithoutQuotes) {
          setSchoolData(data);
          store.dispatch({
            type: 'CURRENT_SCHOOL_DATA',
            payload: data,
          });
          setStaffs(data.numberOfStaffs);
          setRegion(data.region);
          setStudents(parseInt(data.boys) + parseInt(data.girls));
          setRating(data.rating);
          setLocation(data.location);
        }
      });
    } catch (error) {
      console.error('Error fetching schools data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Skeleton animation="pulse" width={200} height={35} />
      ) : (
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
            <Text style={[styles.gridItemText, {fontSize: RFPercentage(2.1)}]}>
              {`Location: ${location}`}{' '}
            </Text >
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
              <Text
                style={[
                  styles.gridItemText,
                  {fontWeight: 'bold', fontSize: RFPercentage(3.5)},
                ]}>{`${staffs}`}</Text>
              <Text style={{color: '#333'}}>Staffs</Text>
            </View>

            <View style={{
                width: '50%',
                height: '50%',
                flexDirection: 'column',
                alignItems: 'center',
                borderWidth: .3
              }}>
              <Text style={[
                  styles.gridItemText,
                  {fontWeight: 'bold', fontSize: RFPercentage(3.5)},
                ]}>{`${region}`}</Text>
                <Text style={{color: '#333'}}>Region</Text>
            </View>

            <View style={{
                width: '50%',
                height: '50%',
                flexDirection: 'column',
                alignItems: 'center',
                borderWidth: .3
              }}>
              <Text style={[
                  styles.gridItemText,
                  {fontWeight: 'bold', fontSize: RFPercentage(3.5)},
                ]}>{` ${students}`}</Text>
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
            <Text style={[
                  styles.gridItemText,
                  {fontWeight: 'bold', fontSize: RFPercentage(7.5)},
                ]}>4.1</Text>
            <Text style={{color: '#333'}}>Rating</Text>
          </View>
        </View>
      )}
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
