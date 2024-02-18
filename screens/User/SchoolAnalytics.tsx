import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Linechart from './Linechart';
import { RFPercentage } from 'react-native-responsive-fontsize';
import store from '../../Redux/Store';
import { storeData } from '../AsyncStorage';

const SchoolAnalytics = ({ navigation }) => {
  const [dataExist, setDataExist] = useState(true);

  useEffect(() => {
    const SchoolData = store.getState().CurrentSchoolData;
    console.log('Prev pass:'+SchoolData.prevpass);

    storeData('PREVPASS', SchoolData.prevpass);

    try {
      if (!SchoolData || SchoolData.prevpass.length === 0) {
        console.log('Prev data is empty. Add school data to get analytics.');
        setDataExist(false);
      }

    } catch (error) {
      console.error('An error occurred:', error);
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {dataExist ? (
        <>
          <View style={styles.chartContainer}>
            <Text style={styles.title}>Data Analysis for Last 6 Months</Text>
            <Linechart
              chartdata={[20, 45, 28, 80, 99, 43]}
              color={() => '#1abc9c'}
              timeline="present"
            />
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.title}>Model A Prediction</Text>
            <Linechart
              chartdata={[30, 25, 38, 90, 49, 63]}
              color={() => '#b71540'}
              timeline="future"
            />
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.title}>Model B Prediction</Text>
            <Linechart
              chartdata={[40, 65, 78, 80, 69, 73]}
              color={() => '#0a3d62'}
              timeline="future"
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.noDataText}>No data available for this school.</Text>
          <Text style={[styles.noDataText, { margin: 10, fontSize: RFPercentage(2) }]}>
            To view analytics, update school data with previous year's pass percentages.
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
    </ScrollView>
  );
};

export default SchoolAnalytics;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  chartContainer: {
    marginTop: 20,
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
  button: {
    borderWidth: 2,
    borderColor: '#1e272e',
    padding: 15,
    width: '50%',
    borderRadius: 5,
    marginTop: 30,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#1e272e',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
