import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA9wavU6U7Z5yW4qo0_kgtKiaKk3yfFzws",
    authDomain: "shah-604e0.firebaseapp.com",
    databaseURL: "https://shah-604e0-default-rtdb.firebaseio.com",
    projectId: "shah-604e0",
    storageBucket: "shah-604e0.appspot.com",
    messagingSenderId: "314438490932",
    appId: "1:314438490932:web:6dd46e5009a01fffeca361",
    measurementId: "G-DKS416TVM0"
  };
// Initialize Firebase
export const Firebase_app = initializeApp(firebaseConfig);
export const Firebase_Auth = initializeAuth(Firebase_app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
export const Firebase_DB = getFirestore(Firebase_app);



