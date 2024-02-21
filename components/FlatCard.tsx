import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const FlatCard = ({navigation}) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={[styles.card, styles.cardOne]} onPress={
          ()=>{navigation.navigate('SchoolAnalytics')}}>
          <Image
            source={require('../assets/graphics/statistics.png')}
            style={styles.image1}
            resizeMode="contain"
          />
          <Text style={styles.cardText}>Analytics</Text>
        </TouchableOpacity>
        <View style={styles.columnCont}>
          <TouchableOpacity
            style={[styles.card, styles.cardTwo, styles.columnTile]}
            onPress={
              ()=>{navigation.navigate('UpdateData')}}>
            <Image
              source={require('../assets/graphics/checklist.png')}
              style={styles.image2}
              resizeMode="contain"
            />
            <Text style={[styles.cardText, styles.columnText]}>
              Update data
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, styles.cardThree, styles.columnTile]} onPress={
              ()=>{navigation.navigate('Activity')}}>
            <Image
              source={require('../assets/graphics/most-recent.png')}
              style={styles.image3}
              resizeMode="contain"
            />
            <Text style={[styles.cardText, styles.columnText]}>
              Recent Activity
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FlatCard;

const styles = StyleSheet.create({
  outerContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },
  container: {
    padding: 8,
    margin: 8,
    flexDirection: 'row',
    borderRadius: 8,
  },
  columnCont: {
    flex: 1,
    flexDirection: 'column',
    width: '50%',
  },
  columnText: {
    marginLeft: -18,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 5,
  },
  cardOne: {
    backgroundColor: '#1abc9c',
    height: 208,
    width: '50%', // 50% of the width
  },
  cardTwo: {
    backgroundColor: '#3498db',
    width: '100%', // 40% of the width
  },
  cardThree: {
    backgroundColor: '#a29bfe',
    width: '100%', // 30% of the width
  },
  columnTile: {
    height: 100,
    flexDirection: 'row',
  },
  image1: {
    width: '50%',
    height: '50%',
  },
  image2: {
    width: '50%',
    height: '50%',
  },
  image3: {
    width: '50%',
    height: '50%',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
