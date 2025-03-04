import React, { useState, useEffect, useContext } from 'react';
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
} from 'react-native';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { UserContext } from '../config/UserContext'; 
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { NGROK_URL } from "@env"; // Import NGROK_URL

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
  const [foodData, setFoodData] = useState([]);
  // const route = useRoute();
  // const { user_id } = route.params; 
  const {userId} = useContext(UserContext);

  useEffect(() => {
    // Fetch food data from the local API
    const fetchFoods = async () => {
      try {
        const response = await axios.get(`${NGROK_URL}/api/foods`); // Replace with your actual API URL
        setFoodData(response.data);
        if (response.data.length > 0) {
          setSelectedFood(response.data[0].name); // Set initial food selection
        }
      } catch (error) {
        console.error('Error fetching food data:', error);
        // Handle error (e.g., display an error message)
      }
    };

    const fetchCalorieLogs = async () => {
      try {
          const logResponse = await axios.get(`${NGROK_URL}/api/calorie_log`, {
              // params: { user_id: user_id }
              params: { user_id: userId }
          });
          setDiaryEntries(logResponse.data);
      } catch (error) {
          console.error("Error fetching calorie log entries:", error);
      }
  };

    fetchFoods();
    fetchCalorieLogs();
  }, []);

  // Handle food selection from dropdown
  const handleFoodSelection = (foodName) => {
    setSelectedFood(foodName);
    setModalVisible(false);
  };

  const handlePortionChange = (text) => {
    setPortionSize(text);
  };

  const getNutrients = async () => {
    try {
      // Fetch the selected food item by name from the server
      const response = await axios.get(`${NGROK_URL}/api/foods/name/${selectedFood}`);
      const food = response.data;

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

        //  SAVE TO DATABASE
        const logDate = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        const calorieLogEntry = {
          // user_id: user_id, 
          user_id: userId, 
          food_id: food.food_id,
          serving_size: portionSize,
          log_date: logDate,
        };

        try {
          const logResponse = await axios.post(`${NGROK_URL}/api/calorie_log`, calorieLogEntry);
          console.log("Calorie log entry saved:", logResponse.data);

          // Re-fetch calorie logs after adding a new entry
          const logEntriesResponse = await axios.get(`${NGROK_URL}/api/calorie_log`, {
            // params: { user_id: user_id }
            params: { user_id: userId }
          });
          setDiaryEntries(logEntriesResponse.data);
          // Optionally, update UI to indicate successful save (e.g., show a message)
        } catch (logError) {
          console.error("Error saving calorie log entry:", logError);
          // Handle error (e.g., show an error message to the user)
        }
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
    } catch (error) {
      console.error('Error fetching or processing food data:', error);
      alert('Failed to get nutrients. Please try again.');
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

  const renderItem = ({ item }) => {
    if (item.type === 'nutrientInput') {
      return (
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
                      keyExtractor={(item) => item.food_id.toString()}
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
      );
    } else if (item.type === 'diaryEntries') {
      return (
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
      );
    }
    return null; // Handle other item types if needed
  };

  const flatListData = [
    { type: 'nutrientInput', id: 'nutrientInput' }, // Unique id is required
    { type: 'diaryEntries', id: 'diaryEntries' }, // Unique id is required
  ];

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Header navigation={navigation} title="Calorie Counter" />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList
              data={flatListData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={{ flex: 1 }}
            />
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <BottomNavigation navigation={navigation} />
      </SafeAreaView>
    </View>
  );
};

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