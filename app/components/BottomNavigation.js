  import React from 'react';
  import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

  const BottomNavigation = ({ navigation }) => {
    const menuItems = [
      { name: 'Recipes', icon: 'chef-hat', screen: 'Recipe' },
      { name: 'Counter', icon: 'fire', screen: 'Calorie' },  
      { name: 'Scanner', icon: 'crop-free', screen: 'Scanner' },
      { name: 'Community', icon: 'account-group', screen: 'Community' },
      { name: 'Profile', icon: 'account-circle', screen: 'MyProfile' }
    ];    

    return (
      <View style={styles.bottomNav}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Icon name={item.icon} size={24} color="#AAB07F" />
            <Text style={styles.navText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const styles = StyleSheet.create({
    bottomNav: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#FFFFFF',
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
    },
    navItem: {
      alignItems: 'center',
    },
    navText: {
      fontSize: 12,
      color: '#AAB07F',
    }
  });

  export default BottomNavigation;
