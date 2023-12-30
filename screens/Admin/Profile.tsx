import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Logout from '../../components/Logout'
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type profileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
const Profile = ({navigation} : profileProps ) => {
  return (
    <View>
      <Text>Profile</Text>
      <Logout navigation={navigation} />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})