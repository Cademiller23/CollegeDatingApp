import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "---------------------------",
  authDomain: "collegedatingapp.firebaseapp.com",
  projectId: "collegedatingapp",
  storageBucket: "collegedatingapp.appspot.com",
  messagingSenderId: "----------",
  appId: "--------",
};

var app;
var firestore;
try {
  app = initializeApp(firebaseConfig);
  firestore = getFirestore(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error", error);
}

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firebase Auth

export { app, firestore, auth };
