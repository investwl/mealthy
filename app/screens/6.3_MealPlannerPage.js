import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, ScrollView, Text, TouchableOpacity, Platform, Appearance, Image, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../components/Header';
import MealItem from '../components/MealItem';
import { useFonts } from 'expo-font';
import BottomNavigation from '../components/BottomNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/6.3_MealPlannerStyles';


const MealPlannerPage = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Regular': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-Medium': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-Bold': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Bold.ttf'),
  });

  // Unique images for each meal category
  const meals = {
    breakfast: { image: require('../assets/breakfast-1.jpeg'), name: 'Baked Carrot Cake Oatmeal' },
    lunch: { image: require('../assets/lunch-1.jpg'), name: 'Spaghetti Carbonara' },
    dinner: { image: require('../assets/dinner-1.jpg'), name: 'Grilled Salmon with Veggies' },
  };

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const colorScheme = Appearance.getColorScheme(); // Mode dark/light detection

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowPicker(false); // Close picker after selection
  };

  return (
    <TouchableWithoutFeedback onPress={() => setShowPicker(false)}>
      <SafeAreaView style={styles.containersafe}>
        <View style={styles.container}>
          <Header navigation={navigation} title="MY MEAL PLANNERS" />
  
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
            <TouchableWithoutFeedback onPress={() => setShowPicker(false)}>
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
            </TouchableWithoutFeedback>
          )}
  
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <MealItem title="Breakfast" imageUrl={meals.breakfast.image} mealName={meals.breakfast.name} onPress={() => navigation.navigate('MyProfile')} />
            <MealItem title="Lunch" imageUrl={meals.lunch.image} mealName={meals.lunch.name} onPress={() => navigation.navigate('MyProfile')} />
            <MealItem title="Dinner" imageUrl={meals.dinner.image} mealName={meals.dinner.name} onPress={() => navigation.navigate('MyProfile')} />
          </ScrollView>
        </View>
        <BottomNavigation navigation={navigation} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
  
};

export default MealPlannerPage;
