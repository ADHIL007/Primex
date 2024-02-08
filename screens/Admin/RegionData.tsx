import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SchoolList from '../../components/SchoolList';

const RegionData = ({ route }) => {
  const { RegionID, SchoolData } = route.params;

  // Check if 'schools' is an array and has at least one item
  const firstSchool = SchoolData?.[0];

  // Extract values from the first school (assuming they are the same for all schools)
  const countofSchool = firstSchool?.totalSchools || 0;
  const countofStaff = firstSchool?.totalStaffs || 0;
  const countofStudents = firstSchool?.totalStudents || 0;
  const schools = firstSchool?.schools || [];

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Region {RegionID}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.label}>Total Schools</Text>
            <Text style={styles.value}>{countofSchool}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Staff Members</Text>
            <Text style={styles.value}>{countofStaff}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Students</Text>
            <Text style={styles.value}>{countofStudents}</Text>
          </View>
        </View>
      </View>

      {schools.length > 0 && (
        <View style={styles.schoolsContainer}>

          {schools.map((school, index) => (
            <SchoolList key={index} school={school} number = {index+1}/>
          ))}
        </View>
      )}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#4bcffa',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#fff',

  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  value: {
    fontSize: 34,
    color: '#fff',
  },
  schoolsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  schoolsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default RegionData;
