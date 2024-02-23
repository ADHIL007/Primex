import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Classification = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Class')}>
      <Text style={styles.text}>Classifications</Text>
      <Ionicons name="chevron-forward-outline" size={RFPercentage(3.5)} color="#1e272e" />
    </TouchableOpacity>
  );
};

export default Classification;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#1e272e',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  text: {
    color: '#1e272e',
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold', // Added fontWeight for emphasis
  },
});
