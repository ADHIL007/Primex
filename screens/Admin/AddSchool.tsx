import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { Firebase_DB } from '../FirebaseConfig';
import { RFPercentage } from 'react-native-responsive-fontsize';


const Dots = ({currentSlide, totalSlides}) => {
  return (
    <View style={styles.dotsContainer}>
      {[...Array(totalSlides)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                currentSlide >= index ? '#1e272e' : 'transparent',
            },
          ]}
        />
      ))}
    </View>
  );
};

// FirstSlide component
const FirstSlide = ({formData, setFormData}) => {
  return (
    <View style={styles.slide}>
      <TextInput
        placeholder="School Name"
        style={styles.input}
        value={formData.schoolName}
        onChangeText={text => setFormData({...formData, schoolName: text})}
        placeholderTextColor={'rgba(0,0,0,0.5)'}
      />
      <TextInput
        placeholder="Location"
        style={styles.input}
        value={formData.location}
        onChangeText={text => setFormData({...formData, location: text})}
        placeholderTextColor={'rgba(0,0,0,0.5)'}
      />
      <Picker
        selectedValue={formData.region}
        onValueChange={value => setFormData({...formData, region: value})}
        style={styles.Pickerinput}
        dropdownIconColor={'#eee'}
        itemStyle={{color: '#4CB9E7', backgroundColor: '#eee'}}>
        <Picker.Item label="Region 1" value="R1" />
        <Picker.Item label="Region 2" value="R2" />
        <Picker.Item label="Region 3" value="R3" />
        <Picker.Item label="Region 4" value="R4" />
      </Picker>
    </View>
  );
};

// SecondSlide component
const SecondSlide = ({formData, setFormData}) => {
  return (
    <View style={styles.slide}>
      <TextInput
        keyboardType="numeric"
        placeholder="Number of Staffs"
        style={styles.input}
        value={formData.numberOfStaffs}
        onChangeText={text => setFormData({...formData, numberOfStaffs: text})}
        placeholderTextColor={'rgba(0,0,0,0.5)'}
      />
      <TextInput
        keyboardType="numeric"
        placeholder="Number of Boys"
        style={styles.input}
        value={formData.boys}
        onChangeText={text => setFormData({...formData, boys: text})}
        placeholderTextColor={'rgba(0,0,0,0.5)'}
      />
      <TextInput
        keyboardType="numeric"
        placeholder="Number of Girls"
        style={styles.input}
        value={formData.girls}
        onChangeText={text => setFormData({...formData, girls: text})}
        placeholderTextColor={'rgba(0,0,0,0.5)'}
      />
    </View>
  );
};

// ThirdSlide component
const ThirdSlide = ({formData, setFormData}) => {
  const handleCheckBoxChange = key => {
    setFormData(prevData => ({
      ...prevData,
      labFeatures: {
        ...prevData.labFeatures,
        [key]: !prevData.labFeatures[key],
      },
    }));
  };

  return (
    <View style={styles.slide}>
      <View style={styles.checkboxOuter}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            isChecked={formData.labFeatures.biologyLab}
            onClick={() => handleCheckBoxChange('biologyLab')}
          />
          <Text style={{color: '#333'}}>Biology Lab</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            isChecked={formData.labFeatures.chemistryLab}
            onClick={() => handleCheckBoxChange('chemistryLab')}
          />
          <Text style={{color: '#333'}}>Chemistry Lab</Text>
        </View>
        {/* Add similar checkbox items for physicsLab, Computer, electronics */}
        <View style={styles.checkboxContainer}>
          <CheckBox
            isChecked={formData.labFeatures.physicsLab}
            onClick={() => handleCheckBoxChange('physicsLab')}
          />
          <Text style={{color: '#333'}}>Physics Lab</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            isChecked={formData.labFeatures.computerLab}
            onClick={() => handleCheckBoxChange('computerLab')}
          />
          <Text style={{color: '#333'}}>Computer Lab</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            isChecked={formData.labFeatures.electronicsLab}
            onClick={() => handleCheckBoxChange('electronicsLab')}
          />
          <Text style={{color: '#333'}}>Electronics Lab</Text>
        </View>
        {/* Add checkbox items for School Bus and Playground */}
        <View style={styles.checkboxContainer}>
          <CheckBox
            isChecked={formData.hasSchoolBus}
            onClick={() =>
              setFormData({...formData, hasSchoolBus: !formData.hasSchoolBus})
            }
          />
          <Text style={{color: '#333'}}>School Bus</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            isChecked={formData.playground}
            onClick={() =>
              setFormData({...formData, playground: !formData.playground})
            }
          />
          <Text style={{color: '#333'}}>Playground</Text>
        </View>
      </View>
    </View>
  );
};

const AddSchool = ({navigation}: any) => {
  const slides = [FirstSlide, SecondSlide, ThirdSlide];
  const [slide, setSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


const [formData, setFormData] = useState({
    schoolName: '',
    location: '',
    region: 'R1', // e.g., Region 1, Region 2, ...
    numberOfStaffs: '',
    boys: '',
    girls: '',
    labFeatures: {
        biologyLab: false,
        chemistryLab: false,
        physicsLab: false,
        computerLab: false,
        electronicsLab: false,
    },
    hasSchoolBus: false,
    playground: false,
    prevpass: [],
    totalTests: [],
    averageMathGrade: [],
    averageScienceGrade: [],
    averageEnglishGrade: [],
    averageAttendance: [],
    rating: 0
});

// Function to calculate and update the rating

const handleNext = () => {
    if (slide < slides.length - 1) {
        setSlide(slide + 1);
    }
};

const handlePrevious = () => {
    if (slide > 0) {
        setSlide(slide - 1);
    }
};

const handleSubmission = async () => {
    try {
        setIsLoading(true);
        // Check if any required field in formData is empty
        const requiredFields = [
            'schoolName',
            'location',
            'numberOfStaffs',
            'boys',
            'girls',
        ];

        for (const key of requiredFields) {
            if (formData[key] === '' || formData[key] === null) {
                Alert.alert(
                    'Incomplete Form',
                    'Please fill out all required fields before submitting.',
                );
                return;
            }
        }

        const dbCollection = collection(Firebase_DB, 'Schools');

        // Check if a document with the same schoolName already exists
        const schoolNameQuery = query(
            dbCollection,
            where('schoolName', '==', formData.schoolName),
        );
        const matchingDocs = await getDocs(schoolNameQuery);

        if (matchingDocs.size > 0) {
            // If a document with the same schoolName exists, show an alert and don't proceed
            Alert.alert(
                'School Name Already Exists',
                'Please choose a different school name. If you wish to edit the school, please go to Manage Schools.',
                [
                    {
                        text: 'OK',
                        style: 'cancel',
                    },
                    {
                        text: 'Manage Schools',
                        onPress: () => {
                            navigation.navigate('ManageSchool');
                        },
                    },
                ],
            );
            return;
        }

        // If all required fields are entered and the schoolName is unique, add the document to the collection
        await addDoc(dbCollection, formData);

        console.log('Form Data Submitted:', formData);
        Alert.alert('Form Data Submitted Successfully');
    } catch (error) {
        console.error('Error submitting form data:', error);
        Alert.alert(
            'An error occurred',
            'An error occurred while submitting the form data. Please try again.',
        );
    } finally {
        setIsLoading(false);
        // Update the rating after form submission

        navigation.replace('AddSchool');
    }
};



    return (
      <View style={styles.container}>
        <Text style={styles.headText}>Enroll a new school</Text>
        <Dots currentSlide={slide} totalSlides={slides.length} />
        <View style={styles.slideView}>
          {slides[slide]({ formData, setFormData })}
          <View style={styles.navigateBtns}>
            {slide !== 0 && (
              <TouchableOpacity
                style={[
                  styles.navigateBtn,
                  {
                    width: 150,
                    backgroundColor: '#50D890',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}
                onPress={handlePrevious}
              >
                <AntDesign name="arrowleft" size={24} color="white" />
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.navigateBtn,
                {
                  width: slide === 0 ? 300 : 150,
                  backgroundColor: slide === 2 ? '#1e272e' : '#50D890',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
              onPress={slide === 2 ? handleSubmission : handleNext}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <>
                  <Text style={styles.buttonText}>
                    {slide === 2 ? 'Submit' : 'Next'}
                  </Text>
                  {(slide === 0 || slide === 1) && (
                    <AntDesign name="arrowright" size={24} color="white" />
                  )}
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headText: {
    color: '#1e272e',
    fontWeight: 'bold',
    fontSize: RFPercentage(6),
    padding: 20,
    fontFamily: 'Raleway',
  },
  slideView: {
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',
  },
  navigateBtns: {
    flexDirection: 'row',
    marginTop: 20,
  },
  Pickerinput: {
    marginTop: 20,
    height: 70,

    borderColor: '#333',
    backgroundColor: '#1e272e',
    width: '100%',
  },
  navigateBtn: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  checkboxOuter: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow items to wrap to the next row
    marginBottom: 10,
    justifyContent: 'space-between', // Distribute items evenly along the row
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    marginRight: 5,
  },
  slide: {
    padding: 20,
    marginBottom: 10,
    height: 400,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  slideText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1e272e',
    color: '#1e272e',
    fontSize: 23,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
    height: 70,
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 25,
    position:'relative'
  },
  checkbox: {
    alignSelf: 'center',
    marginLeft: 5,

  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    margin: 5,
    borderWidth: 1,
    borderColor: '#1e272e',
    backgroundColor: '#1e272e',
  },
});

export default AddSchool;
