import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const FlatCardAdmin = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.bigButton}
        onPress={() => navigation.navigate('Analytics')}>
        <Image
          source={require('../assets/graphics/statistics.png')}
          style={styles.buttonImage}
        />
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
        onPress={() => navigation.navigate('ManageSchools',{navigation : navigation})}>
        <FontAwesome name="gears" size={24} color="white" />

        <Text style={styles.buttonText}>Manage Schools</Text>
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
    marginTop: 60,
  },
  bigButton: {
    width: '55%', // Adjust as needed
    height: 200,
    backgroundColor: '#52D3D8', // Pink background for Analytics
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 12,
    flexDirection: 'column',
  },
  mediumButton: {
    width: '100%', // Adjust as needed
    height: 87,
    backgroundColor: '#6BCB77', // Green background for Requests and Representatives
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  smallButton: {
    width: '100%', // Takes full width
    height: 60,
    backgroundColor: '#3498DB', // Blue background for Recent Activity
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
  },
  MedBtn: {
    width: '45%', // Adjust as needed
    height: 87,
    backgroundColor: '#78D6C6', // Orange background for Add Schools
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  buttonImage: {
    width: 90,
    height: 90,
  },
});
