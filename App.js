import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './app/config/UserContext';
import MealPlannerScreen from './app/screens/6.3_MealPlannerPage';
import MyProfileScreen from './app/screens/6_MyProfilePage';
import EditProfileScreen from './app/screens/6.1_EditProfilePage';
import BookmarkScreen from './app/screens/6.2_BookmarkPage';
import CaloriePage from './app/screens/4_CaloriePage';
import LoginPage from './app/screens/1_LoginPage';
import Recipe from './app/screens/3_RecipePage';
import LoadingPage from './app/screens/0_LoadingPage';
import RegisterPage from './app/screens/2_RegisterPage';
import RecipeCard from './app/config/RecipeCard';
import MakePlannerPage from './app/screens/3.1_MakePlannerPage';
import CommunityPage from './app/screens/7_CommunityPage';
import Scanner from './app/screens/8_Scanner';

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Menampilkan LoadingPage pertama kali */}
          <Stack.Screen name="Loading" component={LoadingPage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Recipe" component={Recipe} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />

          {/* Other Pages, user_id will be passed inside each components*/}
          <Stack.Screen name="MealPlanner" component={MealPlannerScreen}  options={({ route }) => ({ initialParams: { user_id: route.params?.user_id } })} />
          <Stack.Screen name="MyProfile" component={MyProfileScreen} options={({ route }) => ({ initialParams: { user_id: route.params?.user_id } })} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={({ route }) => ({ initialParams: { user_id: route.params?.user_id } })}/>
          <Stack.Screen name="Bookmark" component={BookmarkScreen} options={({ route }) => ({ initialParams: { user_id: route.params?.user_id } })}/>
          <Stack.Screen name="Calorie" component={CaloriePage} options={({ route }) => ({ initialParams: { user_id: route.params?.user_id } })}/>
          <Stack.Screen name="RecipeCard" component={RecipeCard} />
          <Stack.Screen name="MakePlanner" component={MakePlannerPage} options={({ route }) => ({ initialParams: { user_id: route.params?.user_id } })}/>
          <Stack.Screen name="Community" component={CommunityPage} />
          <Stack.Screen name="Scanner" component={Scanner} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;