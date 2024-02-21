import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import store from '../../Redux/Store';
import {Firebase_DB} from '../FirebaseConfig';
import {collection, getDocs, query, updateDoc, where} from 'firebase/firestore';

const UpdateCurrentData = () => {
  const [boys, setBoys] = useState('');
  const [girls, setGirls] = useState('');
  const [totalTests, setTotalTests] = useState('');
  const [averageAttendance, setAverageAttendance] = useState('');
  const [averageTestPrepScore, setAverageTestPrepScore] = useState('');
  const [averageMentalHealthScore, setAverageMentalHealthScore] = useState('');
  const [averagePassPercentage, setAveragePassPercentage] = useState('');

  const handleSubmit = async() => {
    if (
      boys.trim() === '' ||
      girls.trim() === '' ||
      totalTests.trim() === '' ||
      averageAttendance.trim() === '' ||
      averageTestPrepScore.trim() === '' ||
      averageMentalHealthScore.trim() === '' ||
      averagePassPercentage.trim() === ''
    ) {
      Alert.alert(
        'Missing Information',
        'Please fill in all fields before submitting.',
      );
      return;
    }

    Alert.alert(
      'Confirm Submission',
      'Are you sure you want to submit this data?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Submit',
          onPress: () => {
            Alert.alert(
              'Data Updated',
              'This data will be used to train the model',
            );

            // Update schoolData in the Redux store
            const schoolData = store.getState().CurrentSchoolData;
            const {prevpass, ...rest} = schoolData;
            const updatedPrevPass = [
              ...prevpass.slice(1),
              averagePassPercentage,
            ];
            console.log(updatedPrevPass);

            const updatedSchoolData = {
              ...rest,
              prevpass: updatedPrevPass,
              averageTestPrepScore: averageTestPrepScore,
              boys: parseInt(boys),
              girls: parseInt(girls),
              totalTests: parseInt(totalTests),
              averageAttendance: parseInt(averageAttendance),
              averageMentalHealthScore: parseInt(averageMentalHealthScore),
            };
            console.log(updatedSchoolData);
store.dispatch({type: 'CURRENT_SCHOOL_DATA', payload: updatedSchoolData});

            const fetchSchools = async () => {
                try {
                    const collectionRef = collection(Firebase_DB, 'Schools');
                    const schoolName = store.getState().CurrentSchool; // Change from 'schoolname' to 'schoolName'
                    console.log('schoolName:', schoolName);

                    const querySnapshot = await getDocs(query(collectionRef, where('schoolName', '==', schoolName))); // Change from store.getState().CurrentSchool to schoolName

                    querySnapshot.forEach((doc) => {
                      const docRef = doc.ref; // Get the reference of the document

                      updateDoc(docRef, updatedSchoolData); // Update the document with the new data
                    });

                } catch (error) {
                  console.error('Error fetching schools:', error);
                }
              };

              fetchSchools();
            // Dispatch action to update schoolData in Redux store
            // dispatch(updateSchoolData(updatedSchoolData));


            setBoys('');
            setGirls('');
            setTotalTests('');
            setAverageAttendance('');
            setAverageTestPrepScore('');
            setAverageMentalHealthScore('');
            setAveragePassPercentage('');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingtext}>Update Current Data</Text>
      <TextInput
        style={styles.input}
        placeholder="Number of Boys"
        onChangeText={setBoys}
        value={boys}
        keyboardType="numeric"
        maxLength={6}
        placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
        underlineColorAndroid="#1e272e"
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Girls"
        onChangeText={setGirls}
        value={girls}
        keyboardType="numeric"
        maxLength={6}
        placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
        underlineColorAndroid="#1e272e"
      />
      <TextInput
        style={styles.input}
        placeholder="Total Tests"
        onChangeText={setTotalTests}
        value={totalTests}
        keyboardType="numeric"
        maxLength={2}
        placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
        underlineColorAndroid="#1e272e"
      />
      <TextInput
        style={styles.input}
        placeholder="Average Attendance"
        onChangeText={setAverageAttendance}
        value={averageAttendance}
        keyboardType="numeric"
        maxLength={2}
        placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
        underlineColorAndroid="#1e272e"
      />
      <TextInput
        style={styles.input}
        placeholder="Average Test Prep Score"
        onChangeText={setAverageTestPrepScore}
        value={averageTestPrepScore}
        keyboardType="numeric"
        maxLength={2}
        placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
        underlineColorAndroid="#1e272e"
      />
      <TextInput
        style={styles.input}
        placeholder="Average Mental Health Score"
        onChangeText={setAverageMentalHealthScore}
        value={averageMentalHealthScore}
        keyboardType="numeric"
        maxLength={2}
        placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
        underlineColorAndroid="#1e272e"
      />
      <TextInput
        style={styles.input}
        placeholder="Average Pass Percentage"
        onChangeText={setAveragePassPercentage}
        value={averagePassPercentage}
        keyboardType="numeric"
        maxLength={2}
        placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
        underlineColorAndroid="#1e272e"
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleSubmit}
        contentStyle={{paddingVertical: 8}}>
        Submit
      </Button>
    </View>
  );
};

export default UpdateCurrentData;

const styles = StyleSheet.create({
  headingtext: {
    fontSize: RFPercentage(3),
    color: '#1e272e',
    textAlign: 'left',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1e272e',
    color: '#1e272e',
    fontSize: 16,
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#f5f6fa',
    width: '100%',
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
    borderRadius: 5,
    backgroundColor: '#1e272e',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
