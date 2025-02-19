import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import styles from '../styles/1_LoginStyles';
import { StyleSheet, Text, TextInput, TouchableOpacity, Alert, View, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LoginPage = ({ navigation }) => {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const LoggedIn = () => {
    const minPassLength = 8;
    const passwordValidation =  /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[!@#$%^&])[A-Za-z\d!@#$%^&]{6,}$/;
    const showErrors = {};

    if (!username) {
      showErrors.username = 'Username is required.';
    }

    if (!password) {
      showErrors.password = 'Password is required.';
    } else if (password.length < minPassLength) {
      showErrors.password = `Password must be at least ${minPassLength} characters long.`;
    } else if (!passwordValidation.test(password)) {
      showErrors.password = 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.';
    }

    setErrors(showErrors);

    // If there are no errors, navigate to MyProfile screen
    if (Object.keys(showErrors).length === 0) {
      setUsername('');
      setPassword('');
      setErrors({});
      
      // Navigate to the MyProfile screen
      navigation.navigate('MyProfile');
    }
  };

  const handlePress = () => {
    Alert.alert('Register', 'Are you sure you want to register?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          navigation.navigate('RegisterPage');  
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/logo_login.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>LOGIN</Text>

      <SafeAreaView style={styles.inputArea}>
        {/* Input username */}
        <SafeAreaView style={styles.inputContainer}>
          <Ionicons name="person" size={20} color="#8C8C8C" style={styles.icon} />
          <Text style={styles.label}>username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(Text) => setUsername(Text)}
            keyboardType="default"
            autoCapitalize="none"
          />
        </SafeAreaView>
        {errors.username && (
          <SafeAreaView style={styles.errorContainer}>
            <Text style={styles.errorText}>{errors.username}</Text>
          </SafeAreaView>
        )}

        {/* Input password */}
        <SafeAreaView style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={20} color="#8C8C8C" style={styles.icon} />
          <Text style={styles.label}>password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(Text) => setPassword(Text)}
            secureTextEntry={!isVisible}
          />
          <TouchableOpacity
            onPress={() => setIsVisible(!isVisible)}
            style={styles.iconRight}
          >
            <Ionicons
              name={isVisible ? 'eye-off' : 'eye'}
              size={20}
              color="#8C8C8C"
            />
          </TouchableOpacity>
        </SafeAreaView>
        {errors.password && (
          <SafeAreaView style={styles.errorContainer}>
            <Text style={styles.errorText}>{errors.password}</Text>
          </SafeAreaView>
        )}

        {/* Forgot password */}
        <Text style={styles.forgotPassword}>
          Forgot password? 
          <Text
            style={styles.link}
            onPress={() =>
              Alert.alert('Forgot Password', 'Kindly check your email to reset your password ^^')
            }
          >
            {' '}
            Click here!
          </Text>
        </Text>
      </SafeAreaView>

      {/* Login button */}
      <TouchableOpacity style={styles.button} onPress={LoggedIn}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      
      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.divider} />
      </View>

      {/* Continue as guest button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Recipe')} 
      >
        <Text style={styles.buttonText}>Continue as Guest</Text>
      </TouchableOpacity>

      {/* Not registered */}
      <Text style={styles.notRegistered} onPress={handlePress}>
        {' '}
        I'm not registered yet
      </Text>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default LoginPage;
