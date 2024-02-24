import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import store from '../../Redux/Store';

const screenWidth = Dimensions.get('window').width;
const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#ffffff',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.7,
  useShadowColorFromDataset: false,
};

const Linechart = ({chartdata, color, timeline}) => {
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth(); // Current month index (0-indexed)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let pastMonths = [];
  let futureMonths = [];
  if (timeline === 'present') {
    // For present timeline, find past 6 months till the current month
    for (let i = -5; i <= 0; i++) {
      // Adjusted loop condition
      const monthIndex = currentMonthIndex + i;
      const adjustedMonthIndex = (monthIndex + 12) % 12; // Handle wrapping around the end of the year
      pastMonths.push(months[adjustedMonthIndex]);
    }
  } else if (timeline === 'future') {
    // For future timeline, find next 6 months starting from the next month
    for (let i = 1; i <= 6; i++) {
      const monthIndex = currentMonthIndex + i;
      const adjustedMonthIndex = (monthIndex + 12) % 12; // Handle wrapping around the end of the year
      futureMonths.push(months[adjustedMonthIndex]);
    }
  }

  // Assign colors to months
  const data = {
    labels: [...pastMonths, ...futureMonths],
    datasets: [
      {
        data: chartdata, // Sample data, you can replace with actual data
        color: color,
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Pass percentage'], // optional
  };


  if (timeline === 'future') {
    store.dispatch({ type: 'predResultmonths', payload: futureMonths });
    store.dispatch({ type: 'predResultdata', payload: chartdata });
  }

  return (
    <View style={styles.container}>
      <LineChart
        data={data} // Use the 'data' object here
        width={screenWidth}
        height={300}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
};

export default Linechart;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
