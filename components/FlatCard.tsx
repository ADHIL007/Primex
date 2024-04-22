import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
const FlatCard = ({navigation}) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={[styles.card, styles.cardOne]} onPress={
          ()=>{navigation.navigate('SchoolAnalytics')}}>
        <Icon name ='google-analytics' size={90} color='#fff'/>
          <Text style={styles.cardText}>Analytics</Text>
        </TouchableOpacity>
        <View style={styles.columnCont}>
          <TouchableOpacity
            style={[styles.card, styles.cardTwo, styles.columnTile]}
            onPress={
              ()=>{navigation.navigate('UpdateData')}}>
           <Icon name ='update' size={40} color='#fff'/>
            <Text style={[styles.cardText, styles.columnText]}>
              Update data
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, styles.cardThree, styles.columnTile]} onPress={
              ()=>{navigation.navigate('Activity')}}>
          <Icon name ='history' size={40} color='#fff'/>
            <Text style={[styles.cardText, styles.columnText]}>
              Recent Activity
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text></Text>
      <View style={{
        padding: 8,
        margin: 8,
        marginTop: -20,
        flexDirection: 'row',
        borderRadius: 8,
        width: '100%',
      }}>
        <TouchableOpacity style={styles.cardFour}>
          <Icon name ='chat' size={40} color='#fff'/>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>Chat Room</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardFour} onPress={() => navigation.navigate('Settings')}>
          <AntIcon name ='setting' size={40} color='#fff'/>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>Settings</Text>
        </TouchableOpacity>
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
    borderRadius: 20,
    margin: 5,
    elevation: 10,
  },
  cardOne: {
    backgroundColor: '#34e7e4',
    height: 208,
    width: '50%', // 50% of the width

  },
  cardTwo: {
    backgroundColor: '#0be881',
    width: '100%', // 40% of the width
    gap: 20,
  },
  cardThree: {
    backgroundColor: '#4bcffa',
    width: '100%', // 30% of the width
    gap: 20,
  },
  cardFour: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 5,
    elevation: 10,
    backgroundColor: '#0abde3',
    flexDirection: 'row',
    height: heightPercentageToDP('10%'),
    width: widthPercentageToDP('45%'),
    gap: 10,
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
