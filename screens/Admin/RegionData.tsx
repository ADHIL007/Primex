import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RegionData = ({route}) => {
  const {RegionID} = route.params
  console.log('regionID caught',RegionID);

  return (
    <View>

    </View>
  )
}

export default RegionData

const styles = StyleSheet.create({})