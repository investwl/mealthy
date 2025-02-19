import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, TextInput, 
  KeyboardAvoidingView, ScrollView, Image, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import image picker
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import { useFonts } from 'expo-font';
import styles from '../styles/6.1_EditProfileStyles';
import axios from 'axios';

const EditProfileScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'PlusJakartaSans-Regular': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Regular.ttf'),
    'PlusJakartaSans-Medium': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Medium.ttf'),
    'PlusJakartaSans-Bold': require('../assets/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Bold.ttf'),
  });
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [foodAllergies, setFoodAllergies] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [dobError, setDobError] = useState('');
  const [name, setName] = useState('Yehezkiel Michael Sutara');
  const [isEditingName, setIsEditingName] = useState(false);

  // Meminta izin akses galeri
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need gallery access to set profile picture.');
      }
    })();
  }, []);

  // Image picker function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Menjaga rasio gambar 1:1
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri); // Ambil gambar pertama
    }
  };


  const updateProfile = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users/register', {
        name: username,
        email,
        password_hash: 'dummyPassword123',
      });
      console.log('User registered:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Validasi Email
  const validateEmail = (text) => {
    setEmail(text);
    if (!text.endsWith('@gmail.com')) {
      setEmailError('Email harus berakhiran @gmail.com');
    } else {
      setEmailError('');
    }
  };

  // Format DOB otomatis dengan '/'
  const formatDob = (text) => {
    // Hapus karakter selain angka
    let cleaned = text.replace(/\D/g, '');

    // Pisahkan angka menjadi format dd/mm/yyyy
    let formatted = '';
    if (cleaned.length > 0) {
      formatted = cleaned.substring(0, 2);
    }
    if (cleaned.length > 2) {
      formatted += '/' + cleaned.substring(2, 4);
    }
    if (cleaned.length > 4) {
      formatted += '/' + cleaned.substring(4, 8);
    }

    setDob(formatted);

    // Validasi format
    const dobPattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dobPattern.test(formatted) && formatted.length === 10) {
      setDobError('Format DOB harus dd/mm/yyyy');
    } else {
      setDobError('');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <Header navigation={navigation} title="EDIT PROFILE" />

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.profileImageContainer}>
              {profileImage && (
                <Image 
                  source={{ uri: profileImage }} 
                  style={styles.profileImage} 
                  resizeMode="cover" 
                />
              )}
              <Icon name="camera" size={40} color="#fff" style={styles.cameraIcon} />
            </View>
          </TouchableOpacity>
          <View style={styles.nameContainer}>
            {isEditingName ? (
              <TextInput
                style={styles.nameInput}
                value={name}
                onChangeText={setName}
                autoFocus
                onBlur={() => setIsEditingName(false)}
              />
            ) : (
              <TouchableOpacity style={styles.nameRow} onPress={() => setIsEditingName(true)}>
                <Text style={styles.name}>{name}</Text>
                <Icon name="pencil" size={20} color="#000" style={styles.pencilIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Edit Profile Section */}
        <View style={styles.menuSection}>
          <View style={styles.menuGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.inputField, emailError ? styles.inputError : null]}
              value={email}
              onChangeText={validateEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          <View style={styles.menuGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.inputField}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholder="Enter your username"
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
            />
          </View>

          <View style={styles.menuGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={[styles.inputField, dobError ? styles.inputError : null]}
              value={dob}
              onChangeText={formatDob} // Menggunakan fungsi formatDob
              placeholder="DD/MM/YYYY"
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
              keyboardType="numeric"
            />
            {dobError ? <Text style={styles.errorText}>{dobError}</Text> : null}
          </View>

          <View style={styles.menuGroup}>
            <Text style={styles.label}>Food Allergies</Text>
            <TextInput
              style={styles.inputField}
              value={foodAllergies}
              onChangeText={setFoodAllergies}
              placeholder="Enter your food allergies"
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
            />
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.saveContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            if (!emailError && !dobError && email && dob) {
              navigation.navigate('MyProfile');
            } else {
              Alert.alert("Validation Error", "Harap isi data dengan benar.");
            }
          }}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;
