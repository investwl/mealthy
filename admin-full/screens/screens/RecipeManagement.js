import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RecipeManagement = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const BASE_URL = 'http://localhost:5000/'; // Replace with your server's base URL for images

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Fetch recipes from the backend
  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/recipes"); // Replace with your machine's IP address
      console.log("Fetched recipes:", response.data); // Log the response
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error.message);
      alert("Error fetching recipes: " + error.message);
    }
  };

  // Handle Add Recipe (Navigating to Add Recipe Screen)
  const handleAddRecipe = () => {
    navigation.navigate('AddRecipe');
  };

  // Handle Delete Recipe
  const handleDeleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipes/${id}`);
      setRecipes(recipes.filter((recipe) => recipe.recipe_id !== id));
    } catch (error) {
      console.error('Error deleting recipe', error.message);
      alert("Error deleting recipe: " + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safecontainer}>
      <ImageBackground 
        source={require('../assets/background.png')} // Replace with your background image path
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="black" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Recipe Management</Text>
          </View>

          {/* Add Recipe Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddRecipe}>
              <Text style={styles.addButtonText}>+ Add Recipe</Text>
            </TouchableOpacity>
          </View>

          {/* Recipe List */}
          <FlatList
            data={recipes}
            keyExtractor={(item) => item.recipe_id.toString()}
            renderItem={({ item }) => (
              <View style={styles.recipeCard}>
                {/* Display the image using the URL from the database */}
                {item.image_url ? (
                  <Image
                    source={{ uri: BASE_URL + item.image_url }} // Prepend base URL if it's a relative path
                    style={styles.recipeImage}
                  />
                ) : (
                  <Image
                  //   source={require('../path/to/default_image.png')} // Fallback to default image
                    style={styles.recipeImage}
                  />
                )}

                <View style={styles.recipeDetails}>
                  <Text style={styles.recipeText}>{item.title}</Text>
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => handleDeleteRecipe(item.recipe_id)} style={styles.iconButton}>
                    <Text style={styles.iconText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    // resizeMode: 'cover', // Ensures the background image covers the entire screen
    justifyContent: 'center', // Centers the content vertically
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  backButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginLeft: 8,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2A2A2A',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  addButton: {
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    padding: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  recipeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  recipeImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  recipeDetails: {
    flex: 1,
  },
  recipeText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  iconText: {
    fontSize: 20,
    color: '#333',
  },
});

export default RecipeManagement;
