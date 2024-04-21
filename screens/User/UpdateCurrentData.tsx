import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Image, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {RFPercentage} from 'react-native-responsive-fontsize';
import store from '../../Redux/Store';
import {Firebase_DB} from '../FirebaseConfig';
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

const UpdateCurrentData = () => {
  const [boys, setBoys] = useState('');
  const [girls, setGirls] = useState('');
  const [totalTests, setTotalTests] = useState('');
  const [averageAttendance, setAverageAttendance] = useState('');
  const [averageTestPrepScore, setAverageTestPrepScore] = useState('');
  const [averageMentalHealthScore, setAverageMentalHealthScore] = useState('');
  const [averagePassPercentage, setAveragePassPercentage] = useState('');
  const [benchAndDesk, setBenchAndDesk] = useState('');
  const [computer, setComputer] = useState('');
  const [board, setBoard] = useState('');
  const [classrooms, setClassrooms] = useState('');
  const [noOfstaffs, setnoOfstaffs] = useState('');



  const handleSubmit = async () => {

    if (
      boys.trim() === '' ||
      girls.trim() === '' ||
      totalTests.trim() === '' ||
      averageAttendance.trim() === '' ||
      averageTestPrepScore.trim() === '' ||
      averageMentalHealthScore.trim() === '' ||
      averagePassPercentage.trim() === '' ||
      benchAndDesk.trim() === '' ||
      computer.trim() === '' ||
      board.trim() === '' ||
      classrooms.trim() === '' ||
      noOfstaffs.trim() === ''
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
          onPress: async () => {
            try {

              const schoolData = store.getState().CurrentSchoolData;
              const {prevpass, ...rest} = schoolData;
              console.log(prevpass);

              const updatedPrevPass = [...prevpass.slice(1), averagePassPercentage];
              console.log(updatedPrevPass);

        const updatedSchoolData =     {
                ...rest,
                prevpass: updatedPrevPass,
                averageTestPrepScore: averageTestPrepScore,
                boys: parseInt(boys),
                girls: parseInt(girls),
                totalTests: parseInt(totalTests),
                averageAttendance: parseInt(averageAttendance),
                averageMentalHealthScore: parseInt(averageMentalHealthScore),
                Bench_and_Desk: parseInt(benchAndDesk),
                Computer: parseInt(computer),
                Board: parseInt(board),
                Classrooms: parseInt(classrooms),
                numberOfStaffs: parseInt(noOfstaffs),
              }

                store.dispatch({
                    type: 'CURRENT_SCHOOL_DATA',
                    payload: updatedSchoolData,
                });

                const collectionRef = collection(Firebase_DB, 'Schools');
                const schoolName = store.getState().CurrentSchool;
                const querySnapshot = await getDocs(
                    query(collectionRef, where('schoolName', '==', schoolName)),
                );
                console.log(updatedSchoolData);

                querySnapshot.forEach(doc => {
                    const docRef = doc.ref;
                    updateDoc(docRef, updatedSchoolData);
                });





              setBoys('');
              setGirls('');
              setTotalTests('');
              setAverageAttendance('');
              setAverageTestPrepScore('');
              setAverageMentalHealthScore('');
              setAveragePassPercentage('');
              setBenchAndDesk('');
              setComputer('');
              setBoard('');
              setClassrooms('');
            } catch (error) {
              console.error('Error submitting data:', error);
              Alert.alert(
                'Submission Error',
                'Failed to submit data. Please try again later.',
              );
            }
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
        placeholder="Number of Staffs"
        onChangeText={setnoOfstaffs}
        value={noOfstaffs}
        keyboardType="numeric"
        maxLength={6}
        placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
        underlineColorAndroid="#1e272e"
      />
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
        maxLength={3}
        placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
        underlineColorAndroid="#1e272e"
      />
      <TextInput
        style={styles.input}
        placeholder="Average Attendance"
        onChangeText={setAverageAttendance}
        value={averageAttendance}
        keyboardType="numeric"
        maxLength={3}
        placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
        underlineColorAndroid="#1e272e"
      />
      <TextInput
        style={styles.input}
        placeholder="Average Test Prep Score"
        onChangeText={setAverageTestPrepScore}
        value={averageTestPrepScore}
        keyboardType="numeric"
        maxLength={3}
        placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
        underlineColorAndroid="#1e272e"
      />
      <TextInput
        style={styles.input}
        placeholder="Average Mental Health Score"
        onChangeText={setAverageMentalHealthScore}
        value={averageMentalHealthScore}
        keyboardType="numeric"
        maxLength={3}
        placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
        underlineColorAndroid="#1e272e"
      />
      <TextInput
        style={styles.input}
        placeholder="Average Pass Percentage"
        onChangeText={setAveragePassPercentage}
        value={averagePassPercentage}
        keyboardType="numeric"
        maxLength={3}
        placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
        underlineColorAndroid="#1e272e"
      />

      <Text style={styles.headingtext}>Resources</Text>
      <View style={styles.commodityContainer}>
        <Image
          source={require('../../assets/Commodities/kansai-university-84363_640.jpg')}
          style={styles.image}
        />

        <TextInput
          style={styles.Rinput}
          label="Desk and Bench"
          value={benchAndDesk}
          onChangeText={setBenchAndDesk}
          keyboardType="numeric"
          maxLength={4}
          placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
          underlineColorAndroid="#1e272e"
        />
      </View>
      <View style={styles.commodityContainer}>
        <Image
          source={require('../../assets/Commodities/School-Computer-Labs-Ensure-Access-2.jpg')}
          style={styles.image}
        />
        <TextInput
          style={styles.Rinput}
          label="Number of Computers"
          value={computer}
          onChangeText={setComputer}
          keyboardType="numeric"
          maxLength={4}
          placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
          underlineColorAndroid="#1e272e"
        />
      </View>
      <View style={styles.commodityContainer}>
        <Image
          source={require('../../assets/Commodities/360_F_117556248_PZuqKIshns6b04aYgW6j9a4uF0BRuwZA.jpg')}
          style={styles.image}
        />
        <TextInput
          style={styles.Rinput}
          label="Boards"
          value={board}
          onChangeText={setBoard}
          keyboardType="numeric"
          maxLength={4}
          placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
          underlineColorAndroid="#1e272e"
        />
      </View>
      <View style={styles.commodityContainer}>
        <Image
          source={require('../../assets/Commodities/Classroom-Management-for-an-Effective-Learning-Environment-scaled.jpg')}
          style={styles.image}
        />
        <TextInput
          style={styles.Rinput}
          label="Classroom"
          value={classrooms}
          onChangeText={setClassrooms}
          keyboardType="numeric"
          maxLength={4}
          placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
          underlineColorAndroid="#1e272e"
        />
      </View>
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
    fontSize: RFPercentage(3.5),
    color: '#1e272e',
    textAlign: 'left',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  Rinput: {
    borderWidth: 1,
    borderColor: '#1e272e',
    color: '#1e272e',
    fontSize: 16,
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#f5f6fa',
    width: '77%',
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
    width: '98%',
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
    borderRadius: 5,
    backgroundColor: '#1e272e',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginLeft: 20,
    margin: 20,
  },
  commodityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
});
