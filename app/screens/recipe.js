import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';

const Recipe = () => {
  const trendingRecipes = [
    { id: 'trend-1', title: 'Plant-based Food', Image: '../assets/trending-page1.jpg'},
    { id: 'trend-2', title: '15-minute Meals', image: './app/assets/trending-page2.webp'},
  ];

  const mealCategories = [
    {
      title: 'Breakfast',
      recipes: [
        { id: 'breakfast-1', name: 'Baked Carrot Cake Oatmeal', time: '20m', calories: '253 kcal', image: './app/assets/breakfast-1.jpg' },
        { id: 'breakfast-2', name: 'Salted Caramel Overnight Oats', time: '30m', calories: '453 kcal', image: './app/assets/breakfast-2.jpg' },
        { id: 'breakfast-3', name: 'Buckwheat pancakes with berries', time: '20m', calories: '314 kcal', image: './app/assets/breakfast-3.jpg' },
      ],
    },
    {
      title: 'Lunch',
      recipes: [
        { id: 'lunch-1', name: 'Pumpkin Empanadas', time: '40m', calories: '192 kcal', image: './app/assets/lunch-1.jpg' },
        { id: 'lunch-2', name: 'Onigiri with Salmon Filling', time: '40m', calories: '362 kcal', image: './app/assets/lunch-2.jpg' },
        { id: 'lunch-3', name: 'Fish stew with fennel and saffron', time: '30m', calories: '468 kcal', image: './app/assets/lunch-3.jpg' },
      ],
    },
    {
      title: 'Dinner',
      recipes: [
        { id: 'dinner-1', name: 'Shrimp Taco in salad leaves with guacamole', time: '20m', calories: '498 kcal', image: './app/assets/dinner-1.jpg' },
        { id: 'dinner-2', name: 'Creamy Lemon Zucchini Pasta', time: '35m', calories: '502 kcal', image: './app/assets/dinner-2.jpg' },
        { id: 'dinner-3', name: 'Crispy Tofu with Maple-Soy Glaze', time: '35m', calories: '302 kcal', image: './app/assets/dinner-3.webp' },
      ],
    },
  ];

  const renderTrending = () => (
    <FlatList
      data={trendingRecipes}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.trendingCard}>
          <Image source={{ uri: item.image }} style={styles.trendingImage} />
          <Text style={styles.trendingText}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );

  const renderMealSection = ({ title, recipes }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={recipes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recipeCard}>
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{item.name}</Text>
            <Text style={styles.recipeInfo}>{`${item.time} | ${item.calories}`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Trending Section */}
      <Text style={styles.sectionTitle}>Trending</Text>
      {renderTrending()}

      {/* Meal Sections */}
      {mealCategories.map((category) => renderMealSection(category))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  trendingCard: {
    marginRight: 16,
  },
  trendingImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  trendingText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  recipeCard: {
    marginRight: 16,
    width: 150,
  },
  recipeImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  recipeName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  recipeInfo: {
    fontSize: 12,
    color: '#666',
  },
});

export default Recipe;
