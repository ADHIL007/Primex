import {StyleSheet, View} from 'react-native';
import React from 'react';
import AdminNavigationTab from './Admin/AdminNavigationTab';



const Admin = () => {
  console.log('Admin Home reached');
  return (
    <View style={styles.container}>

      <AdminNavigationTab />
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },
});
