import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { useFonts } from 'expo-font';
import styles from '../styles/6_MyProfileStyles';
// import { useRoute } from '@react-navigation/native';
import { UserContext } from '../config/UserContext';

const MyProfileScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Regular': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-Medium': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-Bold': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Bold.ttf'),
  });
  const [modalVisible, setModalVisible] = useState(false);
  // const route = useRoute();
  // const { user_id } = route.params;
  const {userId} = useContext(UserContext);

  return (
    <SafeAreaView style={styles.containersafe}>
      <View style={styles.container}>
        <Header navigation={navigation} title="MY PROFILE" />

        <View style={styles.profileSection}>
          {/* Touchable untuk membuka modal */}
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.profileImageContainer}>
            <Image 
              source={require('../assets/breakfast-1.jpeg')} 
              style={styles.profileImage} 
            />
          </TouchableOpacity>
          <Text style={styles.name}>Yehezkiel Michael Sutara</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile', {user_id : userId})}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Modal untuk menampilkan gambar besar */}
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Icon name="close" size={30} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.fullImageContainer}>
              <Image source={require('../assets/breakfast-1.jpeg')} style={styles.fullImage} />
            </View>
          </View>
        </Modal>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          {[{
              title: "My Favorites", 
              icon: "bookmark-outline", 
              action: () => navigation.navigate('Bookmark')
            },
            { 
              title: "My Meal Planners", 
              icon: "calendar",
              action: () => navigation.navigate('MealPlanner')
            },
            { 
              title: "Log Out", 
              icon: "logout", 
              color: "#C0392B",
              action: () => navigation.navigate('Login') 
            }
          ].map((item, index) => (
            <View key={index} style={styles.menuGroup}>
              <TouchableOpacity style={styles.menuItem} onPress={item.action}>
                <View style={styles.menuItemLeft}>
                  <Icon name={item.icon} size={24} color={item.color || "#000"} style={styles.menuIcon} />
                  <Text style={[styles.menuText, item.color && { color: item.color }]}>{item.title}</Text>
                </View>
                <Icon name="chevron-right" size={24} color={item.color || "#000"} />
              </TouchableOpacity>
              <View style={styles.menuDivider} />
            </View>
          ))}
        </View>
      </View>
      <BottomNavigation navigation={navigation} user_id={userId}/>
    </SafeAreaView>
  );
};

export default MyProfileScreen;
