import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import { launchImageLibrary } from 'react-native-image-picker'; // Image picker import
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon for the back button
import { ScrollView } from 'react-native-gesture-handler';

const AddRecipe = ({ navigation }) => {
  const [recipeName, setRecipeName] = useState('');
  const [detail, setDetail] = useState(''); // State for recipe detail
  const [cookingDuration, setCookingDuration] = useState('');
  const [totalCalories, setTotalCalories] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [protein, setProtein] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [instructions, setInstructions] = useState([{ step: '' }]);
  const [imageUri, setImageUri] = useState(null); // State to store image URI
  const [imageName, setImageName] = useState(null); // State to store image name

  // Handle adding ingredients
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  // Handle adding instructions
  const handleAddInstruction = () => {
    setInstructions([...instructions, { step: '' }]);
  };

  // Handle image selection
  const handleImageSelection = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        if (asset.uri) {
          setImageUri(asset.uri); // Set the image URI
          setImageName(asset.fileName); // Set the image file name
        }
      }
    });
  };

  // Handle submitting the recipe
  const handleSubmit = async () => {
    const recipeData = {
      title: recipeName.trim(),
      description: detail.trim(),
      cooking_duration: cookingDuration.trim(),
      calories: totalCalories.trim(),
      carbs: carbs.trim(),
      fat: fat.trim(),
      protein: protein.trim(),
      ingredients: JSON.stringify(ingredients.map(ingredient => ({
        name: ingredient.name.trim(),
        quantity: ingredient.quantity.trim(),
      }))),
      instructions: JSON.stringify(instructions.map(instruction => ({
        step: instruction.step.trim(),
      }))),
      image: imageName, // Send the image name to the backend
    };

    console.log('Recipe Data:', recipeData);

    // Construct FormData object
    const formData = new FormData();
    formData.append('title', recipeData.title);
    formData.append('description', recipeData.description);
    formData.append('cooking_duration', recipeData.cooking_duration);
    formData.append('calories', recipeData.calories);
    formData.append('carbs', recipeData.carbs);
    formData.append('fat', recipeData.fat);
    formData.append('protein', recipeData.protein);
    formData.append('ingredients', recipeData.ingredients); // Ingredients as JSON string
    formData.append('instructions', recipeData.instructions); // Instructions as JSON string

    if (imageUri) {
      // Use react-native-fs to ensure the image path is correct
      try {
        const path = await RNFS.exists(imageUri);
        if (path) {
          const file = {
            uri: imageUri,
            type: 'image/jpeg', // Adjust this based on the actual file type
            name: imageName || `recipe-image-${Date.now()}.jpg`, // Dynamically generate filename
          };
          formData.append('image', file); // Append image file to FormData
        } else {
          console.log('Invalid image URI');
        }
      } catch (error) {
        console.error('Error with file URI:', error);
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Recipe added:', response.data);
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error.message);
      alert("Error adding recipe: " + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safecontainer}>
      <ImageBackground 
        source={require('../assets/background.png')} // Replace with your background image path
        style={styles.backgroundImage}
      >
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <ScrollView style={styles.bigContainer}>

          <Text style={styles.header}>Add Recipe</Text>
          <View style={styles.container}>


            <TextInput
              style={styles.input}
              placeholder="Enter Recipe Name (e.g., Spaghetti Bolognese)"
              value={recipeName}
              onChangeText={setRecipeName}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter Recipe detail (e.g., Italian Classic Cuisine)"
              value={detail}
              onChangeText={setDetail}
            />

            <TextInput
              style={styles.input}
              placeholder="Cooking Duration (in minutes, e.g., 30)"
              value={cookingDuration}
              onChangeText={setCookingDuration}
              keyboardType="numeric"
            />

            <Text style={styles.subHeader}>Nutritional Information:</Text>
            <TextInput
              style={styles.input}
              placeholder="Total Calories (per serving, e.g., 500)"
              value={totalCalories}
              onChangeText={setTotalCalories}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Carbs (in grams, e.g., 50)"
              value={carbs}
              onChangeText={setCarbs}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Fat (in grams, e.g., 20)"
              value={fat}
              onChangeText={setFat}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Protein (in grams, e.g., 30)"
              value={protein}
              onChangeText={setProtein}
              keyboardType="numeric"
            />

            <Text style={styles.subHeader}>Ingredients:</Text>
            <FlatList
              data={ingredients}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.ingredientItem}>
                  <TextInput
                    style={styles.ingredientInput}
                    placeholder="Ingredient Name (e.g., Flour)"
                    value={item.name}
                    onChangeText={(text) => {
                      const newIngredients = [...ingredients];
                      newIngredients[index].name = text;
                      setIngredients(newIngredients);
                    }}
                  />
                  <TextInput
                    style={styles.ingredientInput}
                    placeholder="Quantity (e.g., 1 cup)"
                    value={item.quantity}
                    onChangeText={(text) => {
                      const newIngredients = [...ingredients];
                      newIngredients[index].quantity = text;
                      setIngredients(newIngredients);
                    }}
                  />
                </View>
              )}
            />
            <TouchableOpacity onPress={handleAddIngredient} style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Add Ingredient</Text>
            </TouchableOpacity>

            <Text style={styles.subHeader}>Instructions:</Text>
            <FlatList
              data={instructions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.instructionItem}>
                  <TextInput
                    style={styles.instructionInput}
                    placeholder="Instruction Step (e.g., Mix the ingredients)"
                    value={item.step}
                    onChangeText={(text) => {
                      const newInstructions = [...instructions];
                      newInstructions[index].step = text;
                      setInstructions(newInstructions);
                    }}
                  />
                </View>
              )}
            />
            <TouchableOpacity onPress={handleAddInstruction} style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Add Instruction</Text>
            </TouchableOpacity>

            {/* Image Picker Button */}
            <TouchableOpacity onPress={handleImageSelection} style={styles.addButton}>
              <Text style={styles.addButtonText}>{imageUri ? 'Change Image' : 'Add Image'}</Text>
            </TouchableOpacity>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Add Recipe</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bigContainer:{
    alignContent:'center',
    flex: 1,
  },
  safecontainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginTop:16,
  },
  backButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginLeft: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    width:'80%',
    alignSelf: 'center',
    backgroundColor:'white',
    borderRadius:10,
    paddingBottom: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    color: '#333',
    marginTop: 15,
  },
  input: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    borderRadius:5,
    // borderBottomColor:'#000000'
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    // width:'80%'
  },
  addButtonText: {
    fontSize: 16,
    color: '#2A2A2A',
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#425700',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    width:'70%'
  },
  submitButtonText: {
    alignSelf:'center',
    fontSize: 18,
    color: '#D9D9D9',
    // width:'70%'
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ingredientInput: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '45%',
  },
  instructionItem: {
    marginBottom: 10,
  },
  instructionInput: {
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default AddRecipe;