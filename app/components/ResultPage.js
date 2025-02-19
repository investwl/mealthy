import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScannerPage from './ScannerPage';
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
  const imageUri = route?.params?.imageUri || null;
  const allergensDetected = ["Milk", "Egg", "Peanut", "Nut"];
  const allAllergens = ["Milk", "Egg", "Peanut", "Nut", "Soy", "Fish", "Shellfish", "Wheat", "Gluten"];
  const userAllergies = ["Milk"];

  const isSafe = allergensDetected.every(
    (allergen) => !userAllergies.includes(allergen)
  );

  const detectedAllergens = allAllergens.filter(allergen => allergensDetected.includes(allergen));

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name="arrow-back" 
            style={styles.icon} 
            onPress={() => navigation.navigate('Scanner')} 
          />
        </View>
        <Text style={styles.headerText}>ALLERGY SCANNER</Text>
      </View>

      {/* Main Content */}
      <SafeAreaView style={styles.mainContent}>

        {/* Scanner */}
        <View style={styles.scannedContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.scannedImage} />
          ) : (
            <Text style={styles.noImageText}>No Image Scanned</Text>
          )}
        </View>

        {/* Result */}
        <View style={styles.resultContainer}>
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
                    <Image source={EggIcon} style={styles.allergenIcon} resizeMode='contain'/>
                  )}
                  {allergen === "Milk" && (
                    <Image source={MilkIcon} style={styles.allergenIcon} resizeMode='contain'/>
                  )}
                  {allergen === "Peanut" && (
                    <Image source={PeanutIcon} style={styles.allergenIcon} resizeMode='contain'/>
                  )}
                  {allergen === "Nut" && (
                    <Image source={NutIcon} style={styles.allergenIcon} resizeMode='contain'/>
                  )}
                  {allergen === "Soy" && (
                    <Image source={SoyIcon} style={styles.allergenIcon} resizeMode='contain'/>
                  )}
                  {allergen === "Fish" && (
                    <Image source={FishIcon} style={styles.allergenIcon} resizeMode='contain'/>
                  )}
                  {allergen === "Shellfish" && (
                    <Image source={CrustaceanIcon} style={styles.allergenIcon} resizeMode='contain'/>
                  )}
                  {allergen === "Wheat" && (
                    <Image source={WheatIcon} style={styles.allergenIcon} resizeMode='contain'/>
                  )}
                  {allergen === "Gluten" && (
                    <Image source={GlutenIcon} style={styles.allergenIcon} resizeMode='contain'/>
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

          {/* Conclusion Box */}
          {isSafe ? (
            <View style={styles.conclusionBox}>
              <Text style={styles.safeText}>✅ SAFE TO GO!</Text>
              <Text style={styles.safeDetailText}>No allergens for you. Enjoy!</Text>
            </View>
          ) : (
            <View style={styles.conclusionBox}>
              <Text style={styles.alertText}>⚠️ ALLERGEN ALERT!</Text>
              <Text style={styles.alertDetailText}>
                {userAllergies.join(", ")} found in the product! Check carefully.
              </Text>
            </View>
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
    // fontWeight: 'bold',
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
    height: '50%',
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
    // fontWeight: '500',
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
    // fontWeight: '500',
    marginBottom: 3,
    fontFamily: 'PlusJakartaSans-Medium',
  },

  noAllergensText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
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
    // fontWeight: 'bold',
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
    // fontWeight: 'bold',
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