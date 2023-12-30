import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type MainProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const Main = ({navigation}: MainProps) => {
  const [response, setResponse] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Checking user status...');
    checkUserStatus();
  }, []); // Empty dependency array to run once when the component mounts

  const checkUserStatus = async () => {
    try {
      // Retrieve user status and ID from AsyncStorage
      const result = await AsyncStorage.getItem('USERSTATUS');
      const userId = await AsyncStorage.getItem('USERID');
      setUser(userId);
      setResponse(result);
      // Log the response and user ID
      console.log('Response:', result, 'Type:', typeof result);
      console.log('User ID:', userId, 'Type:', typeof userId);

      if (result !== null && userId !== null) {
        // If user status and ID are not null
        setTimeout(() => {
          console.log('Navigating to Home page...');

          // Check if the user is an admin and navigate accordingly
          if (userId === '"ADMIN"') {
            console.log('Navigating to Admin');

            navigation.replace('Admin');
          } else {
            console.log('Navigating to User');

            navigation.replace('Home');
          }

          setLoading(false);
        }, 3000); // Redirect after 3 seconds
      } else {
        // If user status or ID is null
        console.log('User status or ID is null');
        setTimeout(() => {
          setLoading(false);
          navigation.replace('Login');
        }, 3000);
      }
    } catch (error) {
      // Handle errors during the process
      console.error('Error checking user status:', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <Image
            style={styles.emptyImage}
            source={
              response !== 'true'
                ? require('../assets/Backgrounds/sadcat.png')
                : require('../assets/Backgrounds/happycat.png')
            }
          />
          <Text style={styles.emptyText}>
            {response !== 'true'
              ? 'Not logged in'
              : `You are logged in as ${user}`}
          </Text>
          <Text style={styles.emptyText}>
            Redirecting to {response !== 'true' ? 'login' : 'Home'}...
          </Text>
          <ActivityIndicator size="large" color="#00B8A9" />
        </View>
      )}
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    resizeMode: 'contain',
    marginTop: 10,
  },
  emptyText: {
    fontSize: 18,
    color: '#333',
    fontStyle: 'italic',
    textAlign: 'center',
    opacity: 0.5,
    marginBottom: 20,
  },
});
