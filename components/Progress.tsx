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
const Progress = ({data, label, color, req, actual}) => {
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
  cdata = {
    labels: [label], // optional
    data: [data],
  };
  return (
    <View >
      <Text
        style={{
          color: 'rgba(24, 44, 97,1.0)',
          fontSize: hp('1.9%'),
          fontWeight: 'bold',
        }}>
        {label}
      </Text>
      <View style={styles.container}>
      <ProgressChart
        data={cdata}
        width={ScreenWidth - 50}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={true}
        style={{
          marginTop: RFPercentage(4.5),
          transform: [{scale: 1.4}],
          marginLeft: wp('-49%'),
        }}
      />
      <View style={{
        position: 'absolute',
        flexDirection: 'row',
        right: wp('-5%'),
        gap: wp('5%'),
        width: wp('25%'),
      }}>
        <View>
          <Text
            style={{
              color: 'rgba(24, 44, 97,1.0)',
              fontSize: hp('1.9%'),
              fontWeight: 'bold',
            }}>
            Present
          </Text>
          <Text
  style={[
    {
      color:
        data < 0.45
          ? 'rgb(255, 63, 52)' // Red for values less than 0.45
          : data < 0.75
          ? 'rgb(255, 191, 0)' // Orange for values between 0.45 and 0.75
          : 'rgb(0, 255, 0)', // Green for values greater than or equal to 0.75
        fontSize: hp('2.5%'),
        },
  ]}>
  {actual}
</Text>

        </View>
        <View>
          <Text
            style={{
              color: 'rgba(24, 44, 97,1.0)',
              fontSize: hp('1.9%'),
              fontWeight: 'bold',
            }}>
            Required
          </Text>
          <Text
  style={[
    {
      color:'rgba(24, 44, 97,1.0)',
        fontSize: hp('2.5%'),
        },
  ]}>
  {req}
</Text>

        </View>
        </View>
      </View>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
