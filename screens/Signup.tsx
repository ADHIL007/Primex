import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Link} from '@react-navigation/native';

import {addDoc, collection, query, where, getDocs} from 'firebase/firestore';
import {getData, storeData} from './AsyncStorage';
import {Firebase_Auth, Firebase_DB} from './FirebaseConfig';

const Signup = ({navigation}) => {
  const auth = Firebase_Auth;

  // List of schools for the dropdown
  const [schools, setSchools] = useState([]);


const getSchoolList = async () => {
  try {
    const querySnapshot = await getDocs(collection(Firebase_DB, 'Schools'));
    const schoolsData = [];

    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data().schoolName);
      schoolsData.push(doc.data().schoolName);
    });

    setSchools(schoolsData);
    storeData('SCHOOLLIST', schoolsData);
    storeData('SCHOOLS', schoolsData);
  } catch (error) {
    console.error('Error getting school list:', error);
  }
};

useEffect(() => {
  // Call the function to retrieve and update the school list
  getSchoolList();
}, []);



  // // State variables
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle the signup process
  const handleSignup = async () => {
    if (password.length !== 6) {
      Alert.alert('Password must be 6 characters long');
    } else {

    try {
      setLoading(true);

      const UserCollection = collection(Firebase_DB, 'Users');
      const Requests = collection(Firebase_DB, 'Requests');

      const userQuery = query(
        UserCollection,
        where('email', '==', email),
        where('school', '==', selectedSchool)
      );

      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        setLoading(false);
        Alert.alert(
          'Representative Already Exists',
          'If you wish to change the representative for your school, please contact the administrator.'
        );
        return;
      }

      const requestQuery = query(
        Requests,
        where('email', '==', email),
        where('school', '==', selectedSchool)
      );

      const requestSnapshot = await getDocs(requestQuery);

      if (!requestSnapshot.empty) {
        setLoading(false);
        Alert.alert(
          'Request already exists',
          'Your request is pending. Please wait until an admin verifies your request.'
        );
        return;
      }

      if (userSnapshot && requestSnapshot) {
        const newRequestDoc = await addDoc(Requests, {
          Fullname: username,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          school: selectedSchool,
        });

        // Define a separate async function to use await
        const handleAsyncOperation = async (data) => {
          if (data != null) {
            navigation.replace('Login');
            setLoading(false);
            Alert.alert(
              'Registration Request Placed',
              'Please wait for admin verification. Check your email within 24 hours.'
            );
            console.log('Document written with ID: ', data.id);
            console.log('BEFORE', await getData('USERID'));
            storeData('USERID', data.id);
            console.log('AFTER', await getData('USERID'));
          }
        };

        // Use the async function inside the then block
        handleAsyncOperation(newRequestDoc);
      } else {
        setLoading(false);
        console.log('USER ALREADY EXISTS');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error during signup: ', error);
      Alert.alert(
        'Signup failed',
        'An error occurred during signup. Please try again.'
      );
    }
  }
  };

  // Check if the confirm password matches the password
  const checkConfirmPassword = text => {
    setConfirmPassword(text);
    setWrongPassword(password !== text);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Backgrounds/desk.jpg')}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}></View>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhone(text)}
          inputMode="tel"
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          keyboardType='number-pad'

          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={[
            styles.input,
            { borderBottomColor: wrongPassword ? 'red' : '#fff' },
          ]}
          placeholder="Confirm Password"
          secureTextEntry
          keyboardType='number-pad'

          value={confirmPassword}
          onChangeText={(text) => checkConfirmPassword(text)}
          placeholderTextColor="#fff"
        />
        <SelectDropdown
          data={schools}
          onSelect={(selectedItem, index) => {
            setSelectedSchool(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          defaultButtonText="Select School"
          buttonStyle={styles.dropdownButton}
          buttonTextStyle={styles.dropdownButtonText}
          dropdownStyle={styles.dropdown}
          rowStyle={styles.dropdownRow}
          rowTextStyle={styles.dropdownRowText}
          onFocus={getSchoolList}
        />
      </View>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#00B8A9" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
      <View style={styles.linkCont}>
        <Text style={{ color: '#fff', fontSize: 18 }}>
          Already have an Account
        </Text>
        <Link
          to={{ screen: 'Login' }}
          style={{
            color: '#00B8A9',
            fontSize: 18,
            fontStyle: 'italic',
          }}
        >
          Login now
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: undefined,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#00B8A9',
    zIndex: 1,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
    zIndex: 1,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  dropdownButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    padding: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#fff',
    width: 340,
    fontSize: 18,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  dropdownButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius:10

  },
  dropdownRow: {
    padding: 12,
    borderBottom: '1px solid transparent',
  },
  dropdownRowText: {
    color: '#333',
    textAlign: 'center',
    fontSize: 16,
  },
  signupButton: {
    borderWidth: 2,
    borderColor: '#00B8A9',
    padding: 15,
    width: '80%',
    borderRadius: 5,
    marginTop: 30,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#00B8A9',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkCont: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
});

export default Signup;
