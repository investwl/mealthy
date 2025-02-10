import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Image } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { useRoute } from '@react-navigation/native';
import styles from '../config/meal-planner-styles';

const MealPlanner = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Regular': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-Medium': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-Bold': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>
  }

  const route = useRoute();
  // Get the recipeImage passed from RecipeCard
  const recipeImage = route.params?.recipeImage;

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // State to handle toggle for time buttons
  const [selectedMeal, setSelectedMeal] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const toggleMeal = (meal) => {
    setSelectedMeal((prevState) => ({
      ...prevState,
      [meal]: !prevState[meal],
    }));
  };

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button and Title */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButtonHeader}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MEAL PLANNER</Text>
      </View>

      {/* Render the image received from RecipeCard above the date */}
      {recipeImage && (
        <View style={{ marginVertical: 20 }}>
          <Image source={recipeImage} style={styles.mealImage} />
        </View>
      )}

      {/* Date Container */}
      <View style={styles.dateWrapper}>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity style={styles.dateContainer} onPress={() => setShowPicker(!showPicker)}>
          <Icon name="calendar" size={20} color="#555" style={styles.icon} />
          <Text style={styles.dateText}>
            {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <View style={styles.pickerOverlay}>
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
              onChange={onChangeDate}
            />
          </View>
        </View>
      )}

      {/* Time Section with Breakfast, Lunch, and Dinner in separate lines */}
      <View style={styles.timeWrapper}>
        <Text style={styles.label}>Time</Text>
        <View style={styles.timeContainer}>
          {/* Breakfast */}
          <TouchableOpacity
            style={[
              styles.timeButton,
              selectedMeal.breakfast && styles.selectedTimeButton,
            ]}
            onPress={() => toggleMeal('breakfast')}
          >
            <Icon 
              name="clock" 
              size={20} 
              color={selectedMeal.breakfast ? "#FFF" : "#555"} 
            />
            <Text
              style={[
                styles.timeText,
                selectedMeal.breakfast && styles.selectedTimeText,
              ]}
            >
              Breakfast
            </Text>
          </TouchableOpacity>
          {/* Lunch */}
          <TouchableOpacity
            style={[
              styles.timeButton,
              selectedMeal.lunch && styles.selectedTimeButton,
            ]}
            onPress={() => toggleMeal('lunch')}
          >
            <Icon 
              name="clock" 
              size={20} 
              color={selectedMeal.lunch ? "#FFF" : "#555"} 
            />
            <Text
              style={[
                styles.timeText,
                selectedMeal.lunch && styles.selectedTimeText,
              ]}
            >
              Lunch
            </Text>
          </TouchableOpacity>
          {/* Dinner */}
          <TouchableOpacity
            style={[
              styles.timeButton,
              selectedMeal.dinner && styles.selectedTimeButton,
            ]}
            onPress={() => toggleMeal('dinner')}
          >
            <Icon 
              name="clock" 
              size={20} 
              color={selectedMeal.dinner ? "#FFF" : "#555"} 
            />
            <Text
              style={[
                styles.timeText,
                selectedMeal.dinner && styles.selectedTimeText,
              ]}
            >
              Dinner
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.saveContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            navigation.navigate('MyProfile');
          }}
        >
          <Text style={styles.saveButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MealPlanner;