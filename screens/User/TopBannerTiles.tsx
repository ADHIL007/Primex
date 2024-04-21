import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import store from '../../Redux/Store';
import {Skeleton} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const TopBannerTiles = ({
  location,
  isLoading,
  staffs,
  students,
  region,
  rating,
}:any) => {
  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            width: '100%',
            padding: 15,
            marginTop: 10,
            height: 'auto',
          }}>
          <Text style={[styles.gridItemText, {fontSize: RFPercentage(2.1)}]}>
            Location:
          </Text>
          {isLoading ? (
            <Skeleton animation="pulse" width={20} height={15} />
          ) : (
            <Text
              style={[
                styles.gridItemText,
                {fontSize: RFPercentage(2.2), color: '#17c0eb'},
              ]}>
              {` ${location}`}
            </Text>
          )}
          <MaterialIcons
            name="location-on"
            size={RFPercentage(1.7)}
            color="#17c0eb"
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: 5,
            width: '70%',
            height: 120,
          }}>
          <View
            style={{
              width: '50%',
              height: '50%',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            {isLoading ? (
              <Skeleton animation="pulse" width={50} height={25} />
            ) : (
              <Text
                style={[
                  styles.gridItemText,
                  {fontWeight: 'bold', fontSize: RFPercentage(3.5)},
                ]}>{`${staffs}`}</Text>
            )}
            <Text style={{color: '#333'}}>Staffs</Text>
          </View>

          <View
            style={{
              width: '50%',
              height: '50%',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            {isLoading ? (
              <Skeleton animation="pulse" width={50} height={25} />
            ) : (
              <Text
                style={[
                  styles.gridItemText,
                  {fontWeight: 'bold', fontSize: RFPercentage(3.5)},
                ]}>{`${region}`}</Text>
            )}
            <Text style={{color: '#333'}}>Region</Text>
          </View>

          <View
            style={{
              width: '50%',
              height: '50%',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            {isLoading ? (
              <Skeleton animation="pulse" width={50} height={25} />
            ) : (
              <Text
                style={[
                  styles.gridItemText,
                  {fontWeight: 'bold', fontSize: RFPercentage(3.5)},
                ]}>{` ${students}`}</Text>
            )}
            <Text style={{color: '#333'}}> Students</Text>
          </View>
        </View>
        <View
          style={{
            width: '30%',
            height: 110,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {isLoading ? (
            <Skeleton animation="pulse" width={70} height={75} />
          ) : (
            <Text
              style={[
                styles.gridItemText,
                {
                  fontWeight: 'bold',
                  fontSize: RFPercentage(5.5),
                  color:
                    rating < 2.5
                      ? '#e74c3c'
                      : rating < 3.6
                      ? '#f1c40f'
                      : '#2ecc71',
                },
              ]}>
              {store.getState().CurrentSchoolData?.rating}
            </Text>
          )}
          <Text style={{color: '#333'}}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default TopBannerTiles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    zIndex: 10,
    marginTop: 20,
  },
  gridContainer: {
    width: '90%',
    height: heightPercentageToDP('25%'),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,

    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
  },
  gridItem: {
    width: '45%',
    height: 'auto',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  gridItemText: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    color: '#1e272e',
    textAlign: 'center',
  },
  subText: {
    fontSize: RFPercentage(2),
    color: '#95a5a6',
    textAlign: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    padding: 10,
  },
  locationText: {
    fontSize: RFPercentage(2.1),
    color: '#2c3e50',
    marginLeft: 5,
  },
  icon: {
    color: '#333',
  },
});
