import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import ProgressChart2 from './ProgressChart2';
import {RFPercentage} from 'react-native-responsive-fontsize';
import CurrentData from './CurrentData';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import { Firebase_DB } from '../FirebaseConfig';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
const {width, height} = Dimensions.get('window');
const DetailedView = ({route}) => {
  const navigation = useNavigation();
  const {school} = route.params;
  const [rating ,setrating] =useState(0)
  const staffs = Math.round((parseInt(school.boys) + parseInt(school.girls)) / 20);
  console.log('staffs required ::' + staffs);
  const staffs_index = school.numberOfStaffs / staffs;
  console.log('staffs index ::' + staffs_index);
  const fetchRating = async () => {
    const schoolData = school
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
      setrating(roundedRating)
      const collectionRef = collection(Firebase_DB, 'Schools'); // Change 'Schools' to the correct collection name

      console.log('schoolName:', school.schoolName);

      const querySnapshot = await getDocs(
        query(collectionRef, where('schoolName', '==', school.schoolName)),
      );

      querySnapshot.forEach(doc => {
        const docRef = doc.ref;
        updateDoc(docRef, {rating: roundedRating}); // Fix the updateDoc function call
      });

    } catch (error) {
      console.error('Error fetching rating:', error);
    }
  };

  useEffect(()=>{
fetchRating()
  },[])
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headCont}>
        <Text
          style={{
            color: 'rgba(52, 73, 94,1.0)',
            fontSize: heightPercentageToDP('4.5%'),
          }}>
          {school.schoolName}
        </Text>
        <View></View>
        <Text
          style={{
            color: 'rgba(52, 73, 94,1.0)',
            fontSize: heightPercentageToDP('2.5%'),
          }}>
          {school.location}
        </Text>
        {school.Board == 0 ||
        school.Bench_and_Desk === 0 ||
        school.Board == 0 ? (
          <Text style={styles.statusLabel}>Data is not updated</Text>
        ) : (
          <Text style={styles.statusLabelGreen}>Data is up to date</Text>
        )}
      </View>
      <View>
        <ProgressChart2
          data={rating} // Convert rating from a scale of 0 to 1 to a scale of 0 to 100
          color={
            rating / 5 < 0.45
              ? '255, 63, 52' // Red for values less than 0.45
              : rating / 5 < 0.75
              ? '255, 191, 0' // Orange for values between 0.45 and 0.75
              : '0, 255, 0' // Green for values greater than or equal to 0.75
          }
          label={'rating'}
        />
      </View>
      <View
        style={{
          marginBottom: heightPercentageToDP('5%'),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: heightPercentageToDP('25%'),
          }}>
          <Text
            style={{
              color: 'rgba(52, 73, 94,1.0)',
              fontSize: heightPercentageToDP('2.5%'),
            }}>
            Number of Staffs {'   '}
          </Text>
          <Text
            style={{
              color:
                staffs_index < 0.45
                  ? 'rgb(255, 63, 52)'
                  : staffs_index < 0.95
                  ? 'rgb(255, 191, 0)'
                  : 'rgb(0, 255, 0)',
              fontSize: heightPercentageToDP('4.5%'),
            }}>
            {school.numberOfStaffs}
          </Text>
        </View>
        <View style={{marginTop: 10, marginRight: heightPercentageToDP('15%')}}>
          <ProgressChart2
            data={staffs_index > 1 ? 1 : staffs_index} // Convert rating from a scale of 0 to 1 to a scale of 0 to 100
            color={
              staffs_index < 0.45
                ? '255, 63, 52' // Red for values less than 0.45
                : staffs_index < 0.95
                ? '255, 191, 0' // Orange for values between 0.45 and 0.75
                : '0, 255, 0' // Green for values greater than or equal to 0.75
            }
            label={'staffs'}
          />
          <Text
            style={{
              color: 'rgba(52, 73, 94,1.0)',
              fontSize: heightPercentageToDP('3%'),
              fontWeight: 'bold',
              marginTop: heightPercentageToDP('-4%'),
              marginLeft: widthPercentageToDP('69%'),
            }}>
            {Math.round(staffs_index * 100)}%
          </Text>
        </View>
        <View style={styles.Scontainer}>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Total Required Staffs</Text>
            <Text style={styles.value}>{staffs}</Text>
          </View>
          {school.numberOfStaffs > staffs ? (
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Excess Staffs</Text>
              <Text style={[styles.value, {color: 'rgb(0, 255, 0)'}]}>
                {school.numberOfStaffs - staffs}
              </Text>
            </View>
          ) : (
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Need</Text>
              <Text style={[styles.value, {color: 'red'}]}>
                {staffs - school.numberOfStaffs}
              </Text>
            </View>
          )}
        </View>
      </View>
      {school.numberOfStaffs < staffs ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('ExcessStaffsView')
          }>
          <Text style={styles.buttonText}>View Schools with Extra Staff</Text>
          <Icon name="arrow-right" size={18} color="rgba(52, 73, 94,1.0)" />
        </TouchableOpacity>
      ) : (
        <Text style={styles.text}>
          Staffs Requirement is met
          <Icon
            name="check-circle"
            size={heightPercentageToDP('2.5%')}
            color="#0be881"
          />
        </Text>
      )}

      <View>
        <CurrentData data={school} />
      </View>
    </ScrollView>
  );
};

export default DetailedView;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(52, 73, 94,1.0)',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'rgba(52, 73, 94,1.0)',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    color: '#0be881',
    fontSize: heightPercentageToDP('2.5%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Scontainer: {
    width: '100%',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'rgba(52, 73, 94,1.0)',
    fontSize: heightPercentageToDP('2.5%'),
  },
  value: {
    color: 'rgba(52, 73, 94,1.0)',
    fontSize: heightPercentageToDP('3.5%'),
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingVertical: 40,
  },
  headCont: {
    marginTop: 50,
  },
  statusLabel: {
    position: 'absolute',
    top: 80,
    left: 1,
    color: 'red',
    fontSize: RFPercentage(1.5),
    borderWidth: 1,
    borderColor: 'red',
    padding: 5,
    borderRadius: 15,
  },
  statusLabelGreen: {
    position: 'absolute',
    top: 80,
    left: 1,
    color: 'green',
    fontSize: RFPercentage(1.5),
    borderWidth: 1,
    borderColor: 'green',
    padding: 5,
    borderRadius: 15,
  },
});
