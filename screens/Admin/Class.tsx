import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {collection, getDocs} from 'firebase/firestore';
import {Firebase_DB} from '../FirebaseConfig';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ClassItem from './ClassItem';
import PieChart2 from './PieChart2';
import {SegmentedButtons} from 'react-native-paper';
import { storeData } from '../AsyncStorage';
const Class = () => {
  useEffect(() => {
    fetchDate();
  }, []);

  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDate = async () => {
    setLoading(true);
    setRefreshing(false);
    try {
      const collectionRef = collection(Firebase_DB, 'Schools');
      const snapshot = await getDocs(collectionRef);
      const tempPredictions = [];
      const tempSchools = [];

      // Using Promise.all to wait for all async operations to complete
      await Promise.all(
        snapshot.docs.map(async doc => {
          const data = doc.data();

          const sendData = {
            noStudents: parseInt(data.boys) + parseInt(data.girls),
            noStaffs: parseInt(data.numberOfStaffs),
            Bench_and_Desk: parseInt(data.Bench_and_Desk),
            Computer: parseInt(data.Computer),
            Board: parseInt(data.Board),
            Classrooms: parseInt(data.Classrooms),
        };
          try {
            const requestOptions = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify([sendData]),
            };
            const response = await fetch(
              'https://adhilshah.pythonanywhere.com/predictRF',
              requestOptions,
            );
            console.log(sendData);
            const responseData = await response.json();
            console.log('Response:', responseData.predictions);

            const updatedData = {
              ...data,
              status: responseData.predictions[0],
              id: doc.id,
            };
            tempSchools.push(updatedData);
            console.log('name' + updatedData.schoolName);
            console.log('set' + tempSchools);

            tempPredictions.push(...responseData.predictions);
          } catch (error) {
            console.error('Error sending data:', error);
          }
        }),
      );

      setPredictions(tempPredictions);
      setSchools(tempSchools);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDate().then(() => {
      setRefreshing(false);
    });
  };

  // Render the schools array
  schools.forEach((school, index) => {
    console.log(index + '=>' + school);
  });

  let needFlag = 0;
  let fineFlag = 0;
  let goodFlag = 0;
  let veryGoodFlag = 0;
  predictions.forEach((prediction, index) => {
    if (prediction === 'Need Allocation') {
      needFlag++;
    }
    if (prediction === 'Bad') {
      fineFlag++;
    }
    if (prediction === 'Good') {
      goodFlag++;
    }
    if (prediction === 'Very Good') {
      veryGoodFlag++;
    }
  });

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {loading ? (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <LottieView
            style={{flex: 1, width: wp('100%'), height: hp('100%')}}
            source={require('../../assets/gifs/waiting.json')}
            autoPlay
            loop
          />
          <View style={styles.TextCont}>
            <Text style={[styles.LoadingText, {fontSize: hp('2.5%')}]}>
              Hold on, we're working on it.
            </Text>
            <Text style={[styles.LoadingText, {fontSize: hp('2.1%')}]}>
              Data analysis in progress...
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginTop: hp('5%'),
          }}>
          <Text
            style={{
              color: 'rgba(24, 44, 97,1.0)',
              fontSize: hp('3%'),
              textAlign: 'center',
              marginTop: hp('3%'),
              marginBottom: hp('3%'),
            }}>
            Detailed Analytics
          </Text>
          {schools.length === 0 ? (
            <View>
              <Text
                style={{
                  color: 'rgba(24, 44, 97,1.0)',
                  fontSize: hp('4%'),
                  textAlign: 'center',
                  marginTop: hp('40%'),
                  marginBottom: hp('3%'),
                }}>
                No schools to display
              </Text>
            </View>
          ) : (
            <View>
              <PieChart2 cdata={[needFlag, fineFlag, goodFlag, veryGoodFlag]} />
              {schools.map((school, index) => (
                <ClassItem key={index} school={school} />
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default Class;

const styles = StyleSheet.create({
  TextCont: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    top: hp('65%'),
    left: wp('23%'),
  },
  LoadingText: {
    color: 'rgba(24, 44, 97,1.0)',
  },
});
