import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const FlatCardAdmin = ({navigation}: any) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.bigButton}
        onPress={() => navigation.navigate('Analytics')}>
        <Icon name='google-analytics' size={90} color='white'/>
        <Text style={styles.buttonText}>Analytics</Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'column', width: '42%'}}>
        <TouchableOpacity
          style={styles.mediumButton}
          onPress={() => navigation.navigate('Requests')}>
          <MaterialCommunityIcons
            name="file-document"
            size={24}
            color="white"
          />
          <Text style={styles.buttonText}>Requests</Text>
        </TouchableOpacity>

        {/* Representatives (medium) */}
        <TouchableOpacity
          style={styles.mediumButton}
          onPress={() => navigation.navigate('Representatives')}>
          <MaterialCommunityIcons
            name="account-group"
            size={24}
            color="white"
          />
          <Text style={styles.buttonText}>Representatives</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activity (small) */}
      <TouchableOpacity
        style={styles.smallButton}
        onPress={() => navigation.navigate('RecentActivity')}>
        <MaterialCommunityIcons name="history" size={24} color="white" />
        <Text style={styles.buttonText}>Recent Activity</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.MedBtn}
        onPress={() => navigation.navigate('AddSchool')}>
        <MaterialCommunityIcons name="school" size={24} color="white" />
        <Text style={styles.buttonText}>Add Schools</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.MedBtn}
        onPress={() => navigation.navigate('ManageSchool')}>
        <FontAwesome name="gears" size={24} color="white" />

        <Text style={styles.buttonText}>Manage Schools</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardFour}>
          <Icon name ='chat' size={40} color='#fff'/>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>Chat Room</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardFour} onPress={() => navigation.navigate('Settings')}>
          <AntIcon name ='setting' size={40} color='#fff'/>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>Settings</Text>
        </TouchableOpacity>
    </View>
  );
};

export default FlatCardAdmin;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 40,


  },
  bigButton: {
    width: '55%', // Adjust as needed
    height: 200,
    backgroundColor: '#34e7e4', // Pink background for Analytics
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 20,
    flexDirection: 'column',

  },
  mediumButton: {

    width: '100%', // Adjust as needed
    height: 87,
    backgroundColor: '#33d9b2', // Green background for Requests and Representatives
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',

  },
  smallButton: {
    width: '100%', // Takes full width
    height: 60,
    backgroundColor: '#ff5252', // Blue background for Recent Activity
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',

  },
  cardFour: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 5,
    backgroundColor: '#0abde3',
    flexDirection: 'row',
    height: heightPercentageToDP('10%'),
    width: widthPercentageToDP('45%'),
    gap: 10,
  },
  MedBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 5,
    backgroundColor: '#26de81',
    flexDirection: 'row',
    height: heightPercentageToDP('10%'),
    width: widthPercentageToDP('45%'),
    gap: 10,
  },
  buttonText: {
    fontSize: RFPercentage(2.1),
    color: 'white',
    marginLeft: 10,
  },
  buttonImage: {
    width: 90,
    height: 90,
  },
});
