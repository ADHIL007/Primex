import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getData} from '../AsyncStorage';
import {Firebase_DB} from '../FirebaseConfig';
import {collection, getDocs} from 'firebase/firestore';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const RecentActivity = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Reference to the 'Logs' collection
      const logsCollection = collection(Firebase_DB, 'Logs');
      const querySnapshot = await getDocs(logsCollection);
      const userData = [];
      querySnapshot.forEach(doc => {
        userData.push({...doc.data(), id: doc.id}); // Include document ID for each log
      });
      setData(userData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logContainer}>
        {data.map((log, index) => (
          <View key={index} style={styles.logItem}>
            <Text
              style={[
                styles.logText,
                {
                  color:
                    log.text == 'Updated: Data for the current month'
                      ? '#ffa801'
                      : '#0be881',
                },
              ]}>
              {log.text}
            </Text>
            <Text style={[styles.timestamp, {color: '#1a73e8'}]}>
              {log.sender}
            </Text>
            <Text style={styles.timestamp}>
              {new Date(log.timestamp.seconds * 1000).toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RecentActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  logContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: widthPercentageToDP('100%'),
  },
  logItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
});
