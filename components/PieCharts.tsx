import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { getData } from '../screens/AsyncStorage';

interface PieChartData {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
  legendFontWeight: string;
}

interface RegionData {
  totalSchools: number;
  totalStaffs: number;
  totalStudents: number;
}

interface PieChartsProps {
  data: Record<string, RegionData[]>;
}

const PieCharts: React.FC<PieChartsProps> = ({ data }) => {
  const [chartData, setChartData] = useState<PieChartData[]>([]);

  useEffect(() => {
    // Calculate total staffs for each region
    const calculateChartData = async () => {
      try {
        // Get the total number of staffs from AsyncStorage
        const totalNumberofStaffs = await getData('TOTALSTAFFS');

        // Ensure that totalNumberofStaffs is a valid number
        if (isNaN(totalNumberofStaffs)) {
          console.error('Invalid totalNumberofStaffs:', totalNumberofStaffs);
          return;
        }

        // Calculate the total staffs for each region
        const regionStaffs: Record<string, number> = {};
        Object.entries(data).forEach(([region, regionData]) => {
          const totalStaffs = regionData.reduce((acc, school) => acc + school.totalStaffs, 0);
          regionStaffs[region] = totalStaffs;
        });

        // A more pleasing color palette
        const colors = ['#80ED99', '#57CC99', '#38A3A5', '#22577A'];


        // Generate data for PieChart
        const newChartData: PieChartData[] = Object.entries(regionStaffs).map(([region, totalStaffs], index) => ({
          name: '% '+`${region}`,
          population: Math.round((totalStaffs / totalNumberofStaffs) * 100), // Round the percentage to the nearest whole number
          color: colors[index % colors.length], // Use the color from the palette in a cyclic manner
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
          legendFontWeight: 'normal',
        }));

        setChartData(newChartData);
      } catch (error) {
        console.error('Error generating PieChart data:', error);
      }
    };

    calculateChartData();
  }, [data]);

  return (
    <View>
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

export default PieCharts;
