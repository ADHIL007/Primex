import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import store from '../Redux/Store';

const TableGen = () => {
const data = store.getState().predData
const school = store.getState().CurrentSchoolData
console.log(school);


  return (
    <View style={styles.container}>


    </View>
  );
}

const styles = StyleSheet.create({

});

export default TableGen;
