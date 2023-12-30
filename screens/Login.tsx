import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator, // Added ActivityIndicator for loading feedback
} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

import {signInWithEmailAndPassword} from 'firebase/auth';
import {Firebase_Auth} from './FirebaseConfig';
import {storeData} from './AsyncStorage';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: LoginProps) => {
  const auth = Firebase_Auth;

  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState('Rep');
  const [loading, setLoading] = useState(false); // Added loading state

  const handleLogin = () => {
    setLoading(true); // Set loading to true when login starts
console.log('Login reached');

    if (checked === 'admin') {
      const admin = {
        userid: '',
        password: '',
      };

      if (userid === admin.userid && password === admin.password) {
        navigation.replace('Admin');
        storeData('USERSTATUS', true);
          storeData('USERID', 'ADMIN');
      } else {
        setLoading(false); // Reset loading on login failure
        console.log('Incorrect admin credentials');
      }
    } else {
      signInWithEmailAndPassword(auth, userid, password)
        .then(userCredential => {
          console.log('User logged in successfully:', userCredential);
          storeData('USERSTATUS', true);
          storeData('USERID','USER');
          navigation.replace('Home');
        })
        .catch(error => {
          setLoading(false); // Reset loading on login failure
          console.log('Error', error);
          Alert.alert(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Backgrounds/Asiankidsreading.jpg')}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}></View>
      <Text style={styles.title}>Login</Text>
      <View style={styles.RadCont}>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="Rep"
            status={checked === 'Rep' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Rep')}
            color="#00B8A9"
          />
          <Text style={styles.radioButtonLabel}>Representative</Text>
        </View>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="admin"
            status={checked === 'admin' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('admin')}
            color="#00B8A9"
          />
          <Text style={styles.radioButtonLabel}>Admin</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="User ID or email"
          placeholderTextColor={styles.placeholder.color}
          autoFocus={true}
          value={userid}
          onChangeText={text => setUserid(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor={styles.placeholder.color}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator color="#00B8A9" size="small" /> // Show loading indicator
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={styles.linkCont}>
        <Text style={{color: 'white', fontSize: 18}}>
          Don't Have an Account
        </Text>
        <Link
          to={{screen: 'Signup'}}
          style={{color: '#00B8A9', fontSize: 18, fontStyle: 'italic'}}>
          Sign up now
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#00B8A9',
    marginBottom: 30,
    zIndex: 1, // Place it above the overlay
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Adjusted margin
  },
  RadCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Adjusted margin
  },
  radioButtonLabel: {
    marginLeft: 10,
    fontSize: 18,
    color: '#00B8A9',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 10, // Adjusted margin
    zIndex: 1, // Place it above the overlay
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: '#eee',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  placeholder: {
    color: '#eee',
  },
  loginButton: {
    borderWidth: 2,
    borderColor: '#00B8A9',
    padding: 15,
    width: '80%',
    borderRadius: 5,
    marginTop: 30,
    backgroundColor: 'transparent',
    zIndex: 1, // Place it above the overlay
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

export default Login;
