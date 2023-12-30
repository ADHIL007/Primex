import React from 'react';
import {Dimensions, View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';

interface PieChartData {
  name: string;
  population: number;
  color: string;
}

const data: PieChartData[] = [
  {
    name: '% Region 1',
    population: 30,
    color: '#0A4D68',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
    legendFontWeight: 'normal',
  },
  {
    name: '% Region 2',
    population: 50,
    color: '#088395',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
    legendFontWeight: 'normal',
  },
  {
    name: '% Region 3',
    population: 20,
    color: '#05BFDB',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
    legendFontWeight: 'normal',
  },
  {
    name: '% Region 4',
    population: 30,
    color: '#00FFCA',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
    legendFontWeight: 'normal',
  },
];

const PieCharts: React.FC = () => {
  return (
    <View>
      <PieChart
        data={data}
        width={Dimensions.get('window').width}
        height={250}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
          formatLabel: (value: number) => `${value}%`, // Add this line to format the label with percentage
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="40" // Adjusted paddingLeft for increased gap
        labelRadius="75%" // Adjusted labelRadius for increased gap
        absolute
      />
    </View>
  );
};

export default PieCharts;
