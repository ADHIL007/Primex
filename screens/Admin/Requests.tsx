import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  addDoc,
  getDoc,
} from 'firebase/firestore';
import {Firebase_DB, Firebase_Auth} from '../FirebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth/cordova';

const Requests = () => {
  const [reqs, setReqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const UserCollection = collection(Firebase_DB, 'Users');
  const RequestsCollection = collection(Firebase_DB, 'Requests');
  const auth = Firebase_Auth;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsCollection = collection(Firebase_DB, 'Requests');
        const querySnapshot = await getDocs(requestsCollection);

        if (querySnapshot.empty) {
          setEmpty(true);
        } else {
          const requestsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setReqs(requestsData);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
        Alert.alert('Error', 'An error occurred while fetching requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async requestId => {
    try {
      const docRef = doc(Firebase_DB, 'Requests', requestId);
      const docSnap = await getDoc(docRef);

      await addDoc(UserCollection, docSnap.data());
      createUserWithEmailAndPassword(
        auth,
        docSnap.data().email,
        docSnap.data().password,
      );

      await deleteDoc(doc(RequestsCollection, requestId));

      Alert.alert(
        'Request Accepted',
        'The request has been accepted successfully.',
      );

      setReqs(prevReqs => prevReqs.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Error accepting request:', error);
      Alert.alert(
        'Error',
        'An error occurred while accepting the request. Please try again.',
      );
    }
  };

  const handleReject = async requestId => {
    try {
      await deleteDoc(doc(RequestsCollection, requestId));

      Alert.alert(
        'Request Rejected',
        'The request has been rejected successfully.',
      );

      setReqs(prevReqs => prevReqs.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Error rejecting request:', error);
      Alert.alert(
        'Error',
        'An error occurred while rejecting the request. Please try again.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Requests</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00B8A9" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : empty ? (
        <View style={styles.emptyContainer}>
          <Image
            style={styles.emptyImage}
            source={require('../../assets/Backgrounds/bear.png')}
          />
          <Text style={styles.emptyText}>No requests yet</Text>
          <Text style={styles.emptyText}>Check back later</Text>
        </View>
      ) : (
        <ScrollView>
          {reqs.map(req => (
            <View style={styles.requestContainer} key={req.id}>
              <Text style={styles.requestText}>Name: {req.Fullname}</Text>
              <Text style={styles.requestText}>Email: {req.email}</Text>
              <Text style={styles.requestText}>
                Phone number: {req.phoneNumber}
              </Text>
              <Text style={styles.requestText}>School: {req.school}</Text>

              <View style={styles.iconContainer}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleAccept(req.id)}>
                  <Image
                    source={require('../../assets/graphics/accept.png')}
                    style={styles.iconImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleReject(req.id)}>
                  <Image
                    source={require('../../assets/graphics/delete-button.png')}
                    style={styles.iconImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flex: 1,
  },
  emptyText: {
    fontSize: 18,
    color: '#333',
    fontStyle: 'italic',
    textAlign: 'center',
    opacity: 0.5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,

    textAlign: 'center',
    color: '#00B8A9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#00B8A9',
    fontStyle: 'italic',
  },
  requestContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 25,
    borderRadius: 12,
    width: 350,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
  },
  requestText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  iconButton: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 8,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
});

export default Requests;
