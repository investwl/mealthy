import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, ImageBackground, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import styles from '../styles/3_RecipeStyles';
import { FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavigation from '../components/BottomNavigation';

const RecipePage = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Regular': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-Medium': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-Bold': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Bold.ttf'),
  });

  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedTrendingFilter, setSelectedTrendingFilter] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState({});
  const [isTrendingSelected, setIsTrendingSelected] = useState(false);

  const [allRecipes, setAllRecipes] = useState({
    Breakfast: [
      { 
        id: 'breakfast1', 
        title: 'Baked Carrot Cake Oatmeal with Cardamom', 
        time: '15 min', 
        calories: '292 kcal', 
        image: require('../assets/baked-carrot-cake-oatmeal-with-cardamom.jpg'), 
        filters: ['1', '4'],
        author: "By Sean Anasta",
        ingredients: ["2 cups rolled oats", "1 teaspoon baking powder", "1/2 teaspoon ground cardamom", "1/4 teaspoon salt", "1.5 cups unsweetened almond milk", "1/4 cup maple syrup", "1/4 cup unsweetened applesauce", "1 teaspoon vanilla extract", "1 cup grated carrots", "1/4 cup chopped walnuts", "1/4 cup raisins"],
        carbs: 45,
        fat: 15, 
        protein: 18,
        instruction: "1. Preheat the oven to 375°F (190°C). \n2.Grease a 9-inch (23 cm) square baking dish. \n3.In a large bowl, combine the oats, baking powder, cardamom, and salt. \n4. In a medium bowl, whisk together the almond milk, maple syrup, applesauce, and vanilla. \n5. Add the wet ingredients to the dry ingredients and stir to combine. \n6. Fold in the carrots, walnuts, and raisins. \n7. Pour the mixture into the prepared baking dish. \n8. Bake for 30 minutes, or until the top is golden brown and the oatmeal is set. \n9. Serve warm.",
        link: "baked-carrot-cake-oatmeal-with-cardamom", // ini cuma placeholder aja
      },
      { 
        id: 'breakfast2', 
        title: 'Salted Caramel Overnight Oats', 
        time: '30 min', 
        calories: '495 kcal', 
        image: require('../assets/caramel-overnight.jpg'), 
        filters: ['1'],
        author: "By Augustine Ferald",
        ingredients: ["1/3 cup rolled oats", "1/4 cup unsweetened almond milk", "2 Tbsp caramel flavored almond creamer", "1 Tbsp chia seeds", "1/2 banana mashed", "1/2 tsp cinnamon", "cacao nibs", "chopped cashews", "banana slices", "caramel sauce", "1 cup full fat coconut milk", "1/3 cup coconut sugar", "1/2 tsp sea salt", "1/2 tsp vanilla extract, optional"],
        carbs: 60,
        fat: 20,
        protein: 15,
        instruction: "1. In a medium bowl, combine the oats, almond milk, almond creamer, chia seeds, mashed banana, and cinnamon. \n2. Stir well to combine. \n3. Cover and refrigerate overnight. \n4. In the morning, make the caramel sauce. \n5. In a small saucepan, combine the coconut milk, coconut sugar, and sea salt. \n6. Bring to a simmer over medium heat, stirring occasionally. \n7. Simmer for 30 minutes, or until the sauce has thickened. \n8. Remove from heat and stir in the vanilla extract, if using. \n9. To serve, layer the oats with the caramel sauce, cacao nibs, cashews, and banana slices.",
        link: "salted-caramel-overnight-oats", // ini cuma placeholder aja
      },
      { 
        id: 'breakfast3', 
        title: 'Buckwheat Pancakes with berries', 
        time: '15 min', 
        calories: '314 kcal', 
        image: require('../assets/buckwheat-pancakes-with-berries.jpeg'), 
        filters: ['1'],
        author: "By Aille Nevi",
        ingredients: ["1 cup buckwheat flour", "1/2 cup almond flour", "1/2 tsp baking powder", "1/4 tsp salt", "1 cup almond milk", "1 Tbsp maple syrup", "1 Tbsp apple cider vinegar", "1 tsp vanilla extract", "1 cup mixed berries", "1/4 cup chopped nuts", "1/4 cup maple syrup"],
        carbs: 45,
        fat: 15,
        protein: 18,
        instruction: "1. In a large bowl, combine the buckwheat flour, almond flour, baking powder, and salt. \n2. In a medium bowl, whisk together the almond milk, maple syrup, apple cider vinegar, and vanilla. \n3. Add the wet ingredients to the dry ingredients and stir to combine. \n4. Heat a non-stick skillet over medium heat. \n5. Pour 1/4 cup of batter onto the skillet and cook until bubbles form on the surface. \n6. Flip and cook for an additional 2-3 minutes. \n7. Repeat with the remaining batter. \n8. Serve the pancakes topped with mixed berries, chopped nuts, and maple syrup.",
        link: "buckwheat-pancakes-with-berries", // ini cuma placeholder aja
      },
    ],
    Lunch: [
      { 
        id: 'lunch1', 
        title: 'Pumpkin Empanadas', 
        time: '40 min', 
        calories: '192 kcal', 
        image: require('../assets/pumpkin-empanadas.jpg'), 
        filters: ['2', '3'],
        author: "By Ngac Thuong",
        ingredients: ["1 cup pumpkin puree", "1/4 cup coconut sugar", "1 tsp cinnamon", "1/2 tsp nutmeg", "1/4 tsp salt", "1 package vegan puff pastry", "1/4 cup almond milk", "1/4 cup powdered sugar", "1/2 tsp vanilla extract"],
        carbs: 30,
        fat: 10,
        protein: 5,
        instruction: "1. Preheat the oven to 350°F (180°C). \n2. In a medium bowl, combine the pumpkin puree, coconut sugar, cinnamon, nutmeg, and salt. \n3. Roll out the puff pastry and cut into 4-inch squares. \n4. Place a spoonful of the pumpkin mixture in the center of each square. \n5. Fold the pastry over the filling and crimp the edges with a fork to seal. \n6. Brush the tops of the empanadas with almond milk. \n7. Bake for 20-25 minutes, or until golden brown. \n8. In a small bowl, whisk together the powdered sugar and vanilla extract. \n9. Drizzle over the warm empanadas before serving.",
        link: "pumpkin-empanadas", // ini cuma placeholder aja
      },
      { 
        id: 'lunch2', 
        title: 'Onigiri with Salmon Filling', 
        time: '40 min', 
        calories: '362 kcal', 
        image: require('../assets/onigiri-with-salmon-filling.jpg'), 
        filters: ['2', '3'], 
        author: "By Satoshi Nakamoto",
        ingredients: ["2 cups sushi rice", "2 1/2 cups water", "1/4 cup rice vinegar", "2 Tbsp sugar", "1 tsp salt", "8 oz salmon fillet", "1 Tbsp soy sauce", "1 Tbsp mirin", "1 Tbsp sake", "1 Tbsp sugar", "1/4 cup chopped scallions", "1/4 cup toasted sesame seeds", "1/4 cup nori strips"],
        carbs: 70,
        fat: 20,
        protein: 30,
        instruction: "1. Rinse the rice until the water runs clear. \n2. Combine the rice and water in a rice cooker and cook according to the manufacturer's instructions. \n3. In a small saucepan, combine the rice vinegar, sugar, and salt. \n4. Heat over low heat until the sugar and salt are dissolved. \n5. Transfer the cooked rice to a large bowl and fold in the vinegar mixture. \n6. Cover with a damp cloth and let cool. \n7. In a medium bowl, combine the soy sauce, mirin, sake, and sugar. \n8. Add the salmon and marinate for 30 minutes. \n9. Heat a skillet over medium heat. \n10. Add the salmon and cook for 3-4 minutes per side, or until cooked through. \n11. Remove from heat and flake the salmon. \n12. To assemble the onigiri, wet your hands and shape a small amount of rice into a triangle. \n13. Place a spoonful of salmon in the center and top with scallions, sesame seeds, and nori strips.",
        link: "onigiri-with-salmon-filling", // ini cuma placeholder aja
      },
      { 
        id: 'lunch3', 
        title: 'Fish Stew with Fennel and Saffron', 
        time: '30 min', 
        calories: '468 kcal', 
        image: require('../assets/fish-stew-with-fennel-and-saffron.jpg'), 
        filters: ['1', '2', '3'],
        author: "By Grach Sais",
        ingredients: ["1 lb white fish fillets", "1 Tbsp olive oil", "1 onion, chopped", "1 fennel bulb, sliced", "2 cloves garlic, minced", "1/2 tsp saffron threads", "1/4 cup white wine", "1 14 oz can diced tomatoes", "2 cups fish stock", "1/4 cup chopped parsley", "1/4 cup chopped cilantro", "1/4 cup chopped chives", "1/4 cup chopped dill", "1/4 cup chopped tarragon", "1/4 cup chopped basil", "1/4 cup chopped mint", "1/4 cup chopped chervil"],
        carbs: 30,
        fat: 20,
        protein: 30,
        instruction: "1. In a large pot, heat the olive oil over medium heat. \n2. Add the onion and fennel and cook for 5 minutes, or until softened. \n3. Add the garlic and saffron and cook for 1 minute. \n4. Add the white wine and cook for 2 minutes, or until reduced by half. \n5. Add the diced tomatoes and fish stock and bring to a simmer. \n6. Add the fish fillets and cook for 5 minutes, or until cooked through. \n7. Remove from heat and stir in the parsley, cilantro, chives, dill, tarragon, basil, mint, and chervil. \n8. Serve hot.",          
        link: "fish-stew-with-fennel-and-saffron", // ini cuma placeholder aja
      },
    ],
    Dinner: [
      { 
        id: 'dinner1', 
        title: 'Shrimp Taco in Salad Leaves with Guacamole', 
        time: '15 min', 
        calories: '498 kcal', 
        image: require('../assets/shrimp-taco-in-salad-leaves-with-guacamole.jpg'), 
        filters: ['1', '4'],
        author: "By Groodle",
        ingredients: ["2 lb shrimp, peeled and deveined", "1 Tbsp olive oil", "1 Tbsp chili powder", "1 tsp cumin", "1/2 tsp garlic powder", "1/2 tsp onion powder", "1/2 tsp smoked paprika", "1/4 tsp salt", "1/4 tsp black pepper", "1/4 tsp cayenne pepper", "1/4 cup chopped cilantro", "1/4 cup chopped red onion", "1/4 cup chopped tomato", "1/4 cup chopped avocado", "1/4 cup chopped lettuce", "1/4 cup chopped jalapeño", "1/4 cup chopped radish", "1/4 cup chopped red cabbage", "1/4 cup chopped cucumber", "1/4 cup chopped bell pepper", "1/4 cup chopped carrot", "1/4 cup chopped celery", "1/4 cup chopped zucchini", "1/4 cup chopped yellow squash", "1/4 cup chopped mushroom", "1/4 cup chopped spinach", "1/4 cup chopped kale", "1/4 cup chopped chard", "1/4 cup chopped arugula", "1/4 cup chopped watercress", "1/4 cup chopped beet greens", "1/4 cup chopped mustard greens", "1/4 cup chopped collard greens", "1/4 cup chopped turnip greens", "1/4 cup chopped dandelion greens", "1/4 cup chopped chicory", "1/4 cup chopped" ],
        carbs: 45,
        fat: 25,
        protein: 40,
        instruction: "1. In a large bowl, combine the shrimp, olive oil, chili powder, cumin, garlic powder, onion powder, smoked paprika, salt, black pepper, and cayenne pepper. \n2. Toss to coat the shrimp. \n3. Heat a large skillet over medium-high heat. \n4. Add the shrimp and cook for 2-3 minutes per side, or until pink and cooked through. \n5. Remove from heat. \n6. To assemble the tacos, place a spoonful of guacamole in the center of each lettuce leaf. \n7. Top with shrimp, cilantro, red onion, tomato, avocado, and any other desired toppings. \n8. Serve immediately.",
        link: "shrimp-taco-in-salad-leaves-with-guacamole", // ini cuma placeholder aja
      },
      { 
        id: 'dinner2', 
        title: 'Creamy Lemon Zucchini Pasta', 
        time: '35 min', 
        calories: '502 kcal', 
        image: require('../assets/creamy-lemon-zucchini-pasta.jpg'), 
        filters: ['1', '2'],
        author: "By Zhasky Reid",
        ingredients: ["8 oz pasta", "2 Tbsp olive oil", "2 cloves garlic, minced", "2 zucchinis, spiralized", "1/2 cup vegetable broth", "1/4 cup lemon juice", "1/4 cup nutritional yeast", "1/4 cup chopped parsley", "1/4 cup chopped basil", "1/4 cup chopped chives", "1/4 cup chopped dill", "1/4 cup chopped tarragon", "1/4 cup chopped mint", "1/4 cup chopped chervil", "1/4 cup chopped cilantro", "1/4 cup chopped arugula", "1/4 cup chopped watercress", "1/4 cup chopped beet greens", "1/4 cup chopped mustard greens", "1/4 cup chopped collard greens", "1/4 cup chopped turnip greens", "1/4 cup chopped dandelion greens", "1/4 cup chopped chicory", "1/4 cup chopped spinach", "1/4 cup chopped kale", "1/4 cup chopped chard", "1/4 cup chopped bell pepper", "1/4 cup chopped carrot", "1/4 cup chopped celery", "1/4 cup chopped zucchini", "1/4 cup chopped yellow squash", "1/4 cup chopped mushroom", "1/4 cup chopped red cabbage", "1/4 cup chopped radish", "1/4 cup chopped jalapeño", "1/4 cup chopped lettuce"],
        carbs: 55,
        fat: 25,
        protein: 40,
        instruction: "1. Cook the pasta according to the package instructions. \n2. Drain and set aside. \n3. In a large skillet, heat the olive oil over medium heat. \n4. Add the garlic and cook for 1 minute. \n5. Add the zucchini and cook for 3-4 minutes, or until softened. \n6. Add the vegetable broth, lemon juice, and nutritional yeast. \n7. Stir to combine. \n8. Add the cooked pasta and toss to coat. \n9. Remove from heat and stir in the parsley, basil, chives, dill, tarragon, mint, chervil, cilantro, arugula, watercress, beet greens, mustard greens, collard greens, turnip greens, dandelion greens, chicory, spinach, kale, chard, bell pepper, carrot, celery, zucchini, yellow squash, mushroom, red cabbage, radish, jalapeño, and lettuce. \n10. Serve hot.",
        link: "creamy-lemon-zucchini-pasta", // ini cuma placeholder aja
      },
      { 
        id: 'dinner3', 
        title: 'Crispy Tofu with Maple-Soy Glaze', 
        time: '30 min', 
        calories: '362 kcal', 
        image: require('../assets/crispy-tofu-with-maple-soy-glaze.webp'), 
        filters: ['1', '4'],
        author: "By Cai Yuze",
        ingredients: ["1 block extra-firm tofu", "2 Tbsp soy sauce", "2 Tbsp maple syrup", "1 Tbsp rice vinegar", "1 Tbsp sesame oil", "1/2 tsp garlic powder", "1/2 tsp onion powder", "1/4 tsp salt", "1/4 tsp black pepper", "1/4 cup chopped scallions", "1/4 cup chopped cilantro", "1/4 cup chopped sesame seeds", "100 gram of rice"],
        carbs: 25,
        fat: 10,
        protein: 30,
        instruction: "1. Preheat the oven to 400°F (200°C). \n2. Drain the tofu and press out the excess water. \n3. Cut the tofu into cubes. \n4. In a small bowl, whisk together the soy sauce, maple syrup, rice vinegar, sesame oil, garlic powder, onion powder, salt, and black pepper. \n5. Toss the tofu in the marinade and let sit for 10 minutes. \n6. Place the tofu on a baking sheet lined with parchment paper. \n7. Bake for 20-25 minutes, or until crispy. \n8. Remove from the oven and let cool. \n9. In a small bowl, whisk together the soy sauce, maple syrup, rice vinegar, sesame oil, garlic powder, onion powder, salt, and black pepper. \n10. Put rice on the plate. \n11. Toss the tofu in the glaze.",
        link: "crispy-tofu-with-maple-soy-glaze", // ini cuma placeholder aja
      },
    ],
  });

  useEffect(() => {
    setFilteredRecipes(allRecipes);
  }, [allRecipes]);

  const filters = [
    { id: '1', name: 'Mealthy Top Picks' },
    { id: '2', name: 'Lactose Intolerant' },
    { id: '3', name: 'Gluten Free' },
    { id: '4', name: 'Vegetarian' },
  ];

  const trendingData = [
    { id: 'trend1', title: 'Plant-based Food', filter: 'plant-based', image: require('../assets/trending-page1.jpg') },
    { id: 'trend2', title: '15-minute Meals', filter: '15-minute', image: require('../assets/trending-page2.webp') },
  ];

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

  const isPlantBased = (recipe) => {
    const meatKeywords = ["chicken", "beef", "pork", "salmon", "fish", "shrimp", "lamb", "turkey", "duck"];
    return !recipe.ingredients.some(ingredient =>
      meatKeywords.some(keyword => ingredient.toLowerCase().includes(keyword))
    );
  };
  
  const is15MinuteMeal = (recipe) => {
    const match = recipe.time.match(/(\d+)/);
    if (match) {
      return parseInt(match[0], 10) <= 15;
    }
    return false;
  };

  const handleTrendingSelect = (filter) => {
    setSelectedTrendingFilter(filter);
    setIsTrendingSelected(true);
    if (filter) {
      const filtered = {};
      Object.keys(allRecipes).forEach((section) => {
        let sectionRecipes = allRecipes[section];
        if (filter === 'plant-based') {
          sectionRecipes = sectionRecipes.filter(recipe => isPlantBased(recipe));
        } else if (filter === '15-minute') {
          sectionRecipes = sectionRecipes.filter(recipe => is15MinuteMeal(recipe));
        }
        filtered[section] = sectionRecipes;
      });
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(allRecipes);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = {};
      Object.keys(allRecipes).forEach((section) => {
        filtered[section] = allRecipes[section].filter(recipe => recipe.title.toLowerCase().includes(text.toLowerCase()));
      });
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(allRecipes);
    }
  };

  const handleBackButton = () => {
    setIsTrendingSelected(false);
    setSelectedTrendingFilter(null);
    setFilteredRecipes(allRecipes);
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
      <TouchableOpacity style={[styles.trendingItem]} onPress={() => handleTrendingSelect(item.filter)}>
        <ImageBackground source={item.image} style={styles.trendingImage} imageStyle={styles.trendingImage}>
          <Text style={[styles.trendingText, dynamicStyle]}>{item.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity style={styles.recipeItem} onPress={() => navigation.navigate('RecipeCard', { recipe: item })}>
      <Image source={item.image} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <View style={styles.recipeFooter}>
        <Text style={styles.recipeDetails}><FontAwesome5 name="clock" size={14} color="#777" />  {item.time}  |  <FontAwesome5 name="fire" size={14} color="#777" />  {item.calories} </Text>
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
    <SafeAreaView style={styles.containersafe}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {!isTrendingSelected && (
            <FlatList
              data={filters}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={renderFilterItem}
              showsHorizontalScrollIndicator={false}
              style={styles.filterList}
            />
          )}

          <View style={styles.searchAndFilterContainer}>
            {isTrendingSelected && (
              <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
                <Icon name="arrow-left" size={30} color="black" />
              </TouchableOpacity>
            )}
            <View style={styles.searchContainer}>
              <Image source={require('../assets/search-icon.png')} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Find recipes"
                value={searchText}
                onChangeText={handleSearch}
              />
            </View>
          </View>

          {!selectedFilter && !isTrendingSelected && (
            <View style = {styles.trendinglist}>
              <Text style={styles.trendingTitle}>Trending</Text>
              <FlatList
                data={trendingData}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={renderTrendingItem}
                showsHorizontalScrollIndicator={false}
                
              />
            </View>
          )}

          {Object.keys(filteredRecipes).map((section) => (
            <View key={section}>
              {renderSection(section, filteredRecipes[section])}
            </View>
          ))}
        </ScrollView>

      </View>
      <BottomNavigation navigation={navigation} />
    </SafeAreaView>
  );
};

export default RecipePage;
