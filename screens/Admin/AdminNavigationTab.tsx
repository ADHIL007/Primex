import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Analytics from './Analytics';
import Requests from './Requests';
import Profile from './Profile';
import AdminHome from './AdminHome';
import store from '../../Redux/Store';

const Tab = createBottomTabNavigator();

const AdminNavigationTab = () => {


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
      }}>
      <Tab.Screen
        name="AdminHome"
        component={AdminHome}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
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
          tabBarIcon: ({color, size}) => (
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
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="view-list"
              color={color}
              size={size}
            />
          ),
          tabBarBadge:
            store.getState().REQUESTS > 0 ? store.getState().REQUESTS : null,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminNavigationTab;
