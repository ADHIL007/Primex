import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Linechart from './Linechart';
import {RFPercentage} from 'react-native-responsive-fontsize';
import store from '../../Redux/Store';
import {storeData} from '../AsyncStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import SchoolData from '../../components/SchoolData';
import {
  collection,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import {Firebase_DB} from '../FirebaseConfig';

const SchoolAnalytics = ({navigation}) => {
  const [dataExist, setDataExist] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [showPrediction, setShowPrediction] = useState(false);
  const [showPresent, setShowPresent] = useState(true);
  const [SchoolNewData, setSchoolNewData] = useState([]);

  const onRefresh = async () => {
    const collectionRef = collection(Firebase_DB, 'Schools'); // Change 'Schools' to the correct collection name
    const schoolName = store.getState().CurrentSchool; // Change 'schoolname' to 'schoolName'
    console.log('schoolName:', schoolName);

    const querySnapshot = await getDocs(
      query(collectionRef, where('schoolName', '==', schoolName)),
    );
    querySnapshot.forEach(async doc => {
      const docRef = doc.ref;
      const docSnapshot = await getDoc(docRef); // Fetch the document data
      const docData = docSnapshot.data(); // Extract the data from the document snapshot
      store.dispatch({type: 'CURRENT_SCHOOL_DATA', payload: docData}); // Dispatch the data to the store
    });
    setDataExist(true);
  };

  useEffect(() => {
    const SchoolData = store.getState().CurrentSchoolData;
    console.log('Prev pass:' + SchoolData.prevpass);

    storeData('PREVPASS', SchoolData.prevpass);
    console.log('Prev pass:' + store.getState().CurrentSchoolData.prevpass);

    try {
      if (!SchoolData || SchoolData.prevpass.length === 0) {
        console.log('Prev data is empty. Add school data to get analytics.');
        setDataExist(false);
      }
      setData(SchoolData.prevpass);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }, []);
  const [prediction, setPrediction] = useState([]);
  const [decreasing, setDecreasing] = useState(true);
  const [updatedSchoolData, setUpdatedSchoolData] = useState({});

  const handlePredict = async () => {
    setShowPresent(false);

    const generateRandomData = () => {
      const randomInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

      const data = [];
      const numRecords = 6; // Number of records to generate
      const students =
        parseInt(store.getState().CurrentSchoolData.boys) +
        parseInt(store.getState().CurrentSchoolData.girls);
      console.log(students);

      for (let i = 0; i < numRecords; i++) {
        const record = {
          total_students: randomInRange(students - 10, students + 10), // Random value between 90 and 110
          total_tests: randomInRange(1, 5), // Random value between 3 and 5
          average_attendance: randomInRange(40, 90), // Random value between 40 and 60
          average_test_prep_score: randomInRange(40, 90), // Random value between 80 and 90
          average_mental_health_score: randomInRange(40, 99), // Random value between 70 and 80
        };
        data.push(record);
      }
      store.dispatch({type: 'Predict', payload: data});
      return data;
    };

    const requestBody = JSON.stringify(generateRandomData());
    console.log(requestBody);

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: requestBody,
    };

    try {
      const response = await fetch(
        'https://adhilshah.pythonanywhere.com/predict',
        requestOptions,
      );
      const responseData = await response.json();
      const predictions = responseData.predictions;

      // Check if performance is decreasing
      const lastHistoricalValue = data[data.length - 1];
      const firstPredictedValue = predictions[0];
      const decreasing = lastHistoricalValue > firstPredictedValue;

      // Set the state for predictions and decreasing
      setPrediction(predictions);
      setDecreasing(decreasing);
      const collectionRef = collection(Firebase_DB, 'Schools');
      const schoolName = store.getState().CurrentSchool;
      const querySnapshot = await getDocs(
        query(collectionRef, where('schoolName', '==', schoolName)),
      );

      const schoolData = store.getState().CurrentSchoolData;
      const {perfomance, ...rest} = schoolData;
      setUpdatedSchoolData({
        ...rest,
        perfomance: decreasing ? 'Decreasing' : 'Increasing',
      });
      console.log(updatedSchoolData);

      querySnapshot.forEach(doc => {
        const docRef = doc.ref;
        updateDoc(docRef, updatedSchoolData);
      });
    } catch (error) {
      console.error(error);
    } finally {
      // Ensure loading and chartloading are set to false after API call is completed

      setShowPrediction(true);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {dataExist ? (
        <View style={styles.container}>
          <View style={styles.Chartscontainer}>
            {showPresent && (
              <View>
                <Text style={styles.title}>
                  Data Analysis for Last 6 Months
                </Text>
                <Linechart
                  chartdata={
                    store.getState().CurrentSchoolData.prevpass.length > 0
                      ? store.getState().CurrentSchoolData.prevpass
                      : [0, 0, 0, 0, 0, 0]
                  }
                  color={() => '#1abc9c'}
                  timeline="present"
                />
              </View>
            )}

            {showPrediction && prediction && (
              <View>
                <Text style={styles.title}>
                  Model A Predictions for the Next 6 Months
                </Text>
                <Linechart
                  chartdata={
                    prediction.length > 0 ? prediction : [0, 0, 0, 0, 0, 0]
                  }
                  color={() => '#3498db'}
                  timeline="future"
                />
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                setShowPresent(true);
                setShowPrediction(false);
              }}
              style={[
                styles.button,
                {
                  borderColor: showPresent ? '#2ecc71' : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    fontSize: RFPercentage(2.3),
                    color: showPresent ? '#2ecc71' : 'rgba(0, 0, 0, 0.5)',
                  },
                ]}>
                Present
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePredict}
              style={[
                styles.button,
                {
                  borderColor: showPresent ? 'transparent' : '#2ecc71',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                },
              ]}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    fontSize: RFPercentage(2.3),
                    color: showPresent ? 'rgba(0, 0, 0, 0.5)' : '#2ecc71',
                  },
                ]}>
                Model
              </Text>
            </TouchableOpacity>
          </View>

          {showPrediction && (
            <View>
              {decreasing ? (
                <View
                  style={[styles.statustextcont]}
                  style={[styles.statustextcont, {backgroundColor: '#ff3f34'}]}>
                  <Text style={[styles.statusText, {color: '#fff'}]}>
                    Performance Decreasing
                    <Ionicons
                      name="trending-down"
                      size={RFPercentage(3)}
                      color="#ffff"
                    />
                  </Text>
                </View>
              ) : (
                <View
                  style={[styles.statustextcont, {backgroundColor: '#0be881'}]}>
                  <Text style={[styles.statusText, {color: '#ffff'}]}>
                    Performance Increasing
                  </Text>
                  <Ionicons
                    name="trending-up"
                    size={RFPercentage(2.5)}
                    color="#fff"
                  />
                </View>
              )}
            </View>
          )}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.noDataText}>
            No data available for this school.
          </Text>
          <Text
            style={[
              styles.noDataText,
              {margin: 10, fontSize: RFPercentage(2)},
            ]}>
            To view analytics, update school data with previous year's pass
            percentages.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('UpdateData');
            }}>
            <Text style={styles.buttonText}>Update School Data</Text>
          </TouchableOpacity>
        </View>
      )}
      <SchoolData data={SchoolNewData} />

      {showPrediction &&<TouchableOpacity
        style={styles.Reportcontainer}
        onPress={() => navigation.navigate('PredReport')}>
        <Text style={styles.Reporttitle}>Report</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={RFPercentage(2.5)}
          color="#fff"
        />
      </TouchableOpacity>}
    </ScrollView>
  );
};

export default SchoolAnalytics;

const styles = StyleSheet.create({
  Reportcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: 455,
    left: 330,
    borderWidth: 0.5,
    borderColor: '#2c3e50',
    backgroundColor: '#1e272e',
    borderRadius: 50,
    padding: 10,
  },
  Reporttitle: {
    color: '#fff',
    fontSize: RFPercentage(2),
  },
  statusCont: {
    backgroundColor: '#fff',
    width: 400,
    borderWidth: 0.5,
    borderColor: '#2c3e50',
    height: 400,
    borderRadius: 10,
    marginTop: 20,
  },
  statustextcont: {
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: -450,
    left: 40,
    borderRadius: 20,
    padding: 5,
  },
  statusText: {
    color: '#2c3e50',
    fontSize: RFPercentage(1.6),
    fontWeight: 'bold',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  Chartscontainer: {
    width: '100%',
    alignItems: 'center',
    height: 400,
    marginTop: 20,
  },
  chartContainer: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#1e272e',
  },
  title: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: RFPercentage(3),
    color: '#2c3e50',
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Raleway',
  },
  emptyContainer: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    borderWidth: 1,
    borderColor: '#1e272e',
    padding: 15,
    width: '25%',
    borderRadius: 50,
    backgroundColor: '',
  },
  buttonText: {
    color: '#1e272e',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
