import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, Share } from "react-native";
import * as Clipboard from 'expo-clipboard';
import styles from "../config/recipe-card-styles";
import { useFonts } from 'expo-font';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Svg, { Circle } from 'react-native-svg';
import { useRoute, useNavigation } from '@react-navigation/native';
import BottomNavigation from '../components/BottomNavigation';

const RecipeCard = () => {
  
  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Regular': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-Bold': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>
  }

  const [bookmarked, setBookmarked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { recipe } = route.params;

  const toggleBookmark = () => {
    const newValue = !bookmarked;
    setBookmarked(newValue);
    if (newValue) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1000);
    }
  };

  const toggleCalendar = () => {
    // Navigate to MealPlanner passing the recipe image
    navigation.navigate('MakePlanner', { recipeImage: recipe.image });
  };

  const shareRecipe = async () => {
    Alert.alert(
      "Share Recipe",
      "Choose an option:",
      [
        {
          text: "Copy Link",
          onPress: async () => {
            await Clipboard.setStringAsync(recipe.link); // disini link nya diambil dari masing2 recipe, pasang placeholder i think
            Alert.alert("Link Copied", "The recipe link has been copied to your clipboard.");
          }
        },
        {
          text: "Share to External Apps",
          onPress: async () => {
            try {
              await Share.share({ message: recipe.link });
            } catch (error) {
              Alert.alert("Error", error.message);
            }
          }
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  const NutritionCircle = ({ percentage, label }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const getGreenShade = (percentage) => {
      const lightness = 85 - (percentage * 0.35); 
      const saturation = 60; 
      return `hsl(117, ${saturation}%, ${lightness}%)`; 
    };
    const strokeColor = getGreenShade(percentage);
  
    return (
      <View style={styles.circleContainer}>
        <Svg height="100" width="100" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#e0e0e0"
            strokeWidth="8"
            fill="transparent"
          />
          <Circle
            cx="50"
            cy="50"
            r={radius}
            stroke={strokeColor}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 50 50)`} // Rotate to start from top
          />
        </Svg>
        <Text style={styles.percentageText}>{percentage}%</Text>
        <Text style={styles.labelText}>{label}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={30} color="white" />
        </TouchableOpacity>
        <Image source={recipe.image} style={styles.image} />
        
        {/* Title centered */}
        <Text style={styles.title}>{recipe.title}</Text>

        <View style={styles.iconsContainer}>
          {/* Small icons */}
          <TouchableOpacity onPress={toggleBookmark}>
            <Icon 
              name={bookmarked ? "bookmark" : "bookmark-outline"} 
              size={30} // Smaller icon size
              color="black" 
              style={{ paddingLeft: 15, paddingRight: 15 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleCalendar}>
            <Icon 
              name="calendar-plus" 
              size={30} // Smaller icon size
              color="black" 
              style={{ paddingLeft: 15, paddingRight: 15 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareRecipe}>
            <Icon 
              name="share-variant" 
              size={30} // Smaller icon size
              color="black" 
              style={{ paddingLeft: 15, paddingRight: 15 }}
            />
          </TouchableOpacity>
        </View>
        
        {/* Name with border below */}
        <Text style={styles.author}>{recipe.author}</Text>
        <View style={styles.borderLine}></View>

        <View style={styles.infoContainer}>
          <Text style={styles.eta}>⏳ {recipe.time}</Text>
          <Text style={styles.calorie}>🔥 {recipe.calories}</Text>
        </View>
  
        <View style={styles.nutritionRow}>
          <NutritionCircle percentage={recipe.carbs} label="Carbs" />
          <NutritionCircle percentage={recipe.fat} label="Fat" />
          <NutritionCircle percentage={recipe.protein} label="Protein" />
        </View>
  
        <View style={styles.ingredientsContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredient}>•     {ingredient}</Text>
          ))}
        </View>
  
        <View style={styles.instructionsContainer}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructionText}>{recipe.instruction}</Text>
        </View>
      </ScrollView>
      {showNotification && (
        <View style={styles.notificationPopup}>
          <Text style={styles.notificationText}>Bookmarked Recipe</Text>
        </View>
      )}
      <BottomNavigation navigation={navigation} />
    </View>
  );
};

export default RecipeCard;
