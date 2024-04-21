import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const ClassItem = ({school}) => {
  console.log('school:', school.status);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('DetailedView', {school: school})}>
      <Text
        style={{
          color: 'rgba(24, 44, 97,1.0)',
          fontSize: heightPercentageToDP('3.3%'),
          marginTop: heightPercentageToDP('-5.5%'),
          left: widthPercentageToDP('1.5%'),
        }}>
        {school.schoolName}
      </Text>
      <Text
        style={{
          color:
            school.status === 'Need Allocation'
              ? 'rgb(255, 63, 52)'
              : school.status === 'Good'
              ? '#34e7e4'
              : school.status === 'Bad'
              ? '#1e272e'
              : '#0be881',
          fontSize: heightPercentageToDP('1.4%'),
          position: 'absolute',
          top: heightPercentageToDP('3%'),
          right: widthPercentageToDP('4%'),
          borderWidth: 1,
          borderColor:
            school.status === 'Need Allocation'
              ? 'rgb(255, 63, 52)'
              : school.status === 'Good'
              ? '#34e7e4'
              : school.status === 'Bad'
              ? '#1e272e'
              : '#0be881',
          borderRadius: 5,
          padding: 5,
          fontWeight: 'bold',
          backgroundColor:
            school.status === 'Need Allocation'
              ? 'rgba(255, 63, 52, .2)' // Red color
              : school.status === 'Good'
              ? 'rgba(52, 231, 228, .2)' // Cyan color
              : school.status === 'Bad'
              ? 'rgba(30, 39, 46, .2)' // Dark color
              : 'rgba(11, 232, 129, .2)', // Green color

          textAlignVertical: 'center',
          textAlign: 'center',
          width: widthPercentageToDP('30%'),
        }}>
        {school.status}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: heightPercentageToDP('6%'),

          left: widthPercentageToDP('4%'),
        }}>
        <Text
          style={{
            color: 'rgba(24, 44, 97,1.0)',
            fontSize: heightPercentageToDP('2%'),
          }}>
          Location {'  : '}
        </Text>
        <Text
          style={{
            color: 'rgba(24, 44, 97,1.0)',
            fontSize: heightPercentageToDP('2.2%'),
          }}>
          {school.location}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: heightPercentageToDP('9%'),

          left: widthPercentageToDP('4%'),
        }}>
        <Text
          style={{
            color: 'rgba(24, 44, 97,1.0)',
            fontSize: heightPercentageToDP('2%'),
          }}>
          Region {'  : '}
        </Text>
        <Text
          style={{
            color: 'rgba(24, 44, 97,1.0)',
            fontSize: heightPercentageToDP('2.2%'),
          }}>
          {school.region}
        </Text>
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            right: widthPercentageToDP('-70%'),
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: 'rgba(52, 152, 219,1.0)',
              fontSize: heightPercentageToDP('2.2%'),
            }}>
            Detailed View{' '}
          </Text>
          <Ionicons
            name="chevron-forward-outline"
            size={heightPercentageToDP('2.2%')}
            color="#1e272e"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ClassItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.4,
    borderColor: 'rgba(24, 44, 97,.40)',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    height: heightPercentageToDP('15%'),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
});
