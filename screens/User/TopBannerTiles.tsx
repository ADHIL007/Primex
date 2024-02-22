import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import store from '../../Redux/Store';
import {collection, getDoc, getDocs} from 'firebase/firestore';
import {Firebase_DB} from '../FirebaseConfig';
import {Skeleton} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {getData, storeData} from '../AsyncStorage';

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

  const fetchRate = async () => {
    setIsLoading(true); // Set loading to true before starting the fetch
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
      setRating(roundedRating); // Update the rating state
      store.dispatch({type: 'Update_RATING', payload: roundedRating});
    } catch (error) {
      console.error('Error fetching rating:', error);
      // Optionally update the state to reflect the error
    } finally {
      setIsLoading(false); // Set loading to false after the fetch is complete
    }
  };

  // Call fetchRate at an appropriate time, for example, when the component mounts or when schoolData changes

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
                setStudents(
                  parseInt(schoolData.boys) + parseInt(schoolData.girls),
                );
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
    }, 2000);

    console.log(rating);
  }, [data]); // Add data and SCHOOLNAME as dependencies to re-fetch if they change
  console.log(data);

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
          <Text style={[styles.gridItemText, {fontSize: RFPercentage(2.1)}]}>
            Location:
          </Text>
          {isLoading ? (
            <Skeleton animation="pulse" width={20} height={15} />
          ) : (
            <Text style={[styles.gridItemText, {fontSize: RFPercentage(2.1)}]}>
              {`${location}`}
            </Text>
          )}
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
            }}>
            {isLoading ? (
              <Skeleton animation="pulse" width={50} height={25} />
            ) : (
              <Text
                style={[
                  styles.gridItemText,
                  {fontWeight: 'bold', fontSize: RFPercentage(3.5)},
                ]}>{`${staffs}`}</Text>
            )}
            <Text style={{color: '#333'}}>Staffs</Text>
          </View>

          <View
            style={{
              width: '50%',
              height: '50%',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            {isLoading ? (
              <Skeleton animation="pulse" width={50} height={25} />
            ) : (
              <Text
                style={[
                  styles.gridItemText,
                  {fontWeight: 'bold', fontSize: RFPercentage(3.5)},
                ]}>{`${region}`}</Text>
            )}
            <Text style={{color: '#333'}}>Region</Text>
          </View>

          <View
            style={{
              width: '50%',
              height: '50%',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            {isLoading ? (
              <Skeleton animation="pulse" width={50} height={25} />
            ) : (
              <Text
                style={[
                  styles.gridItemText,
                  {fontWeight: 'bold', fontSize: RFPercentage(3.5)},
                ]}>{` ${students}`}</Text>
            )}
            <Text style={{color: '#333'}}> Students</Text>
          </View>
        </View>
        <View
          style={{
            width: '30%',
            height: 110,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {isLoading ? (
            <Skeleton animation="pulse" width={70} height={75} />
          ) : (
            <Text
  style={[
    styles.gridItemText,
    {
      fontWeight: 'bold',
      fontSize: RFPercentage(5.5),
      color: rating < 2.5
        ? '#e74c3c'
        : rating < 3.5
        ? '#f1c40f'
        : '#2ecc71',
    },
  ]}>
  {store.getState().CurrentSchoolData?.rating}
</Text>

          )}
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
    alignItems: 'center',

    marginTop: 20,
  },
  gridContainer: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    borderBottomWidth: 0,
  },
  gridItem: {
    width: '45%',
    height: 'auto',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  gridItemText: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: '#1e272e',
    textAlign: 'center',
  },
  subText: {
    fontSize: RFPercentage(2),
    color: '#95a5a6',
    textAlign: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    padding: 10,
  },
  locationText: {
    fontSize: RFPercentage(2.1),
    color: '#2c3e50',
    marginLeft: 5,
  },
  icon: {
    color: '#333',
  },
});
