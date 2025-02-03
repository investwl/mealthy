import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "../config/recipe-card-styles";
import { useFonts } from 'expo-font';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Svg, { Circle } from 'react-native-svg';
import { useRoute } from '@react-navigation/native';

const RecipeCard = () => {
  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Regular': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-Medium': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-Bold': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>
  }

  const NutritionCircle = ({ percentage, label }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const strokeColor = `hsl(${percentage}, 100%, 50%)`; // Dynamic color based on percentage
  
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
            transform={`rotate(-90 50 50)`}
          />
        </Svg>
        <Text style={styles.percentageText}>{percentage}%</Text>
        <Text style={styles.labelText}>{label}</Text>
      </View>
    );
  };

  const route = useRoute();
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={recipe.image} style={styles.image} />
      
      <Text style={styles.title}>{recipe.title}</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity><Icon name="bookmark-outline" size={48} color="gray" paddingLeft="70"/></TouchableOpacity>
        <TouchableOpacity><Icon name="calendar-plus" size={48} color="gray" paddingLeft="48"/></TouchableOpacity>
        <TouchableOpacity><Icon name="share-variant" size={48} color="gray" paddingLeft="48"/></TouchableOpacity>
      </View>
      <Text style={styles.author}>By Sean Anasta</Text>

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
          <Text key={index} style={styles.ingredient}>•  {ingredient}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default RecipeCard;
