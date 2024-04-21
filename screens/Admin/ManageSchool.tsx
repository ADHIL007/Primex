import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import store from '../../Redux/Store';
import {getData} from '../AsyncStorage';
import {RFPercentage} from 'react-native-responsive-fontsize';

const ManageSchool = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const schoolsData = await getData('SCHOOLS');
        setSchools(schoolsData);
        console.log('schoolsData', schoolsData.length);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };

    fetchSchools();
  }, []);

  // Group schools by region
  const groupByRegion = () => {
    const groupedSchools = {};
    schools.forEach(school => {
      if (!groupedSchools[school.region]) {
        groupedSchools[school.region] = [];
      }
      groupedSchools[school.region].push(school);
    });
    return groupedSchools;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Manage Schools</Text>
      {Object.entries(groupByRegion()).map(([region, schoolsInRegion]) => (
        <View key={region}>
          <Text style={styles.regionTitle}>{region}</Text>
          {schoolsInRegion.length > 0 ? (
            schoolsInRegion.map((school, index) => (
              <View key={index} style={styles.schoolContainer}>
                <Text style={styles.schoolName}>{school.schoolName}</Text>
                <Text style={styles.schoolLocation}>{school.location}</Text>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    Total Students:{' '}
                    {parseInt(school.boys) + parseInt(school.girls)}
                  </Text>
                  <Text style={styles.infoText}>
                    Total Staffs: {parseInt(school.numberOfStaffs)}
                  </Text>
                  <Text
                    style={[
                      styles.infoText,
                      {
                        fontWeight: 'bold',
                        color:
                          school.perfomance === 'Increasing' ? 'green' : 'red',
                      },
                    ]}>
                    Performance: {school.perfomance ? school.perfomance : 'N/A'}
                  </Text>
                </View>
                {school.Classrooms == 0  ? (
                  <Text style={styles.statusLabel}>Data is not updated</Text>
                ) : (
                  <Text style={styles.statusLabelGreen}>
                    Data is up to date
                  </Text>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>
              No schools data available for this region
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e272e',
  },
  regionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#1e272e',
    backgroundColor: '#4bcffa',
    borderRadius: 10,
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
  },
  schoolContainer: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
  schoolName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e272e',
  },
  schoolLocation: {
    fontSize: 16,
    marginTop: 5,
    color: '#1e272e',
  },
  infoContainer: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#1e272e',
  },
  statusLabel: {
    position: 'absolute',
    top: 5,
    right: 5,
    color: 'red',
    fontSize: RFPercentage(1.5),
    borderWidth: 1,
    borderColor: 'red',
    padding: 5,
    borderRadius: 15,
  },
  statusLabelGreen: {
    position: 'absolute',
    top: 5,
    right: 5,
    color: 'green',
    fontSize: RFPercentage(1.5),
    borderWidth: 1,
    borderColor: 'green',
    padding: 5,
    borderRadius: 15,
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ManageSchool;
