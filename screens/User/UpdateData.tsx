import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, Button} from 'react-native-paper'; // Import Button component from react-native-paper
import store from '../../Redux/Store';
import {getData} from '../AsyncStorage';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {collection, getDocs, query, updateDoc, where} from 'firebase/firestore';
import {Firebase_DB} from '../FirebaseConfig';

const UpdateData = () => {
  const [prevData, setPrevData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('PREVPASS');
      setPrevData(data);
      console.log('Previous data:', data);
    };

    fetchData();
  }, []);

  console.log('UpdateData reached');

  return (
    <ScrollView>
      {prevData.length === 0 && (
        <>
          <View style={styles.Alertcontainer}>
            <Text style={styles.text}>
              Previous year's pass percentage data is unavailable. Please
              provide necessary data.
            </Text>
          </View>
          <UpdatePrevPass /> <UpdatePrevPass />
        </>
      )}
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

const UpdatePrevPass = () => {
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
      Firebase_DB.collection('Schools')
        .where('schoolName', '==', store.getState().CurrentSchool)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (document) {
            document.ref.update({
              prevpass: data,
            });
          });
        })
        .catch(function (error) {
          console.error('Error updating document: ', error);
        });

      // Dispatch the 'PushPrevPass' action after the query completes successfully
      store.dispatch({type: 'PushPrevPass', payload: data});

      // Log the submitted pass percentage data and the updated data
      console.log('Submitted pass percentage data:', data);
      console.log('Updated data:', store.getState().CurrentSchoolData.prevpass);
    } catch (error) {
      console.error('Error querying Firestore:', error);
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
              maxLength={3}
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
