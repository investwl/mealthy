import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import RecipeForm from '../components/RecipeForm';


export default function AddRecipeScreen({ navigation, route }) {
    const { setRecipe } = route.params;




    const handlePostRecipe = (recipeData) => {
        setRecipe(recipeData)
        navigation.goBack();
    };


    const handleRemoveRecipe = () => {
        navigation.goBack();
    };


    return (
        <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.scrollContentContainer}  showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <RecipeForm onPost={handlePostRecipe} onRemove={handleRemoveRecipe} />
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
      },
   scrollContentContainer: {
        paddingBottom: 20,
  },
  container: {
        flex: 1,
        padding: 10,
        marginBottom: 10,
    },
});
