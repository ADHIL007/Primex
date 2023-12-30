import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SchoolList = ({school, number}) => {
  if (!school || !school.labFeatures) {
    return null;
  }

  const labFeatures = school.labFeatures || {};
  const hasBiologyLab = labFeatures.biologyLab || false;
  const hasChemistryLab = labFeatures.chemistryLab || false;
  const hasComputerLab = labFeatures.computerLab || false;
  const hasElectronicsLab = labFeatures.electronicsLab || false;
  const hasPhysicsLab = labFeatures.physicsLab || false;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: number % 2 === 0 ? '#eeeeee' : '#fff',
        },
      ]}>
      <View style={styles.rowContainer}>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.schoolName}>{school.schoolName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.location}>{school.location}</Text>
      </View>
      <View style={styles.infoMainContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.details}>
            Staff Members:
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: '#333',
              }}>
              {school.numberOfStaffs}
            </Text>
          </Text>

          <Text
            style={[
              styles.details,
              {backgroundColor: school.playground ? '#A6CF98' : '#FF8F8F',
              padding: 5,
              borderRadius: 10,},
            ]}>
            Playground: {school.playground ? 'Yes' : 'No'}
          </Text>
          <Text
            style={[
              styles.details,
              {backgroundColor: school.hasSchoolBus ? '#A6CF98' : '#FF8F8F',padding: 5,
              borderRadius: 10,},
            ]}>
            School Bus: {school.hasSchoolBus ? 'Yes' : 'No'}
          </Text>
        </View>
        <View style={styles.infotagContainer}>
          <Text style={[styles.tag, styles.boys]}>Boys - {school.boys}</Text>
          <Text style={[styles.tag, styles.girls]}>Girls - {school.girls}</Text>
        </View>
        <View style={styles.labFeaturesContainer}>
          <Text style={styles.labFeaturesLabel}>Lab Features:</Text>
          <View style={styles.labFeaturesList}>
            {hasBiologyLab && (
              <Text style={styles.labFeature}>Biology Lab</Text>
            )}
            {hasChemistryLab && (
              <Text style={styles.labFeature}>Chemistry Lab</Text>
            )}
            {hasComputerLab && (
              <Text style={styles.labFeature}>Computer Lab</Text>
            )}
            {hasElectronicsLab && (
              <Text style={styles.labFeature}>Electronics Lab</Text>
            )}
            {hasPhysicsLab && (
              <Text style={styles.labFeature}>Physics Lab</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    elevation: 5,
    margin: 10,
    padding: 16,
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    backgroundColor: '#7BD3EA',
    padding: 5,
    borderRadius: 50,
    width: 30,
    height: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginRight: 10,
  },
  schoolName: {
    fontSize: 25,
    color: '#333333',
  },
  infoMainContainer: {
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infotagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tag: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    margin: 10,
  },
  boys: {
    backgroundColor: '#7BD3EA',
    padding: 5,
    borderRadius: 10,
  },
  girls: {
    backgroundColor: '#F875AA', // Adjust the color as needed
    padding: 5,
    borderRadius: 10,
  },
  details: {
    fontSize: 16,
    color: '#555555',
  },
  location: {
    fontSize: 17,
    color: 'rgba(0,0,0,0.5)',
    marginLeft: 35,
    fontStyle: 'italic',
  },
  labFeaturesContainer: {
    marginTop: 10,
  },
  labFeaturesLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  labFeaturesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  labFeature: {
    fontSize: 16,
    backgroundColor: '#888',
    padding: 5,
    borderRadius: 10,
    color: '#eee',
    margin: 5,
    elevation: 5,
  },
});

export default SchoolList;
