import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Progress from './Progress';
import store from '../Redux/Store';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SchoolData = () => {
  const {
    Bench_and_Desk,
    Board,
    Classrooms,
    Computer,
    boys,
    girls,
    numberOfStaffs,
  } = store.getState().CurrentSchoolData;

  const students = parseInt(boys) + parseInt(girls);

  const requiredBenchDesk = Math.ceil(students / 4);
  const bench = Bench_and_Desk / requiredBenchDesk;

  const requiredBoard = Math.ceil(students / 50);
  const board = Board / requiredBoard;

  const requiredClassrooms = Math.ceil(students / 50);
  const classrooms = Classrooms / requiredClassrooms;

  const requiredComputer = Math.ceil(students / 7);
  const computer = Computer / requiredComputer;

  const data = [
    { data: bench, label: 'Number of Benches and Desks', req: requiredBenchDesk, actual: Bench_and_Desk },
    { data: board, label: 'Number of Boards', req: requiredBoard, actual: Board },
    { data: classrooms, label: 'Number of Classrooms', req: requiredClassrooms, actual: Classrooms },
    { data: computer, label: 'Number of Computers', req: requiredComputer, actual: Computer },
  ];

  const totalNeeded = data.filter(item => item.data < 1).length;
  const satisfiedDemand = 4 - totalNeeded;
  const surplus = data.filter(item => item.data > 1).length;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={styles.value}>{totalNeeded}</Text>
          <Text style={styles.label}>Vital Demand</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.value}>{satisfiedDemand}</Text>
          <Text style={styles.label}>Satisfied Demand</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.value}>{surplus}</Text>
          <Text style={styles.label}>Excess</Text>
        </View>
      </View>
      {data.map((item, index) => (
        <Progress
          key={index}
          data={item.data}
          label={item.label}
          req={item.req}
          color={item.data < 0.45 ? '255, 63, 52' : item.data < 0.75 ? '255, 191, 0' : '0, 255, 0'}
          actual={item.actual}
        />
      ))}
    </View>
  );
};

export default SchoolData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('5%'),
    marginBottom: hp('5%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    width: wp('100%'),
    height: hp('15%'),
  },
  item: {
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: hp('5%'),
    color: 'rgba(24, 44, 97,1.0)',
  },
  label: {
    fontSize: hp('2%'),
    color: 'rgba(24, 44, 97,1.0)',
  },
});
