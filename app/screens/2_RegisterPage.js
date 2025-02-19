import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import styles from '../styles/2_RegisterStyles';
import { Text, TextInput, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const Registration = () => {
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minPassLength = 8;
    const passwordValidation =  /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[!@#$%^&])[A-Za-z\d!@#$%^&]{6,}$/;
    const showErrors = {};

    if(!email){
      showErrors.email = 'Email is required.'
    } else if(!emailValidation.test(email)) {
      showErrors.email = 'Invalid email format!'
    }

    if(!password){
      showErrors.password = 'Password is required.'
    } else if(password.length < minPassLength) {
      showErrors.password = 'Password must be at least ${minPassLength} characters long.'
    } else if(!passwordValidation.test(password)) {
      showErrors.password = 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
    }

    if(!confirmPassword){
      showErrors.confirmPassword = 'Please confirm your password.'
    } else if(password !== confirmPassword) {
      showErrors.confirmPassword = 'Password do not match.'
    }

    setErrors(showErrors);

    if(Object.keys(showErrors).length === 0) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrors({});
      console.log(`Welcome, ${email}!`);
      navigation.navigate('Login'); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/logo_login.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>REGISTER</Text>

      <SafeAreaView style={styles.inputArea}>
        {/* input email */}
        <SafeAreaView style={styles.inputContainer}>
          <Ionicons name="mail" size={20} color="#8C8C8C" style={styles.icon} />
          <Text style={styles.label}>email</Text>
          <TextInput
            style={styles.input}
            // placeholder='username'
            value={email}
            onChangeText={(Text) => setEmail(Text)}
            keyboardType='email-address'
            autoCapitalize='none'
            />
        </SafeAreaView>
        {errors.email && (
          <SafeAreaView style={styles.errorContainer}>
            <Text style={styles.errorText}>{errors.email}</Text>
          </SafeAreaView>
        )}

        {/* input password */}
        <SafeAreaView style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={20} color="#8C8C8C" style={styles.icon} />
          <Text style={styles.label}>password</Text>
          <TextInput
            style={styles.input}
            // placeholder='password'
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


        {/* confirm password */}
        <SafeAreaView style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={20} color="#8C8C8C" style={styles.icon} />
          <Text style={styles.label}>confirm password</Text>
          <TextInput
            style={styles.input}
            // placeholder='password'
            value={confirmPassword}
            onChangeText={(Text) => setConfirmPassword(Text)}
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
        {errors.confirmPassword && (
          <SafeAreaView style={styles.errorContainer}>
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          </SafeAreaView>
        )}
      </SafeAreaView>

      {/* register button */}
      <TouchableOpacity style={styles.button} onPress={Registration}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      
      {/* divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.divider} />
      </View>

      {/* continue as guest button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recipe')}>
        <Text style={styles.buttonText}>Continue as Guest</Text>
      </TouchableOpacity>

      {/* not registered */}
      <Text style={styles.Registered} onPress={() => navigation.navigate('Login')}> I'm already registered</Text>
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default RegisterPage;