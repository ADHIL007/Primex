import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Linechart from '../User/Linechart';
import store from '../../Redux/Store';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import CurrentSchoolDetails from './CurrentSchoolDetails';


const CurrentData = ({data}) => {
  const {
    numberOfStaffs,
    boys,
    girls,
    Board,
    Bench_and_Desk,
    Computer,
    Classrooms,
    prevpass,
  } = data;
  return (
    <View style={styles.container}>
        <View style={styles.Chartscontainer}>
        <Linechart
        chartdata={
            prevpass.length > 0
              ? prevpass
              : [0, 0, 0, 0, 0, 0]
          }
          color={() => 'rgba(23, 192, 235,1.0)'}
        timeline={'present'}

      />
        </View>
<View>
<CurrentSchoolDetails SchoolData ={data}/>
</View>
    </View>
  );
};

export default CurrentData;

const styles = StyleSheet.create({
  container: {
  marginTop: heightPercentageToDP("6.5%"),
  },
  Chartscontainer:{

  },

});
