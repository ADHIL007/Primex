import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Classification = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Class')}>
      <Text style={styles.text}>Detailed Analytics</Text>
      <Ionicons
        name="chevron-forward-outline"
        size={RFPercentage(3.5)}
        color="#1e272e"
      />
    </TouchableOpacity>
  );
};

export default Classification;

const styles = StyleSheet.create({
  container: {

    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: '#1e272e',
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
  },
});
