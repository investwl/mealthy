import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <LinearGradient
      colors={['#fefae0', '#f0f6c2', '#c0c78d', '#a6b37d', '#869161']}
      style={styles.container}
    >
      <SafeAreaView style={styles.content}>
        <Text style={styles.name}>MEALTHY</Text>
        <Image
          source={require('./assets/logo_#fefae0.png')}
          style={styles.logo}
        />
        <Text style={styles.slogan}>Keep It Healthy</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000'
  },

  logo: {
    width: 125,
    height: 125,
    margin: 25,
  },

  slogan: {
    fontSize: 16,
    color: '#000000'
  },
});
