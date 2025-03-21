import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; // Remove useRoute

const BottomNavigation = ({ activeRouteName }) => { // Receive prop
  const navigation = useNavigation();

  const menuItems = [
    { name: 'Recipes', icon: 'chef-hat', screen: 'Recipe' },
    { name: 'Counter', icon: 'fire', screen: 'Calorie' },
    { name: 'Scanner', icon: 'crop-free', screen: 'Scanner' },
    { name: 'Community', icon: 'account-group', screen: 'Community' },
    { name: 'Profile', icon: 'account-circle', screen: 'MyProfile' }
  ];

  return (
    <View style={styles.bottomNav}>
      {menuItems.map((item, index) => {
        const isActive = activeRouteName === item.screen; // Compare with prop

        return (
          <TouchableOpacity
            key={index}
            style={[styles.navItem, isActive && styles.activeNavItem]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
              <Icon name={item.icon} size={28} color={isActive ? '#FFFFFF' : '#AAB07F'} />
            </View>
            <Text style={[styles.navText, isActive && styles.activeNavText]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
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
  iconContainer: {
    padding: 5,
    borderRadius: 25, // Makes it circular
    backgroundColor: 'transparent', // Default background
  },
  activeIconContainer: {
    backgroundColor: '#6D7B50', // Highlighted background for active tab
  },
  navText: {
    fontSize: 12,
    color: '#AAB07F',
    marginTop: 4,
  },
  activeNavText: {
    color: '#6D7B50',
    fontWeight: 'bold',
  }
});

export default BottomNavigation;
