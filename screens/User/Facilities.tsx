import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import store from '../../Redux/Store';
import {RFPercentage} from 'react-native-responsive-fontsize';

export const Facilities = ({school}) => {

  const labFeatures = school.labFeatures || {};
  const hasBiologyLab = labFeatures.biologyLab || false;
  const hasChemistryLab = labFeatures.chemistryLab || false;
  const hasComputerLab = labFeatures.computerLab || false;
  const hasElectronicsLab = labFeatures.electronicsLab || false;
  const hasPhysicsLab = labFeatures.physicsLab || false;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.schoolName}>{school.name}</Text>
        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.details,
              {backgroundColor: school.playground ? '#2ecc71' : '#e74c3c'},
            ]}>
            Playground: {school.playground ? 'Yes' : 'No'}
          </Text>
          <Text
            style={[
              styles.details,
              {backgroundColor: school.hasSchoolBus ? '#2ecc71' : '#e74c3c'},
            ]}>
            School Bus: {school.hasSchoolBus ? 'Yes' : 'No'}
          </Text>
          <Text
            style={[
              styles.details,
              {
                backgroundColor:
                  school.rating < 2.5
                    ? '#e74c3c'
                    : school.rating < 3.5
                    ? '#f1c40f'
                    : '#2ecc71',
              },
            ]}>
            Status:{' '}
            {school.rating < 2.5
              ? 'Bad'
              : school.rating < 3.5
              ? 'Average'
              : 'Good'}
          </Text>
        </View>
        <View style={styles.infotagContainer}>
          <Text style={[styles.tag, styles.boys]}>Boys - {school.boys}</Text>
          <Text style={[styles.tag, styles.girls]}>Girls - {school.girls}</Text>
        </View>
        <View style={styles.labFeaturesContainer}>
          <Text style={styles.labFeaturesLabel}>Lab Features:</Text>
          <View style={styles.labFeaturesList}>
            <Text
              style={[
                styles.labFeature,
                !hasBiologyLab && styles.falseLabFeature,
              ]}>
              Biology Lab: {hasBiologyLab ? 'Yes' : 'No'}
            </Text>
            <Text
              style={[
                styles.labFeature,
                !hasChemistryLab && styles.falseLabFeature,
              ]}>
              Chemistry Lab: {hasChemistryLab ? 'Yes' : 'No'}
            </Text>
            <Text
              style={[
                styles.labFeature,
                !hasComputerLab && styles.falseLabFeature,
              ]}>
              Computer Lab: {hasComputerLab ? 'Yes' : 'No'}
            </Text>
            <Text
              style={[
                styles.labFeature,
                !hasElectronicsLab && styles.falseLabFeature,
              ]}>
              Electronics Lab: {hasElectronicsLab ? 'Yes' : 'No'}
            </Text>
            <Text
              style={[
                styles.labFeature,
                !hasPhysicsLab && styles.falseLabFeature,
              ]}>
              Physics Lab: {hasPhysicsLab ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  falseLabFeature: {
    color: 'red',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  infotagContainer: {
    flexDirection: 'row',
  },
  tag: {
    fontSize: RFPercentage(1.6),
    fontWeight: 'bold',
    color: '#fff',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  boys: {
    backgroundColor: '#0097e6',
  },
  girls: {
    backgroundColor: '#e84393',
  },
  details: {
    fontSize: RFPercentage(1.6),
    color: '#ffffff',
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 10,
  },
  labFeaturesContainer: {},
  labFeaturesLabel: {
    fontSize: RFPercentage(1.8),
    marginBottom: 5,
    color: '#333',
    fontWeight: 'bold',
  },
  labFeaturesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  labFeature: {
    fontSize: RFPercentage(1.6),
    backgroundColor: '#192a56',
    padding: 5,
    borderRadius: 10,
    color: '#fff',
    margin: 5,
    fontWeight: 'bold',
  },
});

export default Facilities;
