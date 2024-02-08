import React, {useEffect, useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import {Link, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {Vibration} from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {Firebase_Auth} from './FirebaseConfig';
import {storeData} from './AsyncStorage';
import LottieView from 'lottie-react-native';
type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: LoginProps) => {
  const auth = Firebase_Auth;
  const [loginStatus, setLoginStatus] = useState(false);
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  useEffect(() => {
    // Check login status and redirect accordingly
    if (loginStatus) {
      if(userid==='Admin'){
        setTimeout(() => {
          navigation.replace('Admin');
         },5500)
      }else{
        setTimeout(() => {
          navigation.replace('Home');
         },5500)
      }



    }
  }, [loginStatus, navigation]);

  const handleLogin = async () => {
    setLoading(true); // Set loading to true when login starts
    console.log('Login reached');

    const admin = {
      userid: 'Admin',
      password: '123',
    };

    if (userid === admin.userid && password === admin.password) {
      // For admin login
      storeData('USERSTATUS', true);
      storeData('USERID', 'ADMIN');
      setLoginStatus(true);
    } else if (userid !== '' && password !== '') {
      // For regular user login
      try {
        const userCredential = await signInWithEmailAndPassword(auth, userid, password);
        console.log('User logged in successfully:', userCredential);
        storeData('USERSTATUS', true);
        storeData('USERID', 'USER');
        setLoginStatus(true);
      } catch (error) {
        setLoading(false); // Reset loading on login failure
        console.log('Error', error);
        Alert.alert(error.message);
      }
    } else {
      Alert.alert('Please enter username and password');

    }
  };


  return (
    <>

      {loginStatus ? (
        <View style={styles.lottiecontainer}>
          <LottieView source={require('../assets/gifs/Loginsuccess.json')} autoPlay loop style={{flex: 1,width: 600, height: 600}} />
       <Text style={styles.lottieText}>Login SuccessFull</Text>
       <Text style={[styles.lottieText, {fontSize: 30,top: "70%"}]}>Redirecting...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Welcome Back!</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="User ID or email"
              placeholderTextColor={styles.placeholder.color}
              autoFocus={false}
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
          <View style={styles.buttonCont}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              {loading ? (
                <ActivityIndicator color="#1e272e" size="small" /> // Show loading indicator
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
            <View style={styles.linkCont}>
              <Text style={{color: '#1e272e', fontSize: 18}}>
                Don't Have an Account
              </Text>
              <Link
                to={{screen: 'Signup'}}
                style={{color: '#05c46b', fontSize: 18, fontStyle: 'italic'}}>
                Sign up now
              </Link>
            </View>
          </View>

      <LottieView
        source={require('../assets/gifs/Login.json')}
        autoPlay
        loop
        style={styles.lottCont}
      />

        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    height: '100%',
    width: '100%',
    padding: 20,
  },
  lottiecontainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  lottieText:{
    position: 'absolute',
    top:'65%',
fontSize: 40,
color: '#1e272e',

  },
  lottCont: {
    flex: 1,

  },

  buttonCont: {
    alignItems: 'center',
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#1e272e',
    marginBottom: 40,
    zIndex: 1, // Place it above the overlay
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Adjusted margin
  },
  RadCont: {
    flexDirection: 'row',
  },
  radioButtonLabel: {
    marginLeft: 10,
    fontSize: 18,
    color: '#1e272e',
  },
  inputContainer: {
    width: '98%',
    marginBottom: 10, // Adjusted margin
    zIndex: 1, // Place it above the overlay
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
  placeholder: {
    color: '#1e272e',
    opacity: 0.5,
  },
  loginButton: {
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

export default Login;
