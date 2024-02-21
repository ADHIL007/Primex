import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, Button} from 'react-native-paper'; // Import Button component from react-native-paper
import store from '../../Redux/Store';
import {getData, storeData} from '../AsyncStorage';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {collection, getDoc, getDocs, query, updateDoc, where} from 'firebase/firestore';
import {Firebase_DB} from '../FirebaseConfig';
import UpdateCurrentData from './UpdateCurrentData';

const UpdateData = ({navigation}) => {
  console.log('UpdateData reached');
  const [prevData, setPrevData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('PREVPASS');
      setPrevData(data);
      console.log('Previous data:', data);
    };

    fetchData();
  }, []);




  return (
    <ScrollView>
  { store.getState().CurrentSchoolData.prevpass.length === 0 && (
    <>
      <View style={styles.Alertcontainer}>
        <Text style={styles.text}>
          Previous year's pass percentage data is unavailable. Please provide necessary data.
        </Text>
      </View>
      <UpdatePrevPass navigation={navigation} />
    </>
  ) }
<UpdateCurrentData/>
</ScrollView>
  );

};

export default UpdateData;

const styles = StyleSheet.create({
  Alertcontainer: {
    width: '100%',
    backgroundColor: '#d63031',
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  headingtext: {
    fontSize: 21,
    color: '#1e272e',
    textAlign: 'left',
    paddingHorizontal: 20,
    marginBottom: 10, // Add margin bottom for spacing
  },
  input: {
    borderWidth: 1,
    borderColor: '#1e272e',
    color: '#1e272e',
    fontSize: RFPercentage(3),
    marginBottom: 10,
    paddingVertical: 8, // Adjust padding for better input appearance
    paddingHorizontal: 12, // Adjust padding for better input appearance
    borderRadius: 5,
    backgroundColor: '#f5f6fa', // Light gray background color
    width: '100%', // Set width to 40% of the container
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    width: '50%', // Set width to 50% of the container
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
    flexWrap: 'wrap',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20, // Add horizontal padding for consistency
  },
  monthContainer: {
    alignItems: 'center',
    marginBottom: 20, // Add margin bottom for spacing between months
    width: '40%', // Set width to 40% of the container
  },
});

const UpdatePrevPass = ({navigation}) => {
  const [data, setData] = useState([]); // State for pass percentage data

  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let pastMonths = [];

  for (let i = -5; i <= 0; i++) {
    const monthIndex = currentMonthIndex + i;
    const adjustedMonthIndex = (monthIndex + 12) % 12;
    pastMonths.push(months[adjustedMonthIndex]);
  }

  const handlePassPercentageChange = (index, value) => {
    const newData = [...data];
    newData[index] = value;
    setData(newData);
  };

  const handleSubmit = async () => {
    try {
      const collectionRef = collection(Firebase_DB, 'Schools');
      const schoolName = store.getState().CurrentSchool; // Change from 'schoolname' to 'schoolName'
      console.log('schoolName:', schoolName);

      const querySnapshot = await getDocs(query(collectionRef, where('schoolName', '==', schoolName))); // Change from store.getState().CurrentSchool to schoolName

      querySnapshot.forEach((doc) => {
        const docRef = doc.ref; // Get the reference of the document
        const newData = { prevpass: data }; // Define the new data to update
        updateDoc(docRef, newData); // Update the document with the new data
      });

      // Dispatch the 'PushPrevPass' action after the updates complete successfully
      store.dispatch({ type: 'PushPrevPass', payload: data });
      console.log('Submitted pass percentage data:', data);
    } catch (error) {
      console.error('Error updating document:', error);
    } finally {
      console.log('Updated data:', store.getState().CurrentSchoolData.prevpass);
      Alert.alert('Success', 'Pass percentage data updated successfully.');
      storeData('PREVPASS', data);
      navigation.navigate('SchoolAnalytics');
    }
  };

  return (
    <View style={{marginTop: 20}}>
      <Text style={styles.headingtext}>
        Update Previous Pass Percentage Data
      </Text>
      <View style={styles.container}>
        {pastMonths.map((month, index) => (
          <View key={index} style={styles.monthContainer}>
            <Text style={styles.headingtext}>{month}</Text>
            <TextInput
              placeholder=" %"
              placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
              keyboardType="numeric"
              style={styles.input}
              value={data[index] ? data[index].toString() : ''}
              onChangeText={value => handlePassPercentageChange(index, value)}
              maxLength={2}
              editable
              selectTextOnFocus
              underlineColorAndroid="#1e272e"
            />
          </View>
        ))}
      </View>

      <Button
        mode="contained"
        buttonColor="#1e272e"
        onPress={handleSubmit}
        style={styles.button}>
        Submit
      </Button>
    </View>
  );
};
