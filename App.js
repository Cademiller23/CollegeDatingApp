import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/screens/AppNavigator';

import {auth } from './firebaseConfig';
import { initializeAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {registerRootComponent} from 'expo'



export default function App() {
 

 
 
  const[currentUser, setCurrentUser] = useState(null);
  const[isLoading, setIsLoading] = useState(true);
 /*
 const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
*/
/*
  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return unsubscribe; // Clean up on unmount
  }, []);

*/
/*
  if (isLoading) {
    return (<View style={styles.container}><Text>Loading...</Text></View>);
  }

  const isSignedIn = !!currentUser; */
 // return <AppNavigator isSignedIn={isSignedIn} />;
 return (
 <AppNavigator />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
