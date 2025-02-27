import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MLKitOcr from 'react-native-mlkit-ocr'; // Import react-native-mlkit-ocr

import EggIcon from '../assets/egg.png';
import MilkIcon from '../assets/milk-bottle.png';
import PeanutIcon from '../assets/peanut.png';
import NutIcon from '../assets/nut.png';
import SoyIcon from '../assets/bean.png';
import FishIcon from '../assets/fish.png';
import CrustaceanIcon from '../assets/shrimp.png';
import WheatIcon from '../assets/wheat.png';
import GlutenIcon from '../assets/gluten.png';

const ResultPage = ({ route, navigation }) => {
  const photoUri = route?.params?.photoUri || null;
  const [recognizedText, setRecognizedText] = useState('');
  const [detectedAllergens, setDetectedAllergens] = useState([]);

  const allergenDatabase = [
    { name: "Milk", keywords: ["milk", "dairy", "whey", "casein", "lactose"] },
    { name: "Egg", keywords: ["egg", "albumin"] },
    { name: "Peanut", keywords: ["peanut", "nuts"] },
    { name: "Nut", keywords: ["almond", "cashew", "walnut", "pecan"] },
    { name: "Soy", keywords: ["soy", "soybean", "tofu", "edamame"] },
    { name: "Fish", keywords: ["fish", "anchovies", "sardines", "tuna", "salmon"] },
    { name: "Shellfish", keywords: ["shellfish", "shrimp", "crab", "lobster", "oyster"] },
    { name: "Wheat", keywords: ["wheat", "flour", "bread", "pasta"] },
    { name: "Gluten", keywords: ["gluten", "wheat", "barley", "rye"] },
  ];

  const userAllergies = ["Milk"];

  const recognizeTextFromImage = async () => {
    if (photoUri) {
      try {
        const resizedImage = await ImageManipulator.manipulateAsync(
          photoUri,
          [{ resize: { width: 800 } }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );

        // Use react-native-mlkit-ocr instead of expo-text-recognizer
        const result = await MLKitOcr.detectFromFile(resizedImage.uri);
        const text = result?.text || ''; // Adjust based on the actual structure of the result
        setRecognizedText(text);
        console.log("Recognized text:", text);
      } catch (error) {
        console.error("Error recognizing text:", error);
        Alert.alert("OCR Error", "Failed to recognize text. Please try again with a clearer image.");
      }
    }
  };

  useEffect(() => {
    recognizeTextFromImage();
  }, [photoUri]);

  useEffect(() => {
    const analyzeTextForAllergens = () => {
      if (recognizedText) {
        const lowerCaseText = recognizedText.toLowerCase();
        const foundAllergens = [];

        allergenDatabase.forEach(allergen => {
          allergen.keywords.forEach(keyword => {
            if (lowerCaseText.includes(keyword) && !foundAllergens.includes(allergen.name)) {
              foundAllergens.push(allergen.name);
            }
          });
        });

        setDetectedAllergens(foundAllergens);
      }
    };

    analyzeTextForAllergens();
  }, [recognizedText]);

  const isSafe = detectedAllergens.every(allergen => !userAllergies.includes(allergen));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="arrow-back" style={styles.icon} onPress={() => navigation.navigate('Scanner')} />
        </View>
        <Text style={styles.headerText}>ALLERGY SCANNER</Text>
      </View>

      {/* Main Content */}
      <SafeAreaView style={styles.mainContent}>
        {/* Scanner */}
        <View style={styles.scannedContainer}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.scannedImage} />
          ) : (
            <Text style={styles.noImageText}>No Image Scanned</Text>
          )}
        </View>

        {/* Result */}
        <View style={styles.resultContainer}>
          {recognizedText ? (
            <>
              <Text style={styles.resultHeader}>PRODUCT MAY CONTAIN</Text>
              {detectedAllergens.length > 0 ? (
                <ScrollView horizontal={true} style={styles.allergenBoxList}>
                  {detectedAllergens.map((allergen, index) => (
                    <View
                      key={allergen}
                      style={[
                        styles.allergenContainer,
                        index !== 0 && { marginLeft: 5 },
                        index !== detectedAllergens.length - 1 && { marginRight: 5 },
                      ]}
                    >
                      <Text style={styles.allergenList}>{allergen}</Text>
                      {allergen === "Egg" && (
                        <Image source={EggIcon} style={styles.allergenIcon} resizeMode='contain' />
                      )}
                      {allergen === "Milk" && (
                        <Image source={MilkIcon} style={styles.allergenIcon} resizeMode='contain' />
                      )}
                      {allergen === "Peanut" && (
                        <Image source={PeanutIcon} style={styles.allergenIcon} resizeMode='contain' />
                      )}
                      {allergen === "Nut" && (
                        <Image source={NutIcon} style={styles.allergenIcon} resizeMode='contain' />
                      )}
                      {allergen === "Soy" && (
                        <Image source={SoyIcon} style={styles.allergenIcon} resizeMode='contain' />
                      )}
                      {allergen === "Fish" && (
                        <Image source={FishIcon} style={styles.allergenIcon} resizeMode='contain' />
                      )}
                      {allergen === "Shellfish" && (
                        <Image source={CrustaceanIcon} style={styles.allergenIcon} resizeMode='contain' />
                      )}
                      {allergen === "Wheat" && (
                        <Image source={WheatIcon} style={styles.allergenIcon} resizeMode='contain' />
                      )}
                      {allergen === "Gluten" && (
                        <Image source={GlutenIcon} style={styles.allergenIcon} resizeMode='contain' />
                      )}
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <View style={styles.noAllergensContainer}>
                  <Text style={styles.noAllergensTextHead}>Worry less, enjoy more!</Text>
                  <Text style={styles.noAllergensText}>No allergens inside! 😋</Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.nothingDetectedContainer}>
              <Text style={styles.nothingDetectedTextHead}>OOPS! We couldn't recognize the text.</Text>
              <Text style={styles.nothingDetectedText}>Please make sure the text is clear, well-lit, and in focus. You can try again with a clearer image.</Text>
            </View>
          )}

          {/* Conclusion Box */}
          {recognizedText && (
            isSafe ? (
              <View style={styles.conclusionBox}>
                <Text style={styles.safeText}>✅ SAFE TO GO!</Text>
                <Text style={styles.safeDetailText}>No allergens for you. Enjoy!</Text>
              </View>
            ) : (
              <View style={styles.conclusionBox}>
                <Text style={styles.alertText}>⚠ ALLERGEN ALERT!</Text>
                <Text style={styles.alertDetailText}>
                  {userAllergies.join(", ")} found in the product! Check carefully.
                </Text>
              </View>
            )
          )}
        </View>
      </SafeAreaView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '11%',
    backgroundColor: '#F9F6F6',
  },

  headerContainer: {
    width: '100%',
    height: 65,
    backgroundColor: '#c0c78c',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
  },

  iconContainer: {
    position: 'absolute',
    left: 15,
  },

  icon: {
    fontSize: 20,
  },

  headerText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Bold',
  },

  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F6F6',
  },

  scannedContainer: {
    width: '90%',
    height: '55%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    margin: 25,
  },

  scannedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  noImageText: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Regular',
  },

  resultContainer: {
    width: '100%',
    backgroundColor: '#c0c78c',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    flex: 1,
  },

  resultHeader: {
    fontSize: 20,
    marginBottom: 15,
    fontFamily: 'PlusJakartaSans-Medium',
  },

  allergenBoxList: {
    width: '100%',
    marginBottom: 15,
    paddingVertical: 12,
  },

  allergenContainer: {
    width: 85,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefae0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 25,
  },

  allergenList: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'PlusJakartaSans-Regular',
  },

  allergenIcon: {
    width: 28,
    height: 28,
  },

  noAllergensContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fefae0',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 25,
    height: 85,
  },

  noAllergensTextHead: {
    fontSize: 18,
    marginBottom: 3,
    fontFamily: 'PlusJakartaSans-Medium',
  },

  noAllergensText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
  },

  nothingDetectedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fefae0',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 25,
    height: 220,
    textAlign: 'center',
  },

  nothingDetectedTextHead: {
    fontSize: 18,
    marginBottom: 3,
    fontFamily: 'PlusJakartaSans-Medium',
  },

  nothingDetectedText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'center',
  },

  conclusionBox: {
    width: '100%',
    height: '35%',
    padding: 10,
    backgroundColor: '#fefae0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertText: {
    fontSize: 24,
    color: '#B10000',
    marginBottom: 5,
    fontFamily: 'PlusJakartaSans-Bold',
  },

  alertDetailText: {
    fontSize: 14,
    color: '#B10000',
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Regular',
  },

  safeText: {
    fontSize: 24,
    color: '#009C3F',
    marginBottom: 5,
    fontFamily: 'PlusJakartaSans-Bold',
  },

  safeDetailText: {
    fontSize: 14,
    color: '#009C3F',
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Regular',
  },
});

export default ResultPage;