// App.js
import React, { useState, useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import ImageViewerScreen from './screens/ImageViewerScreen';

import BottomNavigation from './components/BottomNavigation';
import Header from './components/Header'; // Import Header

const Stack = createStackNavigator();

const App = () => {
  const [activeRouteName, setActiveRouteName] = useState('Home');
  const navigationRef = useRef(null);

  useEffect(() => {
    const unsubscribe = navigationRef.current?.addListener('state', () => {
      const currentRouteName = navigationRef.current.getCurrentRoute().name;
      setActiveRouteName(currentRouteName);
    });

    return unsubscribe;
  }, [navigationRef]);

  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView style={styles.containersafe}>
        <View style={styles.container}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: true, // Show the header
              header: (props) => <Header {...props} /> // Use custom header for all screens
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Home",
              }}
            />
            <Stack.Screen
              name="Add Recipe"
              component={AddRecipeScreen}
              options={{
                title: "Add Recipe",
              }}
            />
            <Stack.Screen
              name="Recipe Detail"
              component={RecipeDetailScreen}
              options={{
                title: "Recipe Detail",
              }}
            />
            <Stack.Screen
              name="Image Viewer"
              component={ImageViewerScreen}
              options={{
                title: "Image Viewer",
              }}
            />
          </Stack.Navigator>
        </View>
        <BottomNavigation activeRouteName={activeRouteName} />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  containersafe: {
    flex: 1,
    height: '100%',
  },
  container: {
    flex: 1,
  },
});

export default App;