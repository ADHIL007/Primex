import { StyleSheet, Text, View ,Dimensions} from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-chart-kit'

const screenWidth = Dimensions.get("window").width;
 const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
  };

const Linechart = () => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth(); // Current month index (0-indexed)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Calculate past and future months
    const pastMonths = [];
    const futureMonths = [];
    for (let i = -3; i <= 3; i++) {
        const monthIndex = currentMonthIndex + i;
        const adjustedMonthIndex = (monthIndex + 12) % 12; // Handle wrapping around the end of the year
        if (i <= 0) {
            pastMonths.push(months[adjustedMonthIndex]);
        } else {
            futureMonths.push(months[adjustedMonthIndex]);
        }
    }

    // Assign colors to months
    const data = {
        labels: [ ...pastMonths,...futureMonths,],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43, 60], // Sample data, you can replace with actual data
                color: (opacity, index) => {
                    if (index === 3) return 'blue'; // Current month is blue
                    else if (index < 3) return 'red'; // Future months are red
                    else return '#2ecc71'; // Past months have default color
                },
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Pass percentage"] // optional
    };

  return (
    <View style={styles.container}>
      <LineChart
  data={data}
  width={screenWidth}
  height={300}
  verticalLabelRotation={30}
  chartConfig={chartConfig}
  bezier
/>
    </View>
  )
}

export default Linechart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
})