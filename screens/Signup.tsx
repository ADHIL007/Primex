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
  ScrollView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {Link} from '@react-navigation/native';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import {addDoc, collection, query, where, getDocs} from 'firebase/firestore';
import {getData, storeData} from './AsyncStorage';
import {Firebase_Auth, Firebase_DB} from './FirebaseConfig';

const Signup = ({navigation}) => {
  const auth = Firebase_Auth;

  // List of schools for the dropdown
  const [schools, setSchools] = useState([]);
const [alreadyExist, setAlreadyExist] = useState(false);
const [norqst, setNorqst] = useState(false);
const getSchoolList = async () => {
  try {
    const querySnapshot = await getDocs(collection(Firebase_DB, 'Schools'));
    const schoolsData = [];

    querySnapshot.forEach((doc) => {
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
      Alert.alert('Password must be 6 characters long or more');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please make sure your passwords match.');
      return;
    }

    try {
      setLoading(true);

      const Requests = collection(Firebase_DB, 'Requests');

      const userQuery = collection(Firebase_DB, 'Users');
      const userDocSnapshot = await getDocs(userQuery);
      userDocSnapshot.forEach(doc => {
        const userData = doc.data();
        if (userData.email === email) {
          setLoading(false);
          Alert.alert(
            'Email Already Exists',
            'If you wish to change your email, please contact the administrator.'
          );
          console.log('Email already exists');
          setAlreadyExist(true);
          return;
        }
      });

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
        setNorqst(true);
        return;
      }

      const newRequestDoc = await addDoc(Requests, {
        Fullname: username,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        school: selectedSchool,
      });

      setLoading(false);
      Alert.alert(
        'Registration Request Placed',
        'Please wait for admin verification. Check your email within 24 hours.'
      );
      console.log('Document written with ID: ', newRequestDoc.id);
      navigation.navigate('Login');
    } catch (error) {
      setLoading(false);
      console.error('Error during signup: ', error);
      Alert.alert(
        'Signup failed',
        'An error occurred during signup. Please try again.'
      );
    }
  };



  // Check if the confirm password matches the password
  const checkConfirmPassword = text => {
    setConfirmPassword(text);
    setWrongPassword(password !== text);
  };

  const [progressCount, setProgressCount] = useState(0);

  useEffect(() => {
    // Calculate progress based on the completion of fields
    const progress = calculateProgress(username, email, phoneNumber, password, confirmPassword, selectedSchool);
    setProgressCount(progress);
  }, [username, email, phoneNumber, password, confirmPassword, selectedSchool]);

  const calculateProgress = (username, email, phoneNumber, password, confirmPassword, selectedSchool) => {
    // Calculate the completion of each field and sum them up
    let completion = 0;
    if (username !== '') completion += 1 / 6;
    if (email !== '') completion += 1 / 6;
    if (phoneNumber !== '') completion += 1 / 6;
    if (password !== '') completion += 1 / 6;
    if (confirmPassword !== '') completion += 1 / 6;
    if (selectedSchool !== '') completion += 1 / 6;
    return completion;
  };
  return (
    <ScrollView>
    <View style={styles.container}>


      <Text style={styles.title}>Get Started !</Text>
      <ProgressBar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={progressCount}
          color='#273c75'
          style={{height: 20}}
        />
      <View style={styles.inputContainer}>
      <TextInput
  style={styles.input}
  placeholder="Full Name"
  value={username}
  onChangeText={(text) => {
    setUsername(text);
  }}
  placeholderTextColor="#1e272e"
/>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {setEmail(text)}}
          placeholderTextColor="#1e272e"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => {setPhone(text)
          }}
          inputMode="tel"
          placeholderTextColor="#1e272e"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          keyboardType='number-pad'
          maxLength={6}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#1e272e"
        />
        <TextInput
          style={[
            styles.input,
            { borderBottomColor: wrongPassword ? 'red' : '#1e272e' },
          ]}
          maxLength={6}
          placeholder="Confirm Password"
          secureTextEntry
          keyboardType='number-pad'
          value={confirmPassword}
          onChangeText={(text) => checkConfirmPassword(text)}
          placeholderTextColor="#1e272e"
        />
        <SelectDropdown
          data={schools}
          onSelect={(selectedItem, index) => {
            setSelectedSchool(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}

          buttonStyle={styles.dropdownButton}
          buttonTextStyle={styles.dropdownButtonText}
          dropdownStyle={styles.dropdown}
          rowStyle={styles.dropdownRow}
          rowTextStyle={styles.dropdownRowText}
          onFocus={getSchoolList}
        />
      </View>
      <View style={styles.buttonCont}>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#1e272e" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
      <View style={styles.linkCont}>
        <Text style={{ color: '#1e272e', fontSize: 18 }}>
          Already have an Account
        </Text>
        <Link
          to={{ screen: 'Login' }}
          style={{
            color: '#05c46b',
            fontSize: 18,
            fontStyle: 'italic',
          }}
        >
          Login now
        </Link>
      </View>
    </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
padding:20
  },
  buttonCont:{
    alignItems: 'center',
  },
  title: {
    fontSize: 54,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#1e272e',
    zIndex: 1,
  },
  inputContainer: {
    width: '98%',
    marginBottom: 20,
    zIndex: 1,
marginTop:20
  },
  input: {
    borderWidth: 1,
    borderColor: '#1e272e',
    color: '#1e272e',
    fontSize: 23,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    height: 70,
  },
  dropdownButton: {
    backgroundColor: 'transparent',
    color: '#1e272e',
    padding: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#1e272e',
    width: '98%',
    fontSize: 18,

  },
  dropdownButtonText: {
    color: '#1e272e',
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius:10

  },
  dropdownRow: {
    padding: 12,
  },
  dropdownRowText: {
    color: '#1e272e',
    textAlign: 'center',
    fontSize: 16,
  },
  signupButton: {
    borderWidth: 2,
    borderColor: '#1e272e',
    padding: 15,
    width: '50%',
    borderRadius: 5,
    marginTop: 30,
    backgroundColor: 'transparent',
    zIndex: 1, // Place it above the overlay
  },
  buttonText: {
    color: '#1e272e',
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
