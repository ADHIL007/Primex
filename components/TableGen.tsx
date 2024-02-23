import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import store from '../Redux/Store';
import CircularProgress from 'react-native-circular-progress-indicator';
const TableGen = () => {
const data = store.getState().predData
const school = store.getState().CurrentSchoolData
console.log(school);


  return (
    <View style={styles.container}>
<CircularProgress
  value={85}
  inActiveStrokeColor={'#2ecc71'}
  inActiveStrokeOpacity={0.2}
  progressValueColor={'#fff'}
  valueSuffix={'%'}
/>

    </View>
  );
}

const styles = StyleSheet.create({

});

export default TableGen;
