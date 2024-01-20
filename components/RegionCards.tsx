import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

// Inside the RegionCards component
const RegionCards = ({ navigation, schoolData }: any) => {
  const regionData = schoolData;

  return (
    <View style={styles.gridContainer}>
      {Object.entries(regionData).map(([region, data]) => (
        <TouchableOpacity
          key={region}
          style={styles.card}
          onPress={() => navigation.navigate('RegionData', { RegionID: region, SchoolData: regionData[region] })}

        >
          <Text style={styles.cardTitle}>{region}</Text>
          {data.map((item: any, index: number) => (
            <View key={index} style={styles.cardDetails}>
              <Text style={styles.detailText}>Schools: {item.totalSchools}</Text>
              <Text style={styles.detailText}>Staffs: {item.totalStaffs}</Text>
              <Text style={styles.detailText}>Students: {item.totalStudents}</Text>
              <Text style={styles.detailText}>Ratio: {(item.totalStudents / item.totalStaffs).toFixed(2)}</Text>
            </View>
          ))}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RegionCards;

const styles = StyleSheet.create({
  gridContainer: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    flexBasis: '48%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDetails: {
    flex: 1,
  },
  detailText: {
    fontSize: RFPercentage(1.6),
    color: '#555',
    marginBottom: 4,
  },
});
