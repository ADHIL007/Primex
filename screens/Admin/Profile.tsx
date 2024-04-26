import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Logout from '../../components/Logout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.back}>
          <TouchableOpacity
            style={styles.login}
            onPress={() => navigation.navigate('Public')}>
            <AntDesign
              name="home"
              size={heightPercentageToDP('2.5%')}
              color="#1e1e1e"
            />
            <Text style={{color: '#1e1e1e', fontSize: heightPercentageToDP('2.3%') }}>Main Home</Text>
          </TouchableOpacity></View>
      <View></View>
      <View style={styles.imgcont}>
      <Image
        source={require('../../assets/Backgrounds/adminlogo.png')}
        style={styles.logo}
      />
      </View>

      <Text style={styles.title}>Profile</Text>
      <Logout navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  back :{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 10,
    position :'absolute',
    right:10,
    top :10,
   zIndex :10
  },
  login: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth:.3,
    borderColor: '#1e1e1e',
    borderRadius :20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // Background color
  },
  imgcont:{
    width: 200,
    height: 200,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#0fbcf9',
    borderRadius: 100,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0fbcf9', // Text color
  },
});

export default Profile;
