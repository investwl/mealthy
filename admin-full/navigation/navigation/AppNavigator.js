import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AdminPage from '../screens/AdminPage';
import RecipeManagement from '../screens/RecipeManagement';
import AddRecipe from '../screens/AddRecipe';
import NutritionManagement from '../screens/NutritionManagement'; // Make sure this import is here!
import AddNutritionInsight from '../screens/AddNutritionInsight';
import ReportManagement from '../screens/ReportManagement';
import ReportDetails from '../screens/ReportDetails';
import AllergyManagement from '../screens/AllergyManagement';
import EditAllergy from '../screens/EditAllergy';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AdminPage">
        <Stack.Screen name="AdminPage" component={AdminPage} options={{ headerShown: false }} />
        <Stack.Screen name="RecipeManagement" component={RecipeManagement} options={{ headerShown: false }} />
        <Stack.Screen name="AddRecipe" component={AddRecipe} options={{ headerShown: false }} />
        <Stack.Screen name="NutritionManagement" component={NutritionManagement} options={{ headerShown: false }} />
        <Stack.Screen name="AddNutritionInsight" component={AddNutritionInsight} options={{ headerShown: false }} />
        <Stack.Screen name="ReportManagement" component={ReportManagement} options={{ headerShown: false }}/>
        <Stack.Screen name="ReportDetails" component={ReportDetails} options={{ headerShown: false }}/>
        <Stack.Screen name="AllergyManagement" component={AllergyManagement} options={{ headerShown: false }}/>
        <Stack.Screen name="EditAllergy" component={EditAllergy} options={{ headerShown: false }}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
