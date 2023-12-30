// AsyncStorageUtils.js

import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store data in AsyncStorage
export const storeData = async (key, value) => {
  try {
    // Convert the value to JSON before storing
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);


    // Log success message
    console.log(`Data stored successfully for key: ${key}`);
  } catch (error) {
    // Log and handle errors
    console.error(`Error storing data for key ${key}:`, error);
  }
};

// Function to retrieve data from AsyncStorage
export const getData = async (key) => {
  try {
    const storedValue = await AsyncStorage.getItem(key);
    console.log(`Raw data retrieved for key ${key}:`, storedValue);

    // Parse the JSON data
    const parsedData = storedValue ? JSON.parse(storedValue) : null;
    console.log(`Parsed data for key ${key}:`, parsedData);

    return parsedData;

  } catch (error) {
    // Log and handle errors
    console.error(`Error retrieving data for key ${key}:`, error);
    return null;
  }
};
