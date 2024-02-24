import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import store from '../Redux/Store';
import {ProgressChart} from 'react-native-chart-kit';
import {ScreenWidth} from '@rneui/themed/dist/config';
import {RFPercentage} from 'react-native-responsive-fontsize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get('window');
const TableGen = () => {
  const chartData = store.getState().predResultdata;
  const months = store.getState().predResultmonths;
  const data = store.getState().predData;
  console.log('chartData:', chartData);
  console.log('months:', months);

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#rgba(255,255,255,0.5)',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(15, 188, 249,${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
  };
  const students =
    parseInt(store.getState().CurrentSchoolData.boys) +
    parseInt(store.getState().CurrentSchoolData.girls);
  const attendence = parseInt(
    store.getState().CurrentSchoolData.averageAttendance,
  );
  const passpercentage = parseInt(
    store.getState().CurrentSchoolData.prevpass[5],
  );
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.maincontainer}>
        <Text style={styles.header}>Prediction Results</Text>
        {chartData.map((item, index) => {
          const cdata = {
            labels: [months[index]], // optional
            data: [item / 100],
          };

          console.log('cdata:', cdata);

          return (
            <View key={index} style={styles.chartContainer}>
              <View
                style={{
                  marginLeft: -100,
                }}>
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
                    transform: [{scale:1.4 }],
                  }}
                />
                <Text
                  style={[
                    styles.chartValue,
                    {marginTop: height * .26,marginLeft: width * .35, fontSize: hp('3%') },
                  ]}>
                  {chartData[index].toFixed(2)}%
                </Text>
                <View
                  style={{
                    flexDirection: 'column',
                    position: 'absolute',
                    right: wp('-2%'),
                    top: 60,
                    gap: 20,
                    transform: [{scale:0.85 }]
                  }}>
                  <View style={{flexDirection: 'column', gap: 5}}>
                    <View style={{flexDirection: 'row', gap: 10}}>
                      <Text style={styles.chartTitle}>{students} </Text>
                      <FontAwesome
                        name="long-arrow-right"
                        size={20}
                        color="#1E2923"
                      />
                      <Text
                        style={[
                          styles.chartTitle,
                          {
                            color:
                              students > data[index].total_students
                                ? 'red'
                                : '#0be881',
                          },
                        ]}>
                        {data[index].total_students}
                      </Text>
                      <Text
                        style={[
                          styles.chartTitle,
                          {
                            color:
                              students > data[index].total_students
                                ? 'red'
                                : '#0be881',
                          },
                        ]}>
                        [ {''}
                        {students > data[index].total_students
                          ? students - data[index].total_students + '-'
                          : data[index].total_students - students + '+'}
                        {''} ]
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.chartTitle,
                        {color: '#1E2923', fontSize: RFPercentage(1.9)},
                      ]}>
                      Number of students
                    </Text>
                  </View>
                  <View style={{flexDirection: 'column', gap: 5}}>
                    <View style={{flexDirection: 'row', gap: 10}}>
                      <Text style={styles.chartTitle}>{attendence}%</Text>
                      <FontAwesome
                        name="long-arrow-right"
                        size={20}
                        color="#1E2923"
                      />
                      <Text
                        style={[
                          styles.chartTitle,
                          {
                            color:
                              attendence > data[index].average_attendance
                                ? 'red'
                                : '#0be881',
                          },
                        ]}>
                        {data[index].average_attendance}%
                      </Text>
                      <Text
                        style={[
                          styles.chartTitle,
                          {
                            color:
                              attendence > data[index].average_attendance
                                ? 'red'
                                : '#0be881',
                          },
                        ]}>

                      {'['}{attendence > data[index].average_attendance
                          ? attendence -
                            data[index].average_attendance +
                            '%' +
                            '-'
                          : data[index].average_attendance -
                            attendence +
                            '%' +
                            '+'} {']'}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.chartTitle,
                        {color: '#1E2923', fontSize: RFPercentage(1.9)},
                      ]}>
                      Average Attendance %
                    </Text>
                  </View>
                  <View style={{flexDirection: 'column', gap: 5}}>
                    <View style={{flexDirection: 'row', gap: 10}}>
                      <Text style={styles.chartTitle}>{passpercentage}% </Text>
                      <FontAwesome
                        name="long-arrow-right"
                        size={20}
                        color="#1E2923"
                      />
                      <Text
                        style={[
                          styles.chartTitle,
                          {
                            color:
                              passpercentage > chartData[index].toFixed(2)
                                ? 'red'
                                : '#0be881',
                          },
                        ]}>
                        {chartData[index].toFixed(2)}%
                      </Text>

                      <Text
                        style={[
                          styles.chartTitle,
                          {
                            color:
                            passpercentage > chartData[index].toFixed(2)
                                ? 'red'
                                : '#0be881',
                          },
                        ]}>

                      {'['}{passpercentage > chartData[index].toFixed(2)
                          ? (passpercentage -
                          chartData[index].toFixed(2)).toFixed(1) +
                            '%' +
                            '-'
                          : (chartData[index].toFixed(2) -
                          passpercentage).toFixed(1) +
                            '%' +
                            '+'} {']'}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.chartTitle,
                        {color: '#1E2923', fontSize: RFPercentage(1.9)},
                      ]}>
                      Average pass %
                    </Text>
                  </View>
                </View>
              </View>

              <Text
                style={[
                  styles.chartTitle,
                  {
                    textAlign: 'center',
                    position: 'absolute',
                    top: 10,
                    fontSize: RFPercentage(2.5),
                    left: wp('19%'),
                  },
                ]}>
               Predictions for {months[index]}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 40, // Adjust as needed
  },
  maincontainer: {
    flex: 1,

    paddingHorizontal: 20,
  },
  header: {
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E2923',
  },
  chartContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    height: 330,
  },
  chartValue: {
    color: '#1E2923',
    fontSize: RFPercentage(2.5),
    position: 'absolute',
    marginTop: 170,
    marginLeft: 165,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E2923',
    textAlign: 'center',
  },
});

export default TableGen;
