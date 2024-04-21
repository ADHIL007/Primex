import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'react-native-paper';
import Progress from '../../components/Progress';
const {width, height} = Dimensions.get('window');
const CurrentSchoolDetails = ({SchoolData}) => {
  const {
    Bench_and_Desk,
    Board,
    Classrooms,
    Computer,
    boys,
    girls,
    numberOfStaffs,
  } = SchoolData;
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

  const requiredComputer = Math.ceil(students / 7);
  const computer = Computer / requiredComputer;
  console.log('computer:', Computer);

  const data = [
    {
      data: bench,
      label: 'Number of Benches and Desks',
      req: requiredBenchDesk,
      actual: Bench_and_Desk,
    },
    {
      data: board,
      label: 'Number of Boards',
      req: requiredBoard,
      actual: Board,
    },
    {
      data: classrooms,
      label: 'Number of Classrooms',
      req: requiredClassrooms,
      actual: Classrooms,
    },
    {
      data: computer,
      label: 'Number of Computers',
      req: requiredComputer,
      actual: Computer,
    },
  ];
  let i = 0;
  const totalNeeded = data.reduce((acc, item) => {
    if (item.data < 1) {
      i++;
    }
    return i;
  }, 0);

  let j = 0;
  const surplus = data.reduce((acc, item) => {
    if (item.data > 1) {
      j++;
    }
    return j;
  }, 0);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: 30,
          borderWidth: 0.4,
          borderColor: 'rgba(24, 44, 97,1.0)',
          width: wp('100%'),
          height: hp('15%'),
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: hp('5%'), color: 'rgba(24, 44, 97,1.0)'}}>
            {totalNeeded}
          </Text>
          <Text style={{fontSize: hp('2%'), color: 'rgba(24, 44, 97,1.0)'}}>
            Vital Demand
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: hp('5%'), color: 'rgba(24, 44, 97,1.0)'}}>
            {4 - totalNeeded}
          </Text>
          <Text style={{fontSize: hp('2%'), color: 'rgba(24, 44, 97,1.0)'}}>
            satisfied demand
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: hp('5%'), color: 'rgba(24, 44, 97,1.0)'}}>
            {surplus}
          </Text>
          <Text style={{fontSize: hp('2%'), color: 'rgba(24, 44, 97,1.0)'}}>
            excess
          </Text>
        </View>
      </View>
      {data.map((item, index) => (
        <Progress
          key={index} // Add a unique key prop for each component in the map
          data={item.data}
          label={item.label}
          req={item.req}
          color={
            item.data < 0.45
              ? '255, 63, 52' // Red for values less than 0.45
              : item.data < 0.99
              ? '255, 191, 0' // Orange for values between 0.45 and 0.75
              : '0, 255, 0' // Green for values greater than or equal to 0.75
          }
          actual={item.actual}
        />
      ))}
    </View>
  );
};

export default CurrentSchoolDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginTop: hp('5%'),
  },
});
