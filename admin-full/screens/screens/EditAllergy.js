import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditAllergy = ({ route, navigation }) => {
    const { allergy } = route.params;

    // If allergy data is missing, show a loading or error message
    if (!allergy) {
        return <Text>Loading allergy data...</Text>;
    }

    // Initialize the name state correctly
    const [name, setName] = useState(Array.isArray(allergy.name) ? allergy.name.join(', ') : '');

    const handleSave = () => {
        const nameArray = name.split(',').map(item => item.trim());

        axios.put(`http://localhost:5000/allergies/${allergy.allergy_id}`, { name: nameArray })
            .then(response => {
                navigation.goBack();
            })
            .catch(error => {
                console.error('Error saving allergy data', error);
            });
    };

    return (
        <ImageBackground 
            source={require('../assets/background.png')} // Add your background image
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                {/* Back Button */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="black" />
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>

                {/* Title Page Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Edit Allergy</Text>
                </View>

                {/* Allergy Input Form */}
                <View style={styles.formContainer}>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={styles.textInput}
                        placeholder="Enter allergens (comma separated)"
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Ensures the background image covers the entire screen
        justifyContent: 'center', // Centers the content vertically
    },
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    backButtonText: {
        fontSize: 18,
        color: 'black',
        fontWeight: '500',
        marginLeft: 8,
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2A2A2A', // Matching color scheme
    },
    formContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#FFFF', // Cream background color for the form
        borderRadius: 12,
    },
    textInput: {
        borderBottomWidth: 1,
        marginBottom: 20,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#4CAF50', // Green color for the button
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default EditAllergy;
