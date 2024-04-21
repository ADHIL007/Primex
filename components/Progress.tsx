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

  if (data > 1) {
    data = 1;
  }
  const cdata = {
    labels: [label], // optional
    data: [data],
  };

  return (
    <View>
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
        <Text
          style={{
            color: 'rgba(24, 44, 97,1.0)',
            fontSize: hp('3.2%'),
            fontWeight: 'bold',
            position: 'absolute',
            left: data < 1 ? wp('-9%') : wp('-11.5%'),
            top: hp('15%'),
          }}>
          {Math.round(data*100)}%
        </Text>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: hp('-15.5%'),
          }}>
          <View
            style={{
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
                    color: 'rgba(24, 44, 97,1.0)',
                    fontSize: hp('2.5%'),
                  },
                ]}>
                {req}
              </Text>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              right: wp('-4.5%'),
              top: hp('6.5%'),
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
                Need
              </Text>
              <Text
                style={{
                  color:
                    data < 0.45
                      ? 'rgb(255, 63, 52)' // Red for values less than 0.45
                      : data < 0.75
                      ? 'rgb(255, 191, 0)' // Orange for values between 0.45 and 0.75
                      : 'rgb(0, 255, 0)', // Green for values greater than or equal to 0.75
                  fontSize: hp('2.5%'),
                }}>
                {req <= actual ? 0 : req - actual}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: 'rgba(24, 44, 97,1.0)',
                  fontSize: hp('1.9%'),
                  fontWeight: 'bold',
                }}>
                Status
              </Text>
              <Text
                style={[
                  {
                    color:
                      data < 0.45
                        ? 'rgba(255, 63, 52,1.0)'
                        : data < 0.75
                        ? 'rgba(241, 196, 15,1.0)'
                        : 'rgba(11, 232, 129,1.0)',
                    fontSize:
                      data < 0.45
                        ? hp('1.925%')
                        : data < 0.75
                        ? hp('1.6%')
                        : hp('1.925%'),
                  },
                ]}>
                {data < 0.45
                  ? 'Not Met'
                  : data < 0.75
                  ? 'Needs Improvement'
                  : 'Met'}
              </Text>
            </View>
          </View>
          {data < 0.75 ? (
            <Text
              style={{
                color:
                  data < 0.45
                    ? 'rgba(255, 63, 52,1.0)'
                    : 'rgba(255, 168, 1,1.0)',
                fontSize: hp('1.9%'),
                position: 'absolute',
                right: wp('-8.5%'),
                top: hp('13.5%'),
                borderWidth: 1,
                borderColor:
                  data < 0.45
                    ? 'rgba(255, 63, 52,1.0)'
                    : 'rgba(255, 168, 1,1.0)',
                borderRadius: 5,
                padding: 5,
                width: wp('30%'),
                textAlign: 'center',
                fontWeight: 'bold',
                backgroundColor:
                  data < 0.45 ? 'rgba(255, 63, 52,.2)' : 'rgba(255, 168, 1,.2)',
                textAlignVertical: 'center',
              }}>
              {data < 0.45 ? 'Urgently required' : 'Required'}
            </Text>
          ) : (
            <Text
              style={{
                color: 'green', // Set text color to green
                fontSize: hp('1.9%'),
                position: 'absolute',
                right: wp('-8.5%'),
                top: hp('13.5%'),
                borderWidth: 1,
                borderColor: 'rgba(11, 232, 129,1.0)', // Set border color to green
                borderRadius: 5,
                padding: 5,
                width: wp('30%'),
                textAlign: 'center',
                fontWeight: 'bold',
                backgroundColor: 'rgba(11, 232, 129,.2)', // Set background color to light green
                textAlignVertical: 'center',
              }}>
                {data < 1 ? `Need : ${req - actual}` : `Excess:${actual - req}`}

            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    width: wp('50%'),
    height: hp('30%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
