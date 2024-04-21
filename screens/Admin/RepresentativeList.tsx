import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Firebase_DB } from '../FirebaseConfig';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { Alert } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const RepresentativeList = () => {
  const [representatives, setRepresentatives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animation] = useState(new Animated.Value(0));
  const collectionRef = collection(Firebase_DB, 'Users');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collectionRef);
        const representativeList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRepresentatives(representativeList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching representatives:', error);
        setLoading(false);
      }
    };

    fetchData();

    // Start animation when component mounts
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleDelete = async representativeId => {
    try {
      const representativeRef = doc(collectionRef, representativeId);

      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this representative?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              await deleteDoc(representativeRef);
              setRepresentatives(prevState =>
                prevState.filter(rep => rep.id !== representativeId),
              );
            },
          },
        ],
      );
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{  }}>
        {loading ? (
          <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
        ) : representatives.length > 0 ? (
          representatives.map((representative, index) => (
            <Animated.View
              key={index}
              style={[
                styles.itemContainer,
                {
                  opacity: animation,
                  transform: [{ translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [100, 0],
                  }) }],
                },
              ]}
            >
              <View style={styles.itemContent}>
                <Text style={styles.itemText}>{representative.Fullname}</Text>
                <Text style={styles.itemText}>{representative.email}</Text>
                <Text style={styles.itemText}>{representative.phoneNumber}</Text>
                <Text style={styles.itemText}>{representative.school}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleDelete(representative.id)}
              >
                <AntDesign name="delete" size={24} color="#ff5e57" />
              </TouchableOpacity>
            </Animated.View>
          ))
        ) : (
          <Text style={styles.noDataText}>No representatives found.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    padding: 20
  },
  loading: {
    marginTop: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4bcffa',
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  removeButton: {
    borderWidth: 1,
    borderColor: '#ff5e57',
    borderRadius: 50,
    padding: 10,
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RepresentativeList;
