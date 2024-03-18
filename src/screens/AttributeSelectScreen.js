import React, { useRef, useEffect, useState } from 'react';
import {  Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import {Camera} from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { initializeApp } from 'firebase/app';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {Alert} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, setDoc,doc, getFirestore } from "firebase/firestore"; 
import { app } from '../../firebaseConfig';

// Add a new document with a generated id.

export function AttributeSelecter() {
        const db = getFirestore(app);
        const auth = getAuth();
        const [hasCameraPermission, setHasCameraPermission] = useState(null);

        const [cameraVisible, setCameraVisible] = useState(false);

        const[profilePicUri, setProfilePicUri] = useState('');
        const cameraRef = useRef();
        const handleProfilePicture = async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status == 'granted');

            if(status !== 'granted') {
                Alert.alert('Camera Permission Required', 'Please grant camera access to take a profile picture.');
                return;
            }
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1,1]
            });
            if(!result.canceled) {
              setProfilePicUri(result.uri);
              const auth = getAuth();
              const storage = getStorage();
              const filename = `${auth.currentUser.uid}.jpg`;
              const response = await fetch(result.uri);
              const blob = await response.blob();
              const storageRef = ref(storage, `profilePics/${filename}`);
              await uploadBytes(storageRef, blob);
              const downloadUrl = await getDownloadURL(storageRef);
              console.log('Download URL:', downloadUrl); // Log it or update user profile with this URL
              }
            };
        
          
        
   
   
    const [Major, setMajor] = useState('');
    const [Fashion, setFashion] = useState('');
    const [Risky, setRisky] = useState('');
    const [Music, setMusic] = useState('');
    const [Dates, setDates] = useState('');
    const [Snack, setSnack] = useState('');
    const [Vibe, setVibe] = useState('');
    const [Movie, setMovie] = useState('');

    const [isPressed, setIsPressed] = useState(false);
    const navigation = useNavigation();

    const onPressHandler = async () => {
        const uid=auth.currentUser.uid;
       
        const docRef = await setDoc(doc(db, "userAttributes",uid), {
          movie:Movie,
          major:Major,
          fashion:Fashion, 
          risky:Risky,
          music:Music,
          dates:Dates,
          snack:Snack,
          vibe:Vibe,

          
          });
        navigation.navigate('Main');
    }
    const data = [
        { key: '1', value: "Marshall" },
        { key: '2', value: "Annenburg" },
        { key: '3', value: "Dornsife" },
        { key: '4', value: "Viterbi" },
        { key: '5', value: "Bovard" },
        { key: '6', value: "Iovine and Young Academy" }
    ];
    const SimpleInput = ({ placeholder, secureTextEntry = false, keyboardType = 'default', placeholderTextColor = '#ccc' }) => (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            placeholderTextColor={placeholderTextColor}
          />
        </View>
      );
    

    // Create a component that renders space
    const Spacer = () => <View style={styles.spacer} />;

    return (
        <View style={styles.container}>
            <LottieView
            source={require('../../assets/Gradient_Modern_Light.json')}
            autoPlay
            loop
            resizeMode='cover'
            style={styles.lottieBackground}/>
            
             <ScrollView style={styles.scrollView}>
             <Text style={styles.header}>Attribute Selector Page</Text>
             {profilePicUri ? (
                <Image source={{uri: profilePicUri}} style={styles.profilepic} />
             ) : (
                <TouchableOpacity onPress={handleProfilePicture} style={styles.profilePicContainer}> 
                <Text style={styles.plusIcon}>+</Text>
                </TouchableOpacity>
            
             )}
                <View style={styles.dropdownContainer}>
                
                <SelectList
                    data={data}
                    setSelected={setMajor}
                    placeholder={"What is your Major?"}
                    searchPlaceholder={"Major"}
                />
                <Spacer />
                <SelectList
                    data={data}
                    setSelected={setFashion}
                    placeholder={"Campus Fashion Statement"}
                    searchPlaceholder={"Drip..."}
                />
                <Spacer />
                <SelectList
                    data={data}
                    setSelected={setRisky}
                    placeholder={"Your idea of a risky adventure"}
                    searchPlaceholder={"Risky Business"}
                />
                <Spacer />
                <SelectList
                    data={data}
                    setSelected={setMusic}
                    placeholder={"One Genre of Music Forever"}
                    searchPlaceholder={"Blissful Rhythm"}
                />
                <Spacer />
                <MultipleSelectList
                    data={data}
                    setSelected={setDates}
                    placeholder={"Dates you would like?"}
                    searchPlaceholder={"Type of Date"}
                />
                 <Spacer />
                 <MultipleSelectList
                    data={data}
                    setSelected={setSnack}
                    placeholder={"Late Night Snack Preference"}
                    searchPlaceholder={"Thats a Munch!"}
                />
                 <Spacer />
                 <MultipleSelectList
                    data={data}
                    setSelected={setVibe}
                    placeholder={"Weekend Vibes"}
                    searchPlaceholder={"Vibe"}
                />
                 <Spacer />
                 <SelectList
                    data={data}
                    setSelected={setMovie}
                    placeholder={"Life was one movie?"}
                    searchPlaceholder={"Which Movie?"}
                />
            </View>
            <View style={styles.btnContainer}> 
          <TouchableOpacity 
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={onPressHandler}
            style={[styles.btn, isPressed && styles.btnPressed]}>
            <Text style={styles.btnText}>Begin Dating...</Text>
          </TouchableOpacity>   
      </View>
        </ScrollView>
         </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 16,
        color: '#333', // Dark for contrast
        fontFamily: 'System', // Default system font. You can change it to a custom one if needed.
      },
      
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    scrollView: {
       
        backgroundColor: 'transparent',
    },
    lottieBackground: {
        ...StyleSheet.absoluteFillObject,
    },
    btnContainer: {
        borderRadius: 12.5, 
        overflow: 'hidden',
        marginTop: 10,
      },
      profilePic: {
        width: 150,
        height: 150,
        borderRadius: 75, // Makes it circular
        alignSelf: 'center',
        marginTop: 30,
      },
      profilePicContainer: {
        borderWidth: 2,
        borderColor: 'grey',
        backgroundColor: '#e1e4e8', // A light grey background for the container
        borderRadius: 8, // Rounded corners
        width: 150, // Width of the square
        height: 150, // Height of the square
        alignItems: 'center', // Center items horizontally
        justifyContent: 'center', // Center items vertically
        alignSelf: 'center', // Position the container in the center of the screen
        marginTop: 30, // Space from the top or previous element
      },
      
      plusIcon: {
        fontSize: 24, // Size of the plus icon
        color: 'black', // Color of the plus icon
      },
      
      camera: {
        width: '100%', // Take the full width of the screen
        height: '100%', // Take the full height of the screen
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
    dropdownContainer: {
        paddingTop: 100,
        paddingHorizontal: 30,
        paddingBottom: 40,
        zIndex: 2,
    },
    spacer: {
        height: 40, // Or whatever height you want the space to be
    },
   
});

export default AttributeSelecter;