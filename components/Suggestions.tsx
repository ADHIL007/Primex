import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const Suggestions = ({ data }) => {
  // Initialize an array to store suggestions
  const suggestions = [];

  // Function to add a suggestion to the carousel
  const addSuggestion = (text) => {
    suggestions.push(
      <View key={text} style={styles.suggestion}>
        <Text style={styles.suggestionText}>{text}</Text>
      </View>
    );
  };

  // Check if the school has a school bus
  if (!data.hasSchoolBus) {
    addSuggestion('Consider adding a school bus for transportation.');
  }

  // Check if the school has a playground
  if (!data.playground) {
    addSuggestion('Ensure the presence of a playground for outdoor activities.');
  }

  // Check for each lab feature and suggest if any is missing
  const labFeatures = data.labFeatures || {};
  if (!labFeatures.biologyLab || !labFeatures.chemistryLab || !labFeatures.computerLab || !labFeatures.physicsLab) {
    addSuggestion('Ensure availability of all necessary labs for practical education.');
  }

  // Check staff to student ratio
  const staffCount = parseInt(data.numberOfStaffs || 0);
  const totalStudents = parseInt(data.boys || 0) + parseInt(data.girls || 0);
  if (totalStudents > 0) {
    const staffToStudentRatio = staffCount / totalStudents;
    if (staffToStudentRatio > 0.2) {
      addSuggestion('Consider hiring more staff to improve the staff to student ratio.');
    } else if (staffToStudentRatio < 0.1) {
      addSuggestion('Optimize staff resources as the staff to student ratio is low.');
    }
  }

  // Check school rating
  const rating = parseFloat(data.rating || 0);
  if (rating < 3) {
    addSuggestion('The school rating is low. Consider improving overall performance.');
  }

  // Additional suggestions to improve performance
  addSuggestion('Encourage extracurricular activities to foster student engagement.');
  addSuggestion('Provide regular professional development opportunities for staff.');

  // State to track current suggestion index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Animated value for smooth transitions
  const scrollX = new Animated.Value(0);

  // Effect to scroll automatically every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    }, 3000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [suggestions.length]);

  return (
    <ScrollView
      horizontal
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
      scrollEventThrottle={16}
      snapToInterval={widthPercentageToDP('100%')}
    >
      {suggestions.map((suggestion, index) => {
        const inputRange = [(index - 1) * widthPercentageToDP('100%'), index * widthPercentageToDP('100%'), (index + 1) * widthPercentageToDP('100%')];
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View key={index} style={[styles.suggestionContainer, { opacity }]}>
            {suggestion}
          </Animated.View>
        );
      })}
    </ScrollView>
  );
};

export default Suggestions;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  contentContainer: {
    alignItems: 'center',
  },
  suggestionContainer: {
    width: widthPercentageToDP('90%'),
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 15,
    elevation: 9,
    backgroundColor: '#1dd1a1',
  },
  suggestionText: {
    color: '#fff',
    fontFamily: 'Railway',
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
