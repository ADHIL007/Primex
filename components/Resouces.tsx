import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';

const Resources = ({ benchAndDesk, computer, board, classrooms ,BAD , rooms,bod,pc}) => {

    return (
      <View style={styles.container}>
        <Text style={styles.headingtext}>Resources</Text>
        <View style={styles.commodityContainer}>
          <Image source={require('../assets/Commodities/kansai-university-84363_640.jpg')} style={styles.image} />
          <TextInput
            style={styles.input}
            label="Desk and Bench"
            value={BAD}
            onChangeText={(text) =>
                benchAndDesk(text)
            }
            keyboardType="numeric"
            maxLength={4}
            placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
            underlineColorAndroid="#1e272e"
          />
        </View>
        <View style={styles.commodityContainer}>
          <Image source={require('../assets/Commodities/School-Computer-Labs-Ensure-Access-2.jpg')} style={styles.image} />
          <TextInput
            style={styles.input}
            label="Computer lab"
            value={pc}
            onChangeText={(text) =>
                pc(text)
            }
            keyboardType="numeric"
            maxLength={4}
            placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
            underlineColorAndroid="#1e272e"
          />
        </View>
        <View style={styles.commodityContainer}>
          <Image source={require('../assets/Commodities/360_F_117556248_PZuqKIshns6b04aYgW6j9a4uF0BRuwZA.jpg')} style={styles.image} />
          <TextInput
            style={styles.input}
            label="Boards"
            value={bod}
            onChangeText={(text) =>
              bod(text)
            }
            keyboardType="numeric"
            maxLength={4}
            placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
            underlineColorAndroid="#1e272e"
          />
        </View>
        <View style={styles.commodityContainer}>
          <Image source={require('../assets/Commodities/Classroom-Management-for-an-Effective-Learning-Environment-scaled.jpg')} style={styles.image} />
          <TextInput
            style={styles.input}
            label="Classroom"
            value={rooms}
            onChangeText={(text) =>
              rooms(text)
            }
            keyboardType="numeric"
            maxLength={4}
            placeholderTextColor={'rgba(30, 39, 46, 0.3)'}
            underlineColorAndroid="#1e272e"
          />
        </View>
      </View>
    );
  };

  export default Resources;



const styles = StyleSheet.create({
  headingtext: {
    fontSize: 20,
    color: '#1e272e',
    textAlign: 'left',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1e272e',
    color: '#1e272e',
    fontSize: 16,
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#f5f6fa',
    width: '85%',
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
    borderRadius: 5,
    backgroundColor: '#1e272e',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginLeft: -20,
  },
  commodityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
});
