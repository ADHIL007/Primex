import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { Firebase_DB } from '../FirebaseConfig'

const Class = () => {
    const collectionRef = collection(Firebase_DB,'Schools')
    const SnapShot = getDocs(collectionRef)
    console.log(SnapShot)
  return (
    <View>
      <Text>Class</Text>
    </View>
  )
}

export default Class

const styles = StyleSheet.create({})