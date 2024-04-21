import { ScreenWidth } from '@rneui/themed/dist/config';
import React from 'react';
import { View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const PieChart2 = ({cdata}) => {
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };


  const data = [
    {
      name: 'Need Allocation',
      population:cdata[0] ,
      color: 'rgba(255, 63, 52, .8)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
        name: 'Bad',
        population:cdata[1] ,
        color: 'rgba(30, 39, 46, .8)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name :'Good',
        population:cdata[2] ,
        color: 'rgba(52, 231, 228, .8)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name :'Very Good',
        population:cdata[3] ,
        color: 'rgba(11, 232, 129, .8)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      }
  ];

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: heightPercentageToDP('1%'),
      height: heightPercentageToDP('40%'), // Adjust height as needed
      zIndex: 5,
    }}>
      <PieChart
        data={data}
        width={ScreenWidth}
        height={220} // Adjust height as needed
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        absolute
      />
    </View>
  );
};

export default PieChart2;
