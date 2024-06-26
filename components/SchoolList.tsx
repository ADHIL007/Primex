import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
      style={
        styles.card
      }>
      <View style={styles.rowContainer}>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.schoolName}>{school.schoolName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.location}>
          <MaterialIcons
            name="location-on"
            size={RFPercentage(1.7)}
            color="#333"
          />
          {school.location}{' '}
        </Text>
      </View>
      <View style={styles.infoMainContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.StaffLabel}>Staff Members:</Text>
          <Text
            style={{
              fontSize: RFPercentage(2.8),
              color: '#333',
            }}>
            {school.numberOfStaffs}
          </Text>
          <Text
            style={[
              styles.details,
              {
                backgroundColor: school.playground ? '#0be881' : '#ff3f34',
                padding: 5,
                borderRadius: 10,
              },
            ]}>
            Playground: {school.playground ? 'Yes' : 'No'}
          </Text>
          <Text
            style={[
              styles.details,
              {
                backgroundColor: school.hasSchoolBus ? '#0be881' : '#ff3f34',
                padding: 5,
                borderRadius: 10,
              },
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    padding: 14,
    width: '100%',
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    backgroundColor: '#1e90ff',
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
    fontSize: RFPercentage(3.4),
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
  StaffLabel: {
    fontSize: RFPercentage(1.8),
    color: '#333',
  },

  tag: {
    fontSize: RFPercentage(1.6),
    fontWeight: 'bold',
    color: '#fff',
    margin: 5,
  },
  boys: {
    backgroundColor: '#0097e6',
    padding: 5,
    borderRadius: 10,
  },
  girls: {
    backgroundColor: '#e84393', // Adjust the color as needed
    padding: 5,
    borderRadius: 10,
  },
  details: {
    fontSize: RFPercentage(1.6),
    color: '#ffffff',
    fontWeight: 'bold',
  },
  location: {
    fontSize: RFPercentage(1.7),
    color: 'rgba(0,0,0,0.5)',
    marginLeft: 35,
  },
  labFeaturesContainer: {
    marginTop: 10,
  },
  labFeaturesLabel: {
    fontSize: RFPercentage(1.8),
    marginBottom: 5,
    color: '#333',
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

  },
});

export default SchoolList;
