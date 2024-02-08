import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type LogoutAnime = NativeStackScreenProps<RootStackParamList, 'LogoutAnime'>;
const LogoutAnime = ({navigation}) => {
    setTimeout(() => {
      navigation.replace('Login');
    },3500)
  return (
    <View style={styles.cont}>
      <LottieView source={require('../assets/gifs/Logout.json')} autoPlay loop  style={{flex:1,top:180}}/>
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
<Text style={styles.text}>
    Bye 👋
</Text><Text style={styles.text}>
   Come back soon....!
</Text>
    </View>
    </View>
  )
}

export default LogoutAnime

const styles = StyleSheet.create({
    cont:{
        flex:1,
    },
  text:{
    fontSize:40,
    color:'#1e272e'
  }
})