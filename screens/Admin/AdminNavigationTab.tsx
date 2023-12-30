import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Analytics from './Analytics';
import Requests from './Requests';
import Profile from './Profile';
import AdminHome from './AdminHome';
import { Firebase_DB } from '../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Tab = createBottomTabNavigator();

const AdminNavigationTab = () => {
  const [length, setLength] = useState(0);

  useEffect(() => {
    const fetchRequestsLength = async () => {
      try {
        const requestsCollection = collection(Firebase_DB, 'Requests');
        const querySnapshot = await getDocs(requestsCollection);
        setLength(querySnapshot.size); // Use size to get the number of documents
      } catch (error) {
        console.error('Error fetching requests length:', error);
      }
    };

    fetchRequestsLength();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#00B8A9',
        tabBarStyle: {
          height: 60,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 8,
        },
        tabBarIconStyle: {
          marginBottom: -1,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={AdminHome}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={Analytics}
        options={{
          tabBarLabel: 'Analytics',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={Requests}
        options={{
          tabBarLabel: 'Requests',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-list" color={color} size={size} />
          ),
          tabBarBadge: length > 0 ? length : null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminNavigationTab;
