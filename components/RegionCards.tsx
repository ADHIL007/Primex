import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const RegionCards = ({ navigation ,schoolData }) => {
  const RegionData = schoolData

  return (
    <View style={styles.gridContainer}>
      {RegionData.map((item) => (
        <TouchableOpacity
          key={item.Rid}
          style={styles.card}
          onPress={() => navigation.navigate('RegionData', { RegionID: item.Rid })}
        >
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.cardDetails}>
            <Text style={styles.detailText}>Staffs: {item.staffs}</Text>
            <Text style={styles.detailText}>Students: {item.students}</Text>
            <Text style={styles.detailText}>Ratio: {(item.students / item.staffs).toFixed(2)}</Text>
            <Text
              style={[
                styles.detailText,
                { color: item.stocksrate === 10 ? '#36AE7C' : '#FA7070' },
              ]}
            >
              Stocks: {item.stocksrate === 10 ? 'Sufficient' : 'Needed'}
            </Text>
          </View>
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
    flexBasis: '48%', // Adjust this value as needed to control the width of each card
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDetails: {
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});
