import React, { useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import AttributeSelectScreen from './AttributeSelectScreen'
import SignIn from './SignInScreen'
export function SignUpScreen() {
  const [isPressed, setIsPressed] = useState(false);
  const navigation = useNavigation();
const[Email, setEmail] = useState('');
const[Password, setPassword] = useState('');
const[FirstName, setFirstName] = useState('');
const[LastName, setLastName] = useState('');
  const onPressHandler = () => {
   
    if(!Email.toLowerCase().endsWith('@usc.edu')) {
      Alert.alert('You must be a USC Student!');
      return; 
    }
    const firebaseAuth = getAuth();
    createUserWithEmailAndPassword(firebaseAuth, Email, Password)  
    .then((userCredential) => {
      // Signed in 
      
      // You can now navigate or perform other actions
      console.log("success");
      navigation.navigate(AttributeSelectScreen);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // Handle errors here
    });
};

  // TextInput with Gradient Border


  return (
    <View style={styles.container}>
      <LottieView
            source={require('../../assets/Gradient_Modern_Pink.json')}
            autoPlay
            loop
            resizeMode='cover'
            style={styles.lottieBackground}/>
      <Text style={styles.headerText}>Exclusivly USC</Text>
      
      <Text style={styles.text}>First Name:</Text>
     <View style={styles.plainInputContainer}>
  
      <TextInput
        value={FirstName}
        style={styles.input}
        placeholder={"First Name"}
        secureTextEntry={false}
        keyboardType={"default"}
        placeholderTextColor={'#ccc'}
        onChangeText={setFirstName} 
      />
    </View>
    <Text style={styles.text}>Last Name:</Text>
       <View style={styles.plainInputContainer}>
    
      <TextInput
        value={LastName}
        style={styles.input}
        placeholder={"Last Name"}
        secureTextEntry={false}
        keyboardType={"default"}
        placeholderTextColor={'#ccc'}
        onChangeText={setLastName} 
      />
    </View>
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
    <Text style={styles.text}>Email:</Text>
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

<TouchableOpacity
        onPress={onPressHandler}
        style={[styles.btn, isPressed && styles.btnPressed]}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate(SignIn)}
      >
        <Text style={styles.mem}>Already a Member?</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SignUpScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: 'transparent',
    
  },
  lottieBackground: {
    ...StyleSheet.absoluteFillObject,
},
  headerText: {
    fontSize: 24, // larger size for a header
    color: "white",
    fontWeight: "bold", // bold text for emphasis
    textAlign: "center", // center align instead of paddingLeft
    paddingBottom: 4,
    top: 0
  },
  text: {
    color: '#FFFFFF',
    marginBottom: 4,
  },
  plainInputContainer: {
    backgroundColor: '#000', // light gray background for input
    borderRadius: 25,
    marginBottom: 10,
    paddingHorizontal: 16,
    height: 50,
    justifyContent: 'center', // Center the TextInput inside the View
  },
  input: {
    fontSize: 16,
    color: '#FFFFFF', // This could also be white or black depending on the background color of your Lottie animation
    
  },
  
  btnContainer: {
    borderRadius: 12.5, 
    overflow: 'hidden',
    marginTop: 10,
  },
 
  btn: {
    backgroundColor: '#333', // Dark button background
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnPressed: {
    opacity: 0.8,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  memberbtn: {
    color: '#F5F5F5',
    paddingTop: 5,
    paddingLeft: 100,
    fontSize: 12
  }
});
