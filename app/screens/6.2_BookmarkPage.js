import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BottomNavigation from '../components/BottomNavigation';
import styles from '../styles/6.2_BookmarkStyles';
import { useFonts } from 'expo-font';

const BookmarkScreen = ({ navigation }) => {
  const images = [
    { source: require('../assets/baked-carrot-cake-oatmeal-with-cardamom.jpg'), name: 'Baked Carrot Cake Oatmeal with Cardamom', category: 'Breakfast', id: 'breakfast1' },
    { source: require('../assets/caramel-overnight.jpg'), name: 'Salted Caramel Overnight Oats', category: 'Breakfast', id: 'breakfast2' },
    { source: require('../assets/buckwheat-pancakes-with-berries.jpeg'), name: 'Buckwheat Pancakes with Berries', category: 'Breakfast', id: 'breakfast3' },
    { source: require('../assets/pumpkin-empanadas.jpg'), name: 'Pumpkin Empanadas', category: 'Lunch', id: 'lunch1' },
    { source: require('../assets/onigiri-with-salmon-filling.jpg'), name: 'Onigiri with Salmon Filling', category: 'Lunch', id: 'lunch2' },
    { source: require('../assets/fish-stew-with-fennel-and-saffron.jpg'), name: 'Fish Stew with Fennel and Saffron', category: 'Lunch', id: 'lunch3' },
    { source: require('../assets/shrimp-taco-in-salad-leaves-with-guacamole.jpg'), name: 'Shrimp Taco in Salad Leaves with Guacamole', category: 'Dinner', id: 'dinner1' },
    { source: require('../assets/creamy-lemon-zucchini-pasta.jpg'), name: 'Creamy Lemon Zucchini Pasta', category: 'Dinner', id: 'dinner2' },
    { source: require('../assets/crispy-tofu-with-maple-soy-glaze.webp'), name: 'Crispy Tofu with Maple-Soy Glaze', category: 'Dinner', id: 'dinner3' },
  ];

  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Regular': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-Medium': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-Bold': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Bold.ttf'),
  });

  const [searchText, setSearchText] = useState('');
  const tabs = ['Breakfast', 'Lunch', 'Dinner'];
  const [selectedTab, setSelectedTab] = useState(null);
  const [filteredBookmarks, setFilteredBookmarks] = useState(images);

  useEffect(() => {
    let results = images;
    if (selectedTab) {
      results = results.filter(item => item.category === selectedTab);
    }
    if (searchText) {
      results = results.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setFilteredBookmarks(results);
  }, [searchText, selectedTab]);

  const handleTabChange = (tab) => {
    setSelectedTab(prevTab => (prevTab === tab ? null : tab));
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.containersafe}>
      <View style={styles.container}>
        <View style={styles.searchAndFilterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterList}>
            {tabs.map((tab, index) => (
              <TouchableOpacity key={index} onPress={() => handleTabChange(tab)}>
                <View style={[styles.filterItem, selectedTab === tab && styles.filterItemSelected]}>
                  <Text style={[styles.filterText, selectedTab === tab && styles.filterTextSelected]}>{tab}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.searchContainer}>
            <Image source={require('../assets/search-icon.png')} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#777"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

        </View>
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Bookmarked Recipe</Text>
          <View style={styles.recipeContainer}>
            {filteredBookmarks.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.recipeItem} 
                onPress={() => navigation.navigate('RecipeCard', { recipe: item })}>
                <Image source={item.source} style={styles.recipeImage} />
                <View style={styles.recipeTextContainer}>
                  <View style ={styles.containername}>
                    <Text style={styles.recipeTitle}>{item.name}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <FontAwesome5 name="clock" size={14} color="#777" />
                    <Text style={styles.recipeDetails}>40 min</Text>
                    <Text style={styles.separator}> | </Text>
                    <FontAwesome5 name="fire" size={14} color="#777" />
                    <Text style={styles.recipeDetails}>192 kcal</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.infoBox} onPress={() => navigation.navigate('Recipe')}>
            <Text style={styles.infoText}>
              Find More Recipes? <Text>+</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <BottomNavigation navigation={navigation} />
    </SafeAreaView>
  );
};

export default BookmarkScreen;
