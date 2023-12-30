import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { getData } from '../AsyncStorage';
import FlatCard from '../../components/FlatCard';
import Horizontal from '../../components/Horizontal';
import Logout from '../../components/Logout';
import AdminNavigationTab from '../Admin/AdminNavigationTab';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeProps) => {
  console.log(' reached');
  return (
    <View style={styles.container}>

     <FlatCard />


    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#eee',
  },
});
