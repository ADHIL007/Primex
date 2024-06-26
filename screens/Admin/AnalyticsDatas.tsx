import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const AnalyticsDatas = ({ count, countOfStaffs }) => {
  const numberOfSchoolsLabel = 'Number of Schools'; // Provide the label text here

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.numberOfSchoolsLabel}>{numberOfSchoolsLabel}</Text>
        <Text style={styles.numberOfSchools}>{count}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.numberOfSchoolsLabel}>Number of Staffs</Text>
        <Text style={styles.numberOfSchools}>{countOfStaffs}</Text>
      </View>
    </View>
  );
};

export default AnalyticsDatas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  numberOfSchoolsLabel: {
    fontSize: RFPercentage(2.1),
    color: '#555',
    textAlign: 'center',
    marginBottom: 8,
  },
  numberOfSchools: {
    fontSize: RFPercentage(3.5),
    color: '#333',
    textAlign: 'center',
  },
});
