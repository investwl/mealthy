import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "../config/recipe-card-styles";
import { useFonts } from 'expo-font';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const RecipeCard = () => {
  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Regular': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-Medium': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-Bold': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>
  }


  return (
    <ScrollView style={styles.container}>
      <Image source={require("../assets/dinner-1.jpg")} style={styles.image} />
      
      <Text style={styles.title}>Shrimp Taco in Salad Leaves with Guacamole</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity><Icon name="bookmark-outline" size={48} color="gray" paddingLeft="70"/></TouchableOpacity>
        <TouchableOpacity><Icon name="calendar-plus" size={48} color="gray" paddingLeft="40"/></TouchableOpacity>
        <TouchableOpacity><Icon name="share-variant" size={48} color="gray" paddingLeft="35"/></TouchableOpacity>
      </View>
      <Text style={styles.author}>By Sean Anasta</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.eta}>⏳ 30 min</Text>
        <Text style={styles.calorie}>🔥 468 kcal</Text>
      </View>

      <View style={styles.nutritionContainer}>
        <Text style={styles.carbs}>45% Carbs</Text>
        <Text style={styles.fat}>10% Fat</Text>
        <Text style={styles.protein}>23% Protein</Text>
      </View>

      <View style={styles.ingredientsContainer}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Text style={styles.ingredient}>•  200 grams shrimp</Text>
        <Text style={styles.ingredient}>•  4 taco breads</Text>
        <Text style={styles.ingredient}>•  10 grams cilantro</Text>
        <Text style={styles.ingredient}>•  1 avocado</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RecipeCard;
