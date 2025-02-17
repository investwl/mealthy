import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'PlusJakartaSans-Regular': require('./assets/PlusJakartaSans-Regular.ttf'),
      'PlusJakartaSans-Bold': require('./assets/PlusJakartaSans-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginPage} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterPage} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}