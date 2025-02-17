import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import ImageViewerScreen from './screens/ImageViewerScreen';

const Stack = createStackNavigator();

export default function App() {
  const [posts, setPosts] = useState([]);


  const addPost = (post) => {
      setPosts([post, ...posts]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen
              {...props}
              posts={posts}
              addPost={addPost}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Add Recipe">
          {(props) => (
            <AddRecipeScreen
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Recipe Detail" component={RecipeDetailScreen} />
         <Stack.Screen name="Image Viewer" component={ImageViewerScreen}  options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}