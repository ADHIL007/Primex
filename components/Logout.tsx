import React from 'react';
import { View,  StyleSheet ,Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Logout = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Add any additional cleanup or logout logic here
      await AsyncStorage.clear();

      console.log('User logged out successfully');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style ={styles.button}>
        <Image source={require('../assets/graphics/logout.png')} style ={styles.image}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 16,
  },
  button :{
width :40,
height:40
  },
  image :{
    width :'100%',
height:'100%'
  }


});

export default Logout;
