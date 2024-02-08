import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Logout from '../../components/Logout';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
