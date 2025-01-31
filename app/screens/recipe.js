import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../config/recipe-styles';
import { useFonts } from 'expo-font';

const Recipe = () => {
  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Regular': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-Medium': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-Bold': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Bold.ttf'),
  });

  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const filters = [
    { id: '1', name: 'Mealthy Top Picks' },
    { id: '2', name: 'Lactose Intolerant' },
    { id: '3', name: 'Gluten Free' },
    { id: '4', name: 'Vegetarian' },
  ];

  const trendingData = [
    { id: 'trend1', title: 'Plant-based Food', image: require('../assets/trending-page1.jpg')},
    { id: 'trend2', title: '15-minute Meals', image: require('../assets/trending-page2.webp')},
  ];

  const allRecipes = {
    Breakfast: [
      { id: 'breakfast1', title: 'Baked Carrot Cake Oatmeal with Cardamom', time: '20min', calories: '292kcal', image: require('../assets/breakfast-1.jpeg'), filters: ['1', '4'] },
      { id: 'breakfast2', title: 'Salted Caramel Overnight Oats', time: '30min', calories: '495kcal', image: require('../assets/breakfast-2.jpeg'), filters: ['1'] },
      { id: 'breakfast3', title: 'Buckwheat Pancakes with berries', time: '20min', calories: '314kcal', image: require('../assets/breakfast-3.jpeg'), filters: ['1'] },
    ],
    Lunch: [
      { id: 'lunch1', title: 'Pumpkin Empanadas', time: '40min', calories: '192kcal', image: require('../assets/lunch-1.jpg'), filters: ['2', '3'] },
      { id: 'lunch2', title: 'Onigiri with Salmon Filling', time: '40min', calories: '362kcal', image: require('../assets/lunch-2.jpg'), filters: ['2', '3'] },
      { id: 'lunch3', title: 'Fish Stew with Fennel and Saffron', time: '30min', calories: '468kcal', image: require('../assets/lunch-3.jpg'), filters: ['1', '2', '3'] },
    ],
    Dinner: [
      { id: 'dinner1', title: 'Shrimp Taco in Salad Leaves with Guacamole', time: '20min', calories: '498kcal', image: require('../assets/dinner-1.jpg'), filters: ['1', '2'] },
      { id: 'dinner2', title: 'Creamy Lemon Zucchini Pasta', time: '35min', calories: '502kcal', image: require('../assets/dinner-2.jpg'), filters: ['2'] },
      { id: 'dinner3', title: 'Crispy Tofu with Maple-Soy Glaze', time: '30min', calories: '362kcal', image: require('../assets/dinner-3.webp'), filters: ['1', '2', '3', '4'] },
    ],
  };

  const filterRecipes = (filterId) => {
    if (filterId) {
      const filtered = {};
      Object.keys(allRecipes).forEach((section) => {
        filtered[section] = allRecipes[section].filter(recipe => recipe.filters.includes(filterId));
      });
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(allRecipes);
    }
  };

  const handleFilterSelect = (filterId) => {
    const newFilter = selectedFilter === filterId ? null : filterId;
    setSelectedFilter(newFilter);
    filterRecipes(newFilter);
  };

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>
  }

  const renderFilterItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterItem,
        selectedFilter === item.id && styles.filterItemSelected,
      ]}
      onPress={() => handleFilterSelect(item.id)}
    >
      <Text style={[styles.filterText, selectedFilter === item.id && styles.filterTextSelected]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderTrendingItem = ({ item }) => {
    const dynamicStyle = item.id === 'trend1' ? styles.trend1 : styles.trend2;

    return (
      <TouchableOpacity style={[styles.trendingItem]}>
        {item.id === 'trend1' ? 
        (<Text style={styles.trendingTitle}>Trending</Text>) : 
        (<View style={styles.trendingTitlePlaceholder} />)
        }
        <ImageBackground source={item.image} style={styles.trendingImage} imageStyle={styles.trendingImage}>
          <Text style={[styles.trendingText, dynamicStyle]}>{item.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity style={styles.recipeItem}>
      <Image source={ item.image } style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <View style={styles.recipeFooter}>
        <Text style={styles.recipeDetails}>{item.time} · {item.calories}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSection = (sectionTitle, data) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderRecipeItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={filters}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderFilterItem}
        showsHorizontalScrollIndicator={false}
        style={styles.filterList}
      />

      <View style={styles.searchAndFilterContainer}>
        <View style={styles.searchContainer}>
          <Image source={require('../assets/search-icon.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Find recipes"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {!selectedFilter && (
        <FlatList
          data={trendingData}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={renderTrendingItem}
          showsHorizontalScrollIndicator={false}
          style={styles.trendingList}
        />
      )}

      {Object.keys(filteredRecipes).map((section) => (
        <View key={section}>
          {renderSection(section, filteredRecipes[section])}
        </View>
      ))}
    </ScrollView>
  );
};

export default Recipe;