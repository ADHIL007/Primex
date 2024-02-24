import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Progress from './Progress';
import store from '../Redux/Store';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get('window');
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
  console.log('numberOfStaffs:', Bench_and_Desk);

  const students = parseInt(boys) + parseInt(girls);

  const requiredBenchDesk = Math.ceil(students / 4);
  const bench = Bench_and_Desk / requiredBenchDesk;
  console.log('students ', students);

  const requiredBoard = Math.ceil(students / 50);
  const board = Board / requiredBoard;

  console.log('board:', board);

  const requiredClassrooms = Math.ceil(students / 50);
  const classrooms = Classrooms / requiredClassrooms;

  console.log('classrooms:', classrooms);

  const requiredComputer = Math.ceil(students / 15);
  const computer = Computer / requiredComputer;
 console.log('computer:', Computer);

  const data = [
    {
      data: bench,
      label: 'Number of Benches and Desks',
      req: requiredBenchDesk,
      actual : Bench_and_Desk
    },
    {
      data: board,
      label: 'Number of Boards',
      req : requiredBoard,
      actual : Board
    },
    {
      data: classrooms,
      label: 'Number of Classrooms',
      req: requiredClassrooms,
      actual : Classrooms
    },
    {
      data: computer,
      label: 'Number of Computers',
      req: requiredComputer,
      actual : Computer
    }
  ];
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <Progress
          key={index} // Add a unique key prop for each component in the map
          data={item.data}
          label={item.label}
          req = {item.req}
          color={
            item.data < 0.45
              ? '255, 63, 52' // Red for values less than 0.45
              : item.data < 0.75
              ? '255, 191, 0' // Orange for values between 0.45 and 0.75
              : '0, 255, 0'   // Green for values greater than or equal to 0.75
          }

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
    gap: 10,
    marginTop: hp('5%'),
  },
});
