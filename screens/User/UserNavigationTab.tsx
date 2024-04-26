import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Home from './Home';
import SchoolAnalytics from './SchoolAnalytics';
import UpdateData from './UpdateData';
import Profile from '../Admin/Profile';

const Tab = createBottomTabNavigator();

const UserNavigationTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="userHome"
      screenOptions={{
        tabBarActiveTintColor: '#18dcff',
        tabBarStyle: {
          height: 60,
          backgroundColor: '#FFFFFF', // Background color for the tab bar
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0', // Separator line color
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 8,
        },
        tabBarIconStyle: {
          marginBottom: -3,
        },
      }}
    >
      <Tab.Screen
        name="userHome"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SchoolAnalytics"
        component={SchoolAnalytics}
        options={{
          tabBarLabel: 'Analytics',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="UpdateData"
        component={UpdateData}
        options={{
          tabBarLabel: 'Update Data',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="note" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="userProfile"
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

const styles = StyleSheet.create({});

export default UserNavigationTab;
