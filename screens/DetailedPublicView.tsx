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
import ProgressChart2 from './Admin/ProgressChart2';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const DetailedPublicView = ({route}) => {
  const {school} = route.params;
  console.log(school);
  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View
        style={{
          paddingHorizontal: heightPercentageToDP('2%'),
          paddingTop: heightPercentageToDP('2%'),
        }}>
        <Text
          style={{
            fontSize: heightPercentageToDP('4.5%'),
            color: '#1e272e',
            fontWeight: 'bold',
          }}>
          {school.schoolName}
        </Text>
        <Text
          style={{fontSize: heightPercentageToDP('2.5%'), color: '#1e272e'}}>
          {school.location}
        </Text>
        <Text
          style={{
            fontSize: heightPercentageToDP('2.5%'),
            color: school.rating < 2.5 ? '#f53b57' : '#0be881',
            fontWeight: 'bold',
          }}>
          {school.rating < 2.5 ? 'Not Recommended' : 'Recommended'}
        </Text>
      </View>
      <View
        style={{position: 'absolute', marginTop: heightPercentageToDP('13%')}}>
        <ProgressChart2
          data={school.rating}
          color={
            school.rating / 5 < 0.45
              ? '255, 63, 52'
              : school.rating / 5 < 0.75
              ? '255, 191, 0'
              : '0, 255, 0'
          }
          label={'rating'}
          Fcolor="#1e272e"
        />
      </View>
      <TouchableOpacity
        style={{
          paddingHorizontal: heightPercentageToDP('2%'),
          flexDirection: 'row',
          margin: heightPercentageToDP('2%'),
          borderRadius: 10,
          paddingVertical: heightPercentageToDP('0.7%'),
          borderWidth: 0.5,
          borderColor: '#1e272e',
          width: widthPercentageToDP('35%'),
        }}>
        <MaterialIcons
          name="call"
          size={heightPercentageToDP('2.5%')}
          color="#1e272e"
        />
        <Text
          style={{fontSize: heightPercentageToDP('2.5%'), color: '#1e272e'}}>
          Contact
        </Text>
      </TouchableOpacity>
      <View
        style={{
          paddingHorizontal: heightPercentageToDP('2%'),
          marginTop: heightPercentageToDP('5%'),
        }}>
        <Text
          style={{
            fontSize: heightPercentageToDP('2.8%'),
            color: '#1e272e',
          }}>
          School Facilities
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: heightPercentageToDP('1%'),
          }}>
          <MaterialIcons
            name={school.hasSchoolBus ? 'directions-bus' : 'directions-walk'}
            size={heightPercentageToDP('3%')}
            color="#1e272e"
          />
          <Text
            style={{
              fontSize: heightPercentageToDP('2.5%'),
              color: '#1e272e',
              marginLeft: heightPercentageToDP('1%'),
            }}>
            Transportation: {school.hasSchoolBus ? 'Yes' : 'No'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: heightPercentageToDP('1%'),
          }}>
          <MaterialIcons
            name={school.playground ? 'sports-soccer' : 'block'}
            size={heightPercentageToDP('3%')}
            color="#1e272e"
          />
          <Text
            style={{
              fontSize: heightPercentageToDP('2.5%'),
              color: '#1e272e',
              marginLeft: heightPercentageToDP('1%'),
            }}>
            Playground: {school.playground ? 'Yes' : 'No'}
          </Text>
        </View>
        <View style={{marginTop: heightPercentageToDP('3%')}}>
          <Text
            style={{fontSize: heightPercentageToDP('2.5%'), color: '#1e272e'}}>
            Lab Facilities
          </Text>
          <View>
            {Object.entries(school.labFeatures).map(
              ([facility, available], index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    marginBottom: heightPercentageToDP('1%'),
                  }}>
                  {available ? (
                    facility === 'biologyLab' ? (
                      <MaterialIcons
                        name="biotech"
                        size={heightPercentageToDP('3%')}
                        color="#1e272e"
                      />
                    ) : facility === 'chemistryLab' ? (
                      <MaterialIcons
                        name="science"
                        size={heightPercentageToDP('3%')}
                        color="#1e272e"
                      />
                    ) : facility === 'computerLab' ? (
                      <MaterialIcons
                        name="computer"
                        size={heightPercentageToDP('3%')}
                        color="#1e272e"
                      />
                    ) : facility === 'electronicsLab' ? (
                      <MaterialIcons
                        name="memory"
                        size={heightPercentageToDP('3%')}
                        color="#1e272e"
                      />
                    ) : facility === 'physicsLab' ? (
                      <MaterialIcons
                        name="engineering"
                        size={heightPercentageToDP('3%')}
                        color="#1e272e"
                      />
                    ) : null
                  ) : (
                    <MaterialIcons
                      name="block"
                      size={heightPercentageToDP('3%')}
                      color="red"
                    />
                  )}
                  <Text
                    style={{
                      fontSize: heightPercentageToDP('2.5%'),
                      color: available ? '#0be881' : '#f53b57',
                      marginLeft: heightPercentageToDP('1%'),
                    }}>
                    {facility}: {available ? 'Available' : 'Not Available'}
                  </Text>
                </View>
              ),
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailedPublicView;

const styles = StyleSheet.create({});
