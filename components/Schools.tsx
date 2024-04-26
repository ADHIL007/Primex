import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, Touchable, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { Firebase_DB } from '../screens/FirebaseConfig';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import ProgressChart2 from '../screens/Admin/ProgressChart2';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
const Schools = ({navigation,searchQuery}) => {
  console.log('searchq' + searchQuery)
  const [schoolData, setSchoolData] = useState([]);
  const [loading, setLoading] = useState(true);
  const images = [
    require('../assets/Backgrounds/schools/architecture-3372897_1280.jpg'),
    require('../assets/Backgrounds/schools/ball-state-university-4091037_1280.jpg'),
    require('../assets/Backgrounds/schools/building-8259184_1280.jpg'),
    require('../assets/Backgrounds/schools/dartmouth-college-292587_1280.jpg'),
    require('../assets/Backgrounds/schools/francis-quadrangle-1618326_1280.jpg'),
    require('../assets/Backgrounds/schools/johns-hopkins-university-1590925_1280.jpg'),
    require('../assets/Backgrounds/schools/samford-hall-1614183_1280.jpg'),
    require('../assets/Backgrounds/schools/university-4444808_1280.jpg'),
    require('../assets/Backgrounds/schools/yale-university-1604157_1280.jpg'),
    require('../assets/Backgrounds/schools/yale-university-1604158_1280.jpg'),
  ];

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const collectionRef = collection(Firebase_DB, 'Schools');
        const querySnapshot = await getDocs(collectionRef);
        const data = querySnapshot.docs.map(doc => doc.data());
        setSchoolData(data);
      } catch (error) {
        console.error('Error fetching schools:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchSchools();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e1e1e" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
    {schoolData.map((school, index) => (
  (school.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) || school.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
  <TouchableOpacity key={index} style={styles.item} onPress={() => {navigation.navigate('DetailedPublicView', {school: school})}}>
    <ImageBackground
      source={images[(index + 1) % images.length]}
      resizeMode="cover"
      style={styles.backgroundImage}
      blurRadius={35}
    >
      <View style={styles.content}>
        <Text style={styles.schoolName}>{school.schoolName}</Text>
        <Text style={styles.location}>{school.location}</Text>
        <View style={{ position: 'absolute', marginTop: heightPercentageToDP("13%") }}>
          <ProgressChart2
            data={school.rating}
            color={
              school.rating / 5 < 0.45
                ? '255, 63, 52'
                : school.rating / 5 < 0.75
                  ? '255, 191, 0'
                  : '0, 255, 0'
            }
            label={'rating'}
            Fcolor="#ffff"
          />
        </View>
      </View>
      <View style={{position:'absolute', bottom:0, width:'100%', padding: 20 }}>
        <Text style={{ color: "#ffffff", fontWeight: "bold" }}>View Details</Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>
))}

  </View>
  );
};

export default Schools;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:"50%"
  },
  item: {
    marginBottom: 20,
    height :heightPercentageToDP('24%'),
    padding:6,
    borderRadius:20
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 5,
    overflow: 'hidden',
  },
  content: {
    padding: 20,
    height:heightPercentageToDP('100%'),

  },
  schoolName: {
    fontSize: heightPercentageToDP("3.8%"),
    fontWeight: 'bold',
    color:"#ffffff",
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: '#ffff',
    marginBottom: 10,
  },
});
