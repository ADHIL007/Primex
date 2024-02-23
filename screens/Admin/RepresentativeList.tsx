import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Firebase_DB} from '../FirebaseConfig';
import {collection, deleteDoc, doc, getDocs} from 'firebase/firestore';
import {Alert} from 'react-native';
const RepresentativeList = () => {
  const [representatives, setRepresentatives] = useState([]);
  const [loading, setLoading] = useState(true);
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
  }, []);

  const handleDelete = async representativeId => {
    try {
      // Construct a reference to the document to be deleted
      const representativeRef = doc(collectionRef, representativeId);

      // Show an alert for confirmation with password prompt
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
            onPress: () => {
              // Prompt for password
              // await deleteDoc(representativeRef);
              // Update local state to remove the deleted representative
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
    <View style={styles.container}>
      <Text style={styles.title}>Representative List</Text>
      {loading ? (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="#0000ff"
        />
      ) : representatives.length > 0 ? (
        representatives.map((representative, index) => (
          <TouchableOpacity key={index} style={styles.itemContainer}>
            <View style={styles.itemContent}>
              <Text style={styles.itemText}>{representative.Fullname}</Text>
              <Text style={styles.itemText}>{representative.email}</Text>
              <Text style={styles.itemText}>{representative.phoneNumber}</Text>
              <Text style={styles.itemText}>{representative.school}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleDelete(representative.id)}>
              <AntDesign name="delete" size={24} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noDataText}>No representatives found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1e272e',
  },
  loading: {
    marginTop: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e272e',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
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
  },
  removeButton: {
    backgroundColor: '#ff4d4f',
    borderRadius: 50,
    padding: 10,
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RepresentativeList;
