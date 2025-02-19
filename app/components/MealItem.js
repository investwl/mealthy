import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const MealItem = ({ title, imageUrl, mealName, onPress }) => {
  return (
    <View style={styles.mealContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.mealTitle}>{title} {'>'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mealCard} onPress={onPress}>
        <Image source={imageUrl} style={styles.mealImage} />
        <Text style={styles.mealText}>{mealName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealContainer: {
    marginVertical: 10,
  },
  mealTitle: {
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 5,
  },
  mealCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#000000',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  mealImage: {
    width: '100%',
    height: 130,
  },
  mealText: {
    padding: 10,
    backgroundColor: '#FBEEC1',
    textAlign: 'center',
  },
});

export default MealItem;
