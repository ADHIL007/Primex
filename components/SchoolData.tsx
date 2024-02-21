import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {PieChart} from 'react-native-chart-kit';
import store from '../Redux/Store';

const SchoolData = () => {
  const data = store.getState().CurrentSchoolData;
  const total = parseInt(data.boys) + parseInt(data.girls);

  const chartData = [
    {
      name: 'Boys',
      population: Math.round((data.boys / total) * 100),
      color: '#00a8ff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Girls',
      population: Math.round((data.girls / total) * 100),
      color: '#2ecc71',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
        <View style={styles.headContainer}>
      <Text style={styles.headtext}>Details of your School</Text>
      <View style={styles.dataContainer}>
        <MaterialCommunityIcons name="school" size={24} color="black" />
        <Text style={styles.text}>School Name: {data.schoolName}</Text>
      </View>
      <View style={styles.dataContainer}>
        <MaterialCommunityIcons name="map-marker" size={24} color="black" />
        <Text style={styles.text}>Location: {data.location}</Text>
      </View>
      <View style={styles.dataContainer}>
        <MaterialCommunityIcons name="account-group" size={24} color="black" />
        <Text style={styles.text}>
          Boys: {data.boys}, Girls: {data.girls}
        </Text>
      </View>
      <View style={styles.dataContainer}>
        <MaterialCommunityIcons name="star" size={24} color="black" />
        <Text style={styles.text}>Rating: {data.rating}</Text>
      </View>
      <View style={styles.dataContainer}>
        <MaterialCommunityIcons
          name="account-multiple"
          size={24}
          color="black"
        />
        <Text style={styles.text}>Total Staffs: {data.numberOfStaffs}</Text>
      </View>
      <View style={styles.dataContainer}>
        <MaterialCommunityIcons name="map" size={24} color="black" />
        <Text style={styles.text}>Region: {data.region}</Text>
      </View>
      <View style={styles.dataContainer}>
        <MaterialCommunityIcons name="chart-bar" size={24} color="black" />
        <Text style={styles.text}>
          Student-Staff Ratio: {Math.round(total / data.numberOfStaffs)}
        </Text>
      </View>
      </View>
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width}
        height={250}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 1, // Round to 1 decimal place
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#000000',
          },
          formatLabel: (value: number) => `${value.toFixed(1)}%`, // Format label to 1 decimal place with percentage
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="40"
        labelRadius="75%"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin:20
  },
  headContainer: {
    padding: 20,
  },
  headtext: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: RFPercentage(2),
    color: '#333',
  },
});

export default SchoolData;
