import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MealPlannerScreen from './src/screens/6.3_MealPlannerPage';
import MyProfileScreen from './src/screens/6_MyProfilePage';
import EditProfileScreen from './src/screens/6.1_EditProfilePage';
import BookmarkScreen from './src/screens/6.2_BookmarkPage';
import CaloriePage from './src/screens/4_CaloriePage';
import LoginPage from './src/screens/1_LoginPage';
import Recipe from './src/screens/3_RecipePage';
import LoadingPage from './src/screens/0_LoadingPage';
import RegisterPage from './src/screens/2_RegisterPage';
import RecipeCard from './src/config/RecipeCard';
import MakePlannerPage from './src/screens/3.1_MakePlannerPage';
import CommunityPage from './src/screens/7_CommunityPage';
import Scanner from './src/screens/8_Scanner';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Menampilkan LoadingPage pertama kali */}
        <Stack.Screen name="Loading" component={LoadingPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="MealPlanner" component={MealPlannerScreen} />
        <Stack.Screen name="MyProfile" component={MyProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Bookmark" component={BookmarkScreen} />
        <Stack.Screen name="Calorie" component={CaloriePage} />
        <Stack.Screen name="Recipe" component={Recipe} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="RecipeCard" component={RecipeCard} />
        <Stack.Screen name="MakePlanner" component={MakePlannerPage} />
        <Stack.Screen name="Community" component={CommunityPage} />
        <Stack.Screen name="Scanner" component={Scanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
