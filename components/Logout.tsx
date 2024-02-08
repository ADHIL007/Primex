import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFPercentage } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Logout = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Add any additional cleanup or logout logic here
      await AsyncStorage.clear();

      console.log('User logged out successfully');
      navigation.replace('LogoutAnime');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={{ color: '#fff' ,fontSize: RFPercentage(2.9)}}>Logout</Text>
      <MaterialCommunityIcons name="logout" color="#fff" size={RFPercentage(2.9)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    width: 150,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#0fbcf9',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
});

export default Logout;
