import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Admin from './screens/Admin';
import Profile from './screens/Admin/Profile';
import User from './screens/User';
import RegionData from './screens/Admin/RegionData';
import Main from './screens/Main';
import Analytics from './screens/Admin/Analytics';
import AdminHome from './screens/Admin/AdminHome';
import RepresentativeList from './screens/Admin/RepresentativeList';
import RecentActivity from './screens/Admin/RecentActivity';
import AddSchool from './screens/Admin/AddSchool';
import ManageSchool from './screens/Admin/ManageSchool';
import LogoutAnime from './screens/LogoutAnime';
import SchoolAnalytics from './screens/User/SchoolAnalytics';
import UpdateData from './screens/User/UpdateData';
import Activity from './screens/User/Activity';
import Class from './screens/Admin/Class';
import PredReport from './screens/User/PredReport';
import DetailedView from './screens/Admin/DetailedView';
import ExcessStaffsView from './screens/Admin/ExcessStaffsView';
import Chatroom from './screens/Chatroom';
import Settings from './screens/Admin/Settings';
import Chat from './screens/User/Chat';
import ChatAdmin from './screens/Admin/ChatAdmin';
import PublicView from './screens/PublicView';
import DetailedPublicView from './screens/DetailedPublicView';
export type RootStackParamList = {
  Admin: undefined;
  Home: undefined;
  Signup: undefined;
  Login: undefined;
  Profile: undefined;
  RegionData: {
    RegionID: string;
    SchoolData: Array<{
      totalSchools: number;
      totalStaffs: number;
      totalStudents: number;
    }>;
  };

  Main: undefined;
  Analytics: undefined;
  AdminHome: undefined;
  Representatives: undefined;
  RecentActivity: undefined;
  AddSchool: undefined;
  ManageSchool: undefined;
  LogoutAnime: undefined;
  UserAnalatics: undefined;
  UpdateData: undefined;
  Activity: undefined;
  Class: undefined;
  PredReport: undefined;
  DetailedView: {
    school: {};
    schools: {};
  };
  ExcessStaffsView:undefined;
  Chatroom:undefined ;
  Settings: undefined;
  RepChat : undefined ;
  ChatAdmin: {user :string};
  Public :undefined
  DetailedPublicView : {
    school: {};
  }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): JSX.Element => {
  console.log('Appjs reached');
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Main'}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="Public"
          component={PublicView}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={User}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Chatroom"
          component={Chatroom}
          options={{
            headerShown: true,
            headerTitle: 'Chat Room'
          }}
        />
        <Stack.Screen
          name="ChatAdmin"
          component={ChatAdmin}
          options={{
            headerShown: true,
            headerTitle: 'Chat Room'
          }}
        />
         <Stack.Screen
          name="DetailedPublicView"
          component={DetailedPublicView}
          options={{
            headerShown: true,
            headerTitle: ''
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ExcessStaffsView"
          component={ExcessStaffsView}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
          }}
        />
             <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Activity"
          component={Activity}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="RegionData"
          component={RegionData}
          options={({route}) => ({
            headerTitle: 'Region ' + route.params?.RegionID,
            headerShown: true,
          })}
        />

        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Class"
          component={Class}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="PredReport"
          component={PredReport}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="DetailedView"
          component={DetailedView}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="LogoutAnime"
          component={LogoutAnime}
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="RepChat"
          component={Chat}
          options={{
            headerShown: true,
            headerTitle : 'Chats'
          }}
        />
        <Stack.Screen
          name="Analytics"
          component={Analytics}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AdminHome"
          component={AdminHome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Representatives"
          component={RepresentativeList}
          options={{
            headerTitle: 'List of Representatives',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="RecentActivity"
          component={RecentActivity}
          options={{
            headerTitle: 'Recent Activity',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="AddSchool"
          component={AddSchool}
          options={{
            headerTitle: 'Add School',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="ManageSchool"
          component={ManageSchool}
          options={{
            headerTitle: 'Manage Schools',
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
});
