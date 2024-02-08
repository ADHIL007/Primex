import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AdminNavigationTab from './Admin/AdminNavigationTab';
import store from '../Redux/Store';
import { collection, getDocs } from 'firebase/firestore';
import { Firebase_DB } from './FirebaseConfig';
import { Provider } from 'react-redux';

const Admin = () => {


  return (
    <View style={styles.container}>

      <AdminNavigationTab  />
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
