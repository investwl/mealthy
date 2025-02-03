import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../config/recipe-styles';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const Recipe = () => {
  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Regular': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-Medium': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-Bold': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Bold.ttf'),
  });

  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState({});

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
      { 
        id: 'breakfast1', 
        title: 'Baked Carrot Cake Oatmeal with Cardamom', 
        time: '20min', 
        calories: '292kcal', 
        image: require('../assets/baked-carrot-cake-oatmeal-with-cardamom.jpg'), 
        filters: ['1', '4'],
        author: "By Sean Anasta",
        ingredients: ["2 cups rolled oats", "1 teaspoon baking powder", "1/2 teaspoon ground cardamom", "1/4 teaspoon salt", "1 1/2 cups unsweetened almond milk", "1/4 cup maple syrup", "1/4 cup unsweetened applesauce", "1 teaspoon vanilla extract", "1 cup grated carrots", "1/4 cup chopped walnuts", "1/4 cup raisins"],
        carbs: 45,
        fat: 15, 
        protein: 18,
        instruction: "Preheat the oven to 375°F (190°C). Grease a 9-inch (23 cm) square baking dish. In a large bowl, combine the oats, baking powder, cardamom, and salt. In a medium bowl, whisk together the almond milk, maple syrup, applesauce, and vanilla. Add the wet ingredients to the dry ingredients and stir to combine. Fold in the carrots, walnuts, and raisins. Pour the mixture into the prepared baking dish. Bake for 30 minutes, or until the top is golden brown and the oatmeal is set. Serve warm.",
      },
      { 
        id: 'breakfast2', 
        title: 'Salted Caramel Overnight Oats', 
        time: '30min', 
        calories: '495kcal', 
        image: require('../assets/caramel-overnight.jpg'), 
        filters: ['1'],
        author: "By Augustine Ferald",
        ingredients: ["1/3 cup rolled oats", "1/4 cup unsweetened almond milk", "2 Tbsp caramel flavored almond creamer", "1 Tbsp chia seeds", "1/2 banana mashed", "1/2 tsp cinnamon", "cacao nibs", "chopped cashews", "banana slices", "caramel sauce", "1 cup full fat coconut milk", "1/3 cup coconut sugar", "1/2 tsp sea salt", "1/2 tsp vanilla extract, optional"],
        carbs: 60,
        fat: 20,
        protein: 15,
        instruction: "In a medium bowl, combine the oats, almond milk, almond creamer, chia seeds, mashed banana, and cinnamon. Stir well to combine. Cover and refrigerate overnight. In the morning, make the caramel sauce. In a small saucepan, combine the coconut milk, coconut sugar, and sea salt. Bring to a simmer over medium heat, stirring occasionally. Simmer for 30 minutes, or until the sauce has thickened. Remove from heat and stir in the vanilla extract, if using. To serve, layer the oats with the caramel sauce, cacao nibs, cashews, and banana slices.",
      },
      { 
        id: 'breakfast3', 
        title: 'Buckwheat Pancakes with berries', 
        time: '20min', 
        calories: '314kcal', 
        image: require('../assets/buckwheat-pancakes-with-berries.jpeg'), 
        filters: ['1'],
        author: "By Aille Nevi",
        ingredients: ["1 cup buckwheat flour", "1/2 cup almond flour", "1/2 tsp baking powder", "1/4 tsp salt", "1 cup almond milk", "1 Tbsp maple syrup", "1 Tbsp apple cider vinegar", "1 tsp vanilla extract", "1 cup mixed berries", "1/4 cup chopped nuts", "1/4 cup maple syrup"],
        carbs: 45,
        fat: 15,
        protein: 18,
        instruction: "In a large bowl, combine the buckwheat flour, almond flour, baking powder, and salt. In a medium bowl, whisk together the almond milk, maple syrup, apple cider vinegar, and vanilla. Add the wet ingredients to the dry ingredients and stir to combine. Heat a non-stick skillet over medium heat. Pour 1/4 cup of batter onto the skillet and cook until bubbles form on the surface. Flip and cook for an additional 2-3 minutes. Repeat with the remaining batter. Serve the pancakes topped with mixed berries, chopped nuts, and maple syrup.",
      },
    ],
    Lunch: [
      { 
        id: 'lunch1', 
        title: 'Pumpkin Empanadas', 
        time: '40min', 
        calories: '192kcal', 
        image: require('../assets/lunch-1.jpg'), 
        filters: ['2', '3'],
        author: "By Ngac Thuong",
        ingredients: ["1 cup pumpkin puree", "1/4 cup coconut sugar", "1 tsp cinnamon", "1/2 tsp nutmeg", "1/4 tsp salt", "1 package vegan puff pastry", "1/4 cup almond milk", "1/4 cup powdered sugar", "1/2 tsp vanilla extract"],
        carbs: 30,
        fat: 10,
        protein: 5,
        instruction: "Preheat the oven to 350°F (180°C). In a medium bowl, combine the pumpkin puree, coconut sugar, cinnamon, nutmeg, and salt. Roll out the puff pastry and cut into 4-inch squares. Place a spoonful of the pumpkin mixture in the center of each square. Fold the pastry over the filling and crimp the edges with a fork to seal. Brush the tops of the empanadas with almond milk. Bake for 20-25 minutes, or until golden brown. In a small bowl, whisk together the powdered sugar and vanilla extract. Drizzle over the warm empanadas before serving.",
      },
      { 
        id: 'lunch2', 
        title: 'Onigiri with Salmon Filling', 
        time: '40min', 
        calories: '362kcal', 
        image: require('../assets/lunch-2.jpg'), 
        filters: ['2', '3'], 
        author: "By Satoshi Nakamoto",
        ingredients: ["2 cups sushi rice", "2 1/2 cups water", "1/4 cup rice vinegar", "2 Tbsp sugar", "1 tsp salt", "8 oz salmon fillet", "1 Tbsp soy sauce", "1 Tbsp mirin", "1 Tbsp sake", "1 Tbsp sugar", "1/4 cup chopped scallions", "1/4 cup toasted sesame seeds", "1/4 cup nori strips"],
        carbs: 70,
        fat: 20,
        protein: 30,
        instruction: "Rinse the rice until the water runs clear. Combine the rice and water in a rice cooker and cook according to the manufacturer's instructions. In a small saucepan, combine the rice vinegar, sugar, and salt. Heat over low heat until the sugar and salt are dissolved. Transfer the cooked rice to a large bowl and fold in the vinegar mixture. Cover with a damp cloth and let cool. In a medium bowl, combine the soy sauce, mirin, sake, and sugar. Add the salmon and marinate for 30 minutes. Heat a skillet over medium heat. Add the salmon and cook for 3-4 minutes per side, or until cooked through. Remove from heat and flake the salmon. To assemble the onigiri, wet your hands and shape a small amount of rice into a triangle. Place a spoonful of salmon in the center and top with scallions, sesame seeds, and nori strips.",
      },
      { 
        id: 'lunch3', 
        title: 'Fish Stew with Fennel and Saffron', 
        time: '30min', 
        calories: '468kcal', 
        image: require('../assets/lunch-3.jpg'), 
        filters: ['1', '2', '3'],
        author: "By Grach Sais",
        ingredients: ["1 lb white fish fillets", "1 Tbsp olive oil", "1 onion, chopped", "1 fennel bulb, sliced", "2 cloves garlic, minced", "1/2 tsp saffron threads", "1/4 cup white wine", "1 14 oz can diced tomatoes", "2 cups fish stock", "1/4 cup chopped parsley", "1/4 cup chopped cilantro", "1/4 cup chopped chives", "1/4 cup chopped dill", "1/4 cup chopped tarragon", "1/4 cup chopped basil", "1/4 cup chopped mint", "1/4 cup chopped chervil"],
        carbs: 30,
        fat: 20,
        protein: 30,
        instruction: "In a large pot, heat the olive oil over medium heat. Add the onion and fennel and cook for 5 minutes, or until softened. Add the garlic and saffron and cook for 1 minute. Add the white wine and cook for 2 minutes, or until reduced by half. Add the diced tomatoes and fish stock and bring to a simmer. Add the fish fillets and cook for 5 minutes, or until cooked through. Remove from heat and stir in the parsley, cilantro, chives, dill, tarragon, basil, mint, and chervil. Serve hot.",          
       },
    ],
    Dinner: [
      { 
        id: 'dinner1', 
        title: 'Shrimp Taco in Salad Leaves with Guacamole', 
        time: '20min', 
        calories: '498kcal', 
        image: require('../assets/dinner-1.jpg'), 
        filters: ['1', '4'],
        author: "By Groodle",
        ingredients: ["2 lb shrimp, peeled and deveined", "1 Tbsp olive oil", "1 Tbsp chili powder", "1 tsp cumin", "1/2 tsp garlic powder", "1/2 tsp onion powder", "1/2 tsp smoked paprika", "1/4 tsp salt", "1/4 tsp black pepper", "1/4 tsp cayenne pepper", "1/4 cup chopped cilantro", "1/4 cup chopped red onion", "1/4 cup chopped tomato", "1/4 cup chopped avocado", "1/4 cup chopped lettuce", "1/4 cup chopped jalapeño", "1/4 cup chopped radish", "1/4 cup chopped red cabbage", "1/4 cup chopped cucumber", "1/4 cup chopped bell pepper", "1/4 cup chopped carrot", "1/4 cup chopped celery", "1/4 cup chopped zucchini", "1/4 cup chopped yellow squash", "1/4 cup chopped mushroom", "1/4 cup chopped spinach", "1/4 cup chopped kale", "1/4 cup chopped chard", "1/4 cup chopped arugula", "1/4 cup chopped watercress", "1/4 cup chopped beet greens", "1/4 cup chopped mustard greens", "1/4 cup chopped collard greens", "1/4 cup chopped turnip greens", "1/4 cup chopped dandelion greens", "1/4 cup chopped chicory", "1/4 cup chopped" ],
        carbs: 45,
        fat: 25,
        protein: 40,
        instruction: "In a large bowl, combine the shrimp, olive oil, chili powder, cumin, garlic powder, onion powder, smoked paprika, salt, black pepper, and cayenne pepper. Toss to coat the shrimp. Heat a large skillet over medium-high heat. Add the shrimp and cook for 2-3 minutes per side, or until pink and cooked through. Remove from heat. To assemble the tacos, place a spoonful of guacamole in the center of each lettuce leaf. Top with shrimp, cilantro, red onion, tomato, avocado, and any other desired toppings. Serve immediately.",
      },
      { 
        id: 'dinner2', 
        title: 'Creamy Lemon Zucchini Pasta', 
        time: '35min', 
        calories: '502kcal', 
        image: require('../assets/dinner-2.jpg'), 
        filters: ['1', '2'],
        author: "By Zhasky Reid",
        ingredients: ["8 oz pasta", "2 Tbsp olive oil", "2 cloves garlic, minced", "2 zucchinis, spiralized", "1/2 cup vegetable broth", "1/4 cup lemon juice", "1/4 cup nutritional yeast", "1/4 cup chopped parsley", "1/4 cup chopped basil", "1/4 cup chopped chives", "1/4 cup chopped dill", "1/4 cup chopped tarragon", "1/4 cup chopped mint", "1/4 cup chopped chervil", "1/4 cup chopped cilantro", "1/4 cup chopped arugula", "1/4 cup chopped watercress", "1/4 cup chopped beet greens", "1/4 cup chopped mustard greens", "1/4 cup chopped collard greens", "1/4 cup chopped turnip greens", "1/4 cup chopped dandelion greens", "1/4 cup chopped chicory", "1/4 cup chopped spinach", "1/4 cup chopped kale", "1/4 cup chopped chard", "1/4 cup chopped bell pepper", "1/4 cup chopped carrot", "1/4 cup chopped celery", "1/4 cup chopped zucchini", "1/4 cup chopped yellow squash", "1/4 cup chopped mushroom", "1/4 cup chopped red cabbage", "1/4 cup chopped radish", "1/4 cup chopped jalapeño", "1/4 cup chopped lettuce"],
        carbs: 55,
        fat: 25,
        protein: 40,
        instruction: "Cook the pasta according to the package instructions. Drain and set aside. In a large skillet, heat the olive oil over medium heat. Add the garlic and cook for 1 minute. Add the zucchini and cook for 3-4 minutes, or until softened. Add the vegetable broth, lemon juice, and nutritional yeast. Stir to combine. Add the cooked pasta and toss to coat. Remove from heat and stir in the parsley, basil, chives, dill, tarragon, mint, chervil, cilantro, arugula, watercress, beet greens, mustard greens, collard greens, turnip greens, dandelion greens, chicory, spinach, kale, chard, bell pepper, carrot, celery, zucchini, yellow squash, mushroom, red cabbage, radish, jalapeño, and lettuce. Serve hot.",
      },
      { 
        id: 'dinner3', 
        title: 'Crispy Tofu with Maple-Soy Glaze', 
        time: '30min', 
        calories: '362kcal', 
        image: require('../assets/dinner-3.webp'), 
        filters: ['1', '4'],
        author: "By Cai Yuze",
        ingredients: ["1 block extra-firm tofu", "2 Tbsp soy sauce", "2 Tbsp maple syrup", "1 Tbsp rice vinegar", "1 Tbsp sesame oil", "1/2 tsp garlic powder", "1/2 tsp onion powder", "1/4 tsp salt", "1/4 tsp black pepper", "1/4 cup chopped scallions", "1/4 cup chopped cilantro", "1/4 cup chopped sesame seeds", "100 gram of rice"],
        carbs: 25,
        fat: 10,
        protein: 30,
        instruction: "Preheat the oven to 400°F (200°C). Drain the tofu and press out the excess water. Cut the tofu into cubes. In a small bowl, whisk together the soy sauce, maple syrup, rice vinegar, sesame oil, garlic powder, onion powder, salt, and black pepper. Toss the tofu in the marinade and let sit for 10 minutes. Place the tofu on a baking sheet lined with parchment paper. Bake for 20-25 minutes, or until crispy. Remove from the oven and let cool. In a small bowl, whisk together the soy sauce, maple syrup, rice vinegar, sesame oil, garlic powder, onion powder, salt, and black pepper. Put rice on the plate. Toss the tofu in the glaze.",
       },
    ],
  };

  useEffect(() => {
    setFilteredRecipes(allRecipes);
  }, []);

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

  const navigation = useNavigation();

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity style={styles.recipeItem} onPress={() => navigation.navigate('RecipeCard', { recipe: item })}>
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