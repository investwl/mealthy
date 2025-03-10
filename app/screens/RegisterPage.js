import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, Alert, View, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RegisterPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const Registration = () => {
    const emailValidation = /^[^\s@]+@gmail\.com$/;
    const minPassLength = 8;
    const passwordValidation =  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!]{6,}$/;
    const showErrors = {};

    if(!email){
      showErrors.email = 'Email is required.'
    } else if(!emailValidation.test(email)) {
      showErrors.email = 'Invalid email format! Email must end with @gmail.com.'
    }

    if(!password){
      showErrors.password = 'Password is required.'
    } else if(password.length < minPassLength) {
      showErrors.password = `Password must be at least ${minPassLength} characters long.`
    } else if(!passwordValidation.test(password)) {
      showErrors.password = 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.'
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
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/logo_#a6b37d.png')}
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
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.iconRight}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
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
            secureTextEntry={!isConfirmPasswordVisible}
          />
          <TouchableOpacity
            onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
            style={styles.iconRight}
          >
            <Ionicons
              name={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue as Guest</Text>
      </TouchableOpacity>

      {/* not registered */}
      <Text style={styles.Registered} onPress={() => navigation.navigate('Login')}> I'm already registered</Text>
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAE0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    fontFamily:  'PlusJakartaSans-Regular',
  },

  logo: {
    width: 85,
    height: 85,
    marginBottom: 10
  },
  
  title: {
    fontSize: 28,
    // fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
    fontFamily:  'PlusJakartaSans-Bold',
  },

  inputArea: {
    paddingHorizontal: 5,
    paddingVertical: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#8C8C8C',
    marginTop: 20,
    marginBottom: 5,
    paddingHorizontal: 15,
  },

  errorContainer: {
    width: '100%',
  },

  errorText: {
    color: 'firebrick',
    fontSize: 11,
    // marginTop: 1,
    textAlign: 'left',
    marginHorizontal: 10,
    flexWrap: 'wrap',
    fontFamily:  'PlusJakartaSans-Regular',
  },

  label: {
    position: 'absolute',
    color: '#8C8C8C',
    backgroundColor: '#FEFAE0',
    padding: 5,
    top: -17,
    left: 10,
    fontFamily:  'PlusJakartaSans-Regular',
  },

  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily:  'PlusJakartaSans-Regular',
  },

  icon: {
    marginVertical: 5,
    marginRight: 5,
  },

  iconRight: {
    marginLeft: 8,
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#C0C78C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  buttonText: {
    color: '#000',
    // fontWeight: 'bold',
    fontSize: 16,
    fontFamily:  'PlusJakartaSans-Bold',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#8C8C8C',
    borderRadius: 10,
  },

  dividerText: {
    color: '#8C8C8C',
    marginHorizontal: 10,
    top: -2,
    fontFamily:  'PlusJakartaSans-Regular',
  },

  Registered: {
    color: '#8C8C8C',
    fontFamily:  'PlusJakartaSans-Regular',
  },
});

export default RegisterPage;