import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  FlatList,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import axios from 'axios';

const CaloriePage = ({ navigation }) => {
  const [selectedFood, setSelectedFood] = useState('');
  const [portionSize, setPortionSize] = useState('');
  const [calories, setCalories] = useState(null);
  const [fat, setFat] = useState(null);
  const [protein, setProtein] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // const [foodData, setFoodData] = useState([]);

  // useEffect(() => {
  //   // Fetch food data from the local API
  //   axios
  //     .get('http://localhost:5000/api/foods') // Replace with your actual API URL
  //     .then((response) => {
  //       setFoodData(response.data);
  //       if (response.data.length > 0) {
  //         setSelectedFood(response.data[0].name); // Set initial food selection
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching food data:', error);
  //     });
  // }, []);

  // Dummy food data
  const foodData = [
    { name: 'Apple', calories: 52, fat: 0.2, protein: 0.3, carbs: 14, fiber: 2.4 },
    { name: 'Banana', calories: 89, fat: 0.3, protein: 1.1, carbs: 23, fiber: 2.6 },
    { name: 'Orange', calories: 43, fat: 0.1, protein: 1, carbs: 11, fiber: 2.4 },
    { name: 'Strawberry', calories: 32, fat: 0.3, protein: 0.7, carbs: 7.7, fiber: 2.0 },
    { name: 'Pizza', calories: 285, fat: 10, protein: 12, carbs: 36, fiber: 2.5 },
    { name: 'Burger', calories: 295, fat: 12, protein: 16, carbs: 34, fiber: 2.0 },
    { name: 'Salad', calories: 150, fat: 12, protein: 5, carbs: 20, fiber: 4.0 },
    { name: 'Ice Cream', calories: 207, fat: 11, protein: 3.5, carbs: 24, fiber: 0.0 },
    { name: 'Pasta', calories: 131, fat: 1.1, protein: 5.1, carbs: 25, fiber: 3.0 },
    { name: 'Chicken Breast (cooked)', calories: 165, fat: 3.6, protein: 31, carbs: 0, fiber: 0.0 },
    { name: 'Rice', calories: 130, fat: 0.3, protein: 2.7, carbs: 28, fiber: 0.4 },
    { name: 'Milk', calories: 103, fat: 2.4, protein: 8.1, carbs: 12, fiber: 0.0 },
    { name: 'Almonds', calories: 576, fat: 49, protein: 21, carbs: 22, fiber: 12.2 },
    { name: 'Salmon', calories: 208, fat: 13, protein: 20, carbs: 0, fiber: 0.0 },
    { name: 'Broccoli', calories: 55, fat: 0.6, protein: 3.7, carbs: 11, fiber: 5.1 },
    { name: 'Spinach', calories: 23, fat: 0.4, protein: 2.9, carbs: 3.6, fiber: 2.2 },
    { name: 'Egg', calories: 155, fat: 11, protein: 13, carbs: 1.1, fiber: 0.0 },
    { name: 'Yogurt', calories: 59, fat: 3.3, protein: 10, carbs: 3.6, fiber: 0.0 },
    { name: 'Avocado', calories: 160, fat: 15, protein: 2, carbs: 9, fiber: 7.0 },
    { name: 'Carrot', calories: 41, fat: 0.2, protein: 0.9, carbs: 9.6, fiber: 2.8 },
    { name: 'Cucumber', calories: 16, fat: 0.1, protein: 0.7, carbs: 3.6, fiber: 0.5 },
    { name: 'Tomato', calories: 18, fat: 0.2, protein: 0.9, carbs: 3.9, fiber: 1.2 },
    { name: 'Lentils', calories: 116, fat: 0.4, protein: 9, carbs: 20, fiber: 7.9 },
    { name: 'Quinoa', calories: 120, fat: 1.9, protein: 4.1, carbs: 21, fiber: 2.8 },
    { name: 'Sweet Potato', calories: 86, fat: 0.1, protein: 1.6, carbs: 20, fiber: 3.0 },
    { name: 'Cottage Cheese', calories: 98, fat: 4.3, protein: 11, carbs: 3.4, fiber: 0.0 },
    { name: 'Tuna (canned in water)', calories: 132, fat: 0.6, protein: 28, carbs: 0, fiber: 0.0 },
    { name: 'Oatmeal', calories: 71, fat: 1.4, protein: 2.5, carbs: 12, fiber: 1.7 },
    { name: 'Chia Seeds', calories: 486, fat: 31, protein: 17, carbs: 42, fiber: 34.4 },
    { name: 'Chickpeas', calories: 164, fat: 2.6, protein: 8.9, carbs: 27, fiber: 7.6 },
    { name: 'Peanut Butter', calories: 588, fat: 50, protein: 25, carbs: 20, fiber: 6.0 },
    { name: 'BBQ Chicken', calories: 200, fat: 8, protein: 30, carbs: 14, fiber: 1.5 },
    { name: 'Buffalo Wings', calories: 500, fat: 30, protein: 40, carbs: 10, fiber: 1.5 },
    { name: 'Chicken Alfredo', calories: 450, fat: 20, protein: 35, carbs: 30, fiber: 4.0 },
    { name: 'Chicken Biryani', calories: 400, fat: 18, protein: 30, carbs: 50, fiber: 5.0 },
    { name: 'Chicken Burrito', calories: 500, fat: 22, protein: 32, carbs: 45, fiber: 7.0 },
    { name: 'Chicken Caesar Salad', calories: 450, fat: 30, protein: 34, carbs: 16, fiber: 3.0 },
    { name: 'Chicken Cordon Bleu', calories: 433, fat: 27, protein: 31, carbs: 20, fiber: 0.5 },
    { name: 'Chicken Fajitas', calories: 350, fat: 12, protein: 32, carbs: 30, fiber: 5.0 },
    { name: 'Chicken Nuggets', calories: 250, fat: 15, protein: 15, carbs: 18, fiber: 2.5 },
    { name: 'Chicken Parmesan', calories: 400, fat: 18, protein: 30, carbs: 35, fiber: 4.0 },
    { name: 'Chicken Pot Pie', calories: 450, fat: 22, protein: 24, carbs: 38, fiber: 3.5 },
    { name: 'Chicken Quesadilla', calories: 400, fat: 20, protein: 30, carbs: 30, fiber: 2.0 },
    { name: 'Chicken Shawarma', calories: 410, fat: 22, protein: 30, carbs: 25, fiber: 3.0 },
    { name: 'Chicken Soup', calories: 150, fat: 6, protein: 18, carbs: 15, fiber: 2.0 },
    { name: 'Chicken Stir Fry', calories: 290, fat: 10, protein: 28, carbs: 25, fiber: 3.5 },
    { name: 'Chicken Tikka Masala', calories: 300, fat: 18, protein: 24, carbs: 20, fiber: 3.0 },
    { name: 'Chicken Wings', calories: 400, fat: 25, protein: 30, carbs: 10, fiber: 1.0 },
    { name: 'Fried Chicken', calories: 300, fat: 16, protein: 23, carbs: 20, fiber: 2.0 },
    { name: 'Grilled Chicken', calories: 165, fat: 3.6, protein: 31, carbs: 0, fiber: 0.0 },
    { name: 'Roast Chicken', calories: 220, fat: 9, protein: 28, carbs: 0, fiber: 0.0 },
    { name: 'Turkey Breast', calories: 135, fat: 1, protein: 30, carbs: 0, fiber: 0.0 },
  ];

  // Handle food selection from dropdown
  const handleFoodSelection = (foodName) => {
    setSelectedFood(foodName);
    setModalVisible(false);
  };

  const handlePortionChange = (text) => {
    setPortionSize(text);
  };

  const getNutrients = () => {
    const food = foodData.find(
      (item) => item.name.toLowerCase() === selectedFood.toLowerCase()
    );

    if (food && portionSize) {
      const portionFactor = parseFloat(portionSize) / 100; // assuming food data is for 100g portions
      const caloriesForPortion = food.calories * portionFactor;
      const fatForPortion = food.fat * portionFactor;
      const proteinForPortion = food.protein * portionFactor;

      // Update current food nutrients
      setCalories(caloriesForPortion);
      setFat(fatForPortion);
      setProtein(proteinForPortion);

      // Update total nutrients
      setTotalCalories((prev) => prev + caloriesForPortion);
      setTotalFat((prev) => prev + fatForPortion);
      setTotalProtein((prev) => prev + proteinForPortion);

      // Get current date for the diary entry
      const currentDate = new Date().toLocaleDateString();

      // Save the entry to the diary container with the date
      setDiaryEntries([
        ...diaryEntries,
        {
          food: food.name,
          portion: portionSize,
          calories: caloriesForPortion.toFixed(2),
          fat: fatForPortion.toFixed(2),
          protein: proteinForPortion.toFixed(2),
          date: currentDate,
        },
      ]);
    } else {
      alert('Please provide a valid portion size!');
    }
  };

  // Clear all diary entries and reset total values
  const clearAll = () => {
    setDiaryEntries([]);
    setTotalCalories(0);
    setTotalFat(0);
    setTotalProtein(0);
  };

  // Search filter for food list
  const filteredFoodData = foodData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDiaryEntry = ({ item }) => (
    <View style={styles.diaryEntry}>
      <Text>{item.food}</Text>
      <Text>Portion: {item.portion}g</Text>
      <Text>Calories: {item.calories} kcal</Text>
      <Text>Fat: {item.fat} g</Text>
      <Text>Protein: {item.protein} g</Text>
      <Text>Date: {item.date}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Header navigation={navigation} title="Calorie Counter" />
  
        {/* Main Content Area */}
        <ScrollView>
          
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ flex: 1 }}>
    
                {/* Top Part - Nutrients Display and Inputs */}
                <View style={{ padding: 30 }}>
                  {/* Total Nutrients Display */}
                  <View style={styles.nutrientcontainer}>
                    <View style={styles.totalCaloriesContainer}>
                      <Text style={styles.totalCaloriesText}>
                        Total Calories: {totalCalories.toFixed(2)}
                      </Text>
                      <Text style={styles.totalCaloriesText}>
                        Total Fat: {totalFat.toFixed(2)} g
                      </Text>
                      <Text style={styles.totalCaloriesText}>
                        Total Protein: {totalProtein.toFixed(2)} g
                      </Text>
                    </View>
                  </View>
    
                  {/* Food Selection and Portion Input */}
                  <View style={styles.inputcontainer}>
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: '#FFFBE2',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomWidth: 3,
                      }}
                    >
                      <Text style={styles.title}>Enter Your Food and Portion</Text>
                    </View>
    
                    <View style={{ padding: 20 }}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={styles.selector}
                      >
                        <Text style={styles.selectorText}>{selectedFood}</Text>
                      </TouchableOpacity>
    
                      <Modal
                        visible={isModalVisible}
                        animationType="slide"
                        onRequestClose={() => setModalVisible(false)}
                      >
                        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                          <View style={styles.modalContainer}>
                            <TextInput
                              style={styles.searchInput}
                              placeholder="Search for food..."
                              value={searchQuery}
                              onChangeText={setSearchQuery}
                            />
                            <FlatList
                              data={filteredFoodData}
                              keyExtractor={(item) => item.name}
                              renderItem={({ item }) => (
                                <TouchableOpacity
                                  style={styles.modalItem}
                                  onPress={() => handleFoodSelection(item.name)}
                                >
                                  <Text style={styles.modalItemText}>{item.name}</Text>
                                </TouchableOpacity>
                              )}
                              style={{ flex: 1 }}
                            />
                            <Button title="Close" onPress={() => setModalVisible(false)} />
                          </View>
                        </SafeAreaView>
                      </Modal>
    
                      <TextInput
                        style={styles.input}
                        placeholder="Enter portion size (grams)"
                        keyboardType="numeric"
                        value={portionSize}
                        onChangeText={handlePortionChange}
                      />
                    </View>
                  </View>
    
                  <View style={{ alignItems: 'center', alignSelf: 'center' }}>
                    {/* Add Food Button */}
                    <TouchableOpacity
                      style={[styles.button, styles.addButton]}
                      onPress={getNutrients}
                    >
                      <Text style={styles.buttonText}>Add Food</Text>
                    </TouchableOpacity>
    
                    {/* Clear All Button */}
                    <TouchableOpacity
                      style={[styles.button, styles.deleteButton]}
                      onPress={clearAll}
                    >
                      <Text style={styles.buttonText}>Clear All</Text>
                    </TouchableOpacity>
                  </View>
                </View>
    
                {/* Display Diary Entries - Make this part scrollable */}
                <View style={styles.diarycontainer}>
                  <View style={styles.diaryEntryContainer}>
                    <Text style={styles.diaryTitle}>Diary Entries : </Text>
                    <ImageBackground
                      source={require('../assets/flame.png')}
                      style={{ flex: 0.8 }}
                      resizeMode="contain"
                    >
                      <FlatList
                        data={diaryEntries}
                        renderItem={renderDiaryEntry}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.diaryList}
                      />
                    </ImageBackground>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ScrollView>
        <BottomNavigation navigation={navigation} />
      </SafeAreaView>
    </View>
  );
  
}  

const styles = StyleSheet.create({
  
  tophat : {
    backgroundColor: '#C0C78C',
    height: '10%',
    maxHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  texttop: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nutrientcontainer:{
    backgroundColor: '#FFFBE2',
    padding: 10,
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 20,
    width: '70%',
    alignSelf: 'center',
  },
  totalCaloriesContainer: {
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 20,
  },
  totalCaloriesText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputcontainer: {
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#C0C78C',
    borderRadius: 11,
    borderWidth:3,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  selector: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 100,
    marginBottom: 10,
    textAlign: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  selectorText: {
    fontSize: 18,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalItemText: {
    fontSize: 18,
  },
  input: {
    borderRadius:100,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    alignSelf: 'center',
    width: '90%',
  },
  
  button: {
    backgroundColor: '#007AFF', // Default background color (iOS blue)
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8, // Adjust for desired roundness
    alignItems: 'center', // Center text horizontally
    margin: 5, // Add some margin around buttons
    width: '100%',
    borderWidth:3,
  },

  addButton: {
    backgroundColor: '#C0C78C', // Your desired "Add Food" color
  },

  deleteButton: {
    backgroundColor: '#FF0000', // Example: Red for delete
  },

  buttonText: {
    color: 'white', // Text color (usually white or black for contrast)
    fontWeight: 'bold',
    fontSize: 16,
  },

  diarycontainer:{
    marginTop: '5%',
    padding: '10',  
    backgroundColor: '#C0C78C',
    minHeight: '50%',
    width: '100%',
    borderTopRightRadius:50,
    borderTopLeftRadius:50,
    alignContent: 'center',
    alignItems: 'center',
    flex:1,
  },
  diaryEntryContainer: {
    flex: 1,
    padding: 30,
    marginTop: '4%',
    backgroundColor: '#FFFBE2',
    width: '95%',
    borderTopRightRadius:50,
    borderTopLeftRadius:50,

  },
  diaryTitle: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  diaryList: {
    marginTop: 20,
    flex:1,
  },
  diaryEntry: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default CaloriePage;