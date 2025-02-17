import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ScannerPage from './ScannerPage';
import ResultPage from './ResultPage';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'PlusJakartaSans-Regular': require('./assets/PlusJakartaSans-Regular.ttf'),
      'PlusJakartaSans-Bold': require('./assets/PlusJakartaSans-Bold.ttf'),
      'PlusJakartaSans-Medium': require('./assets/PlusJakartaSans-Medium.ttf'),
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
      <Stack.Navigator >
        <Stack.Screen name="Scanner" component={ScannerPage} options={{headerShown: false}}/>
        <Stack.Screen name="Result" component={ResultPage} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}