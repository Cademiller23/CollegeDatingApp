import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

import LottieView from 'lottie-react-native';
import {getAuth, signInWithEmailAndPassword}from 'firebase/auth';
import SignUp from './SignUpScreen'
import { useNavigation } from '@react-navigation/native';

export function SignInScreen() {
  const [isPressed, setIsPressed] = useState(false);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleSignIn = () => {
  const auth = getAuth();
    signInWithEmailAndPassword(auth, Email, Password)
    .then(() => {
      navigation.navigate('Main');
    })
    .catch((error) => {
      alert(error.message);
    })
  }


  return (
    <View style={styles.container}>
       <LottieView
            source={require('../../assets/Gradient_Modern_Red.json')}
            autoPlay
            loop
            resizeMode='cover'
            style={styles.lottieBackground}/>
      <Text style={styles.text}>Email:</Text>
      <View style={styles.plainInputContainer}>
   
   <TextInput
     value={Email}
     style={styles.input}
     placeholder={"Email"}
     secureTextEntry={false}
     keyboardType={"email-address"}
     placeholderTextColor={'#ccc'}
     onChangeText={setEmail} 
   />
 </View>

      <Text style={styles.text}>Password:</Text>
      <View style={styles.plainInputContainer}>
   
      <TextInput
        value={Password}
        style={styles.input}
        placeholder={"Password"}
        secureTextEntry={true}
        keyboardType={"default"}
        placeholderTextColor={'#ccc'}
        onChangeText={setPassword} 
      />
    </View>

      <View style={styles.btnContainer}> 
          <TouchableOpacity 
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={handleSignIn}
            style={[styles.btn, isPressed && styles.btnPressed]}>
            <Text style={styles.btnText}>Sign In</Text>
          </TouchableOpacity>
        
        <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate(SignUp)}
      ><Text style={styles.signUp}>Not a User yet?</Text></TouchableOpacity>
      </View>
    </View>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
    backgroundColor: '#121212',
    
  },
  lottieBackground: {
    ...StyleSheet.absoluteFillObject,
},
  text: {
    color: '#FFFFFF',
    marginBottom: 4,
  },
  gradientInputContainer: {
    marginBottom: 10,
  },
  gradientBorder: {
    borderRadius: 100,
    padding: 1, // Adjust this for the border thickness
  },
  input: {
    height: 48,
    paddingHorizontal: 10,
    borderRadius: 100,
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#000',
    borderWidth: 3, // Remove the border
  },
  btnContainer: {
    borderRadius: 12.5, 
    overflow: 'hidden',
    marginTop: 10,
  },
  btnGradient: {
    padding: 2,
  },
  btn: {
    backgroundColor: '#000',
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPressed: {
    opacity: 0.8,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  signUp: {
    color: '#FFFFFF',
    padding: 12,
    fontSize: 14,
    textAlign: "center",
  }
});