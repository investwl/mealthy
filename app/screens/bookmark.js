import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import styles from '../config/bookmark-styles';

const Bookmark = ({ navigation }) => {
  // images are placeholders
  const images = [
    { source: require('../assets/caramel-overnight.jpg'), name: 'Caramel Overnight', category: 'Your Favorite' },
    { source: require('../assets/caramel-overnight.jpg'), name: 'Caramel Overnight', category: 'Recently Added' },
    { source: require('../assets/caramel-overnight.jpg'), name: 'Caramel Overnight', category: 'Breakfast' },
    { source: require('../assets/caramel-overnight.jpg'), name: 'Caramel Overnight', category: 'Lunch' },
    { source: require('../assets/caramel-overnight.jpg'), name: 'Caramel Overnight', category: 'Dinner' },
    { source: require('../assets/caramel-overnight.jpg'), name: 'Caramel Overnight', category: 'Your Favorite' },
    { source: require('../assets/caramel-overnight.jpg'), name: 'Caramel Overnight', category: 'Recently Added' },
    { source: require('../assets/caramel-overnight.jpg'), name: 'Caramel Overnight', category: 'Breakfast' },
    { source: require('../assets/caramel-overnight.jpg'), name: 'Caramel Overnight', category: 'Lunch' },
  ];
  
  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Regular': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-Medium': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-Bold': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Bold.ttf'),
  });

  // Make sure all hook calls are unconditional.
  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }
  
  // New state for search and filter
  const [searchText, setSearchText] = useState('');
  const tabs = ['Your Favorite', 'Recently Added', 'Breakfast', 'Lunch', 'Dinner'];
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
  
  return (
    <View style={styles.container}>
      {/* Filters placed above the search bar */}
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
          {/* <FontAwesome5 name="search" size={14} color="#777" style={styles.searchIcon} />
           */}
          <Image source={require('../assets/search-icon.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search  Bookmarks"
            placeholderTextColor="#777"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>
      
      {/* Title and bookmarked items */}
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Bookmarked Recipe</Text>
        <View style={styles.recipeContainer}>
          {filteredBookmarks.map((item, index) => (
            <View key={index} style={styles.recipeItem}>
              <Image source={item.source} style={styles.recipeImage} />
              <View style={styles.recipeTextContainer}>
                <Text style={styles.recipeTitle}>{item.name}</Text>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="clock" size={14} color="#777" />
                  <Text style={styles.recipeDetails}>40 min</Text>
                  <Text style={styles.separator}> | </Text>
                  <FontAwesome5 name="fire" size={14} color="#777" />
                  <Text style={styles.recipeDetails}>192 kcal</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.infoBox} onPress={() => navigation.navigate('Recipe')}>
          <Text style={styles.infoText}>
            Find More Recipes? <Text>+</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Bookmark;