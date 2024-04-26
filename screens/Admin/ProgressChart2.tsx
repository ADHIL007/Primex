import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ProgressChart} from 'react-native-chart-kit';
import {ScreenWidth} from '@rneui/themed/dist/config';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');
const ProgressChart2 = ({data,color,label,Fcolor}) => {
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#rgba(255,255,255,0.5)',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(${color},${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
  };
let cdata
if(label === 'rating'){
   cdata = {
    data: [data/5],
    label :['Rating']
  };

}else{
   cdata = {
    data: [data],
    label :['staffs']
  };

}

  return (
    <View>

        <ProgressChart
          data={cdata}
          width={ScreenWidth - 50}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={true}
          style={{
            marginTop: hp('-14%'),
            marginLeft: wp('29%'),
            transform: [{scale: 1.9}],

          }}
        />
       <Text style={
         {
           color: Fcolor,
           fontSize: hp('3.5%'),
           fontWeight: 'bold',
           marginTop: hp('-15%'),
            marginLeft: wp('68%'),

         }
       }>{label === "rating" && data}</Text>
    </View>
  );
};

export default ProgressChart2;

