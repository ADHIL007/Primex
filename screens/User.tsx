import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserNavigationTab from './User/UserNavigationTab'

const User = () => {
  console.log('User Home reached');
  return (
    <View style={styles.container}>

      <UserNavigationTab />



    </View>
  )
}

export default User

const styles = StyleSheet.create({
container:{
  flex:1,


}
})