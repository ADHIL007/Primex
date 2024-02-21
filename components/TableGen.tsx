import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import store from '../Redux/Store';

const TableGen = () => {
  const [data, setData] = useState([]);
  setTimeout(() => {setData(store.getState().predData)}, 1000);


  return (
    <View style={styles.container}>

      <View style={[styles.row, styles.head]}>
        <Text style={styles.headText}>Total Students</Text>
        <Text style={styles.headText}>Total Tests</Text>
        <Text style={styles.headText}>Average Attendance</Text>
        <Text style={styles.headText}>Average Test Prep Score</Text>
        <Text style={styles.headText}>Average Mental Health Score</Text>
      </View>

      {/* Table Data */}
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.dataText}>{item.total_students}</Text>
          <Text style={styles.dataText}>{item.total_tests}</Text>
          <Text style={styles.dataText}>{item.average_attendance}</Text>
          <Text style={styles.dataText}>{item.average_test_prep_score}</Text>
          <Text style={styles.dataText}>{item.average_mental_health_score}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#c8e1ff',
    paddingVertical: 8,
  },
  head: {
    backgroundColor: '#f1f8ff',
  },
  headText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  dataText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
});

export default TableGen;
