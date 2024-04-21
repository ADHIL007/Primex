import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {getData} from '../AsyncStorage';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const ExcessStaffsView = () => {
  const [schoolData, setSchoolData] = useState([]);

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const schoolsData = await getData('SCHOOLS');
        const overStaffsData = schoolsData.filter(
          school =>
            school.numberOfStaffs >
            (parseInt(school.boys) + parseInt(school.girls)) / 10,
        );
        setSchoolData(overStaffsData);
      } catch (error) {
        console.error('Error fetching school data:', error);
      }
    };

    fetchSchoolData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Schools with Excess Staffs</Text>
      {schoolData.map((school, index) => (
        <View key={index} style={styles.schoolContainer}>
          <Text style={styles.schoolName}>{school.schoolName}</Text>
          <Text style={styles.info}>Location: {school.location}</Text>
          <Text style={styles.info}>
            Number of Staffs: {school.numberOfStaffs}
          </Text>
          <Text style={styles.info}>Boys: {school.boys}</Text>
          <Text style={styles.info}>Girls: {school.girls}</Text>
          <Text style={[styles.info, styles.excessStaffs]}>
            Excess Staffs:{' '}
            {school.numberOfStaffs -
              (parseInt(school.boys) + parseInt(school.girls)) / 10}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingVertical: 50,
  },
  heading: {
    fontSize: heightPercentageToDP("3%"),
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'rgba(24, 44, 97, 1.0)',
  },
  schoolContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(24, 44, 97, 1.0)',
    borderRadius: 5,
  },
  schoolName: {
    fontWeight: 'bold',
    fontSize: heightPercentageToDP("2.8%"),
    marginBottom: 5,
    color: 'rgba(24, 44, 97, 1.0)',
  },
  info: {
    fontSize: heightPercentageToDP("2.2%"),
    marginBottom: 3,
    color: 'rgba(24, 44, 97, 1.0)',
  },
  excessStaffs: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: heightPercentageToDP("2.4%"),
  },
});

export default ExcessStaffsView;
