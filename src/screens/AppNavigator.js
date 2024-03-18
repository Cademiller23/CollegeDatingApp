import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import AttributeSelectScreen from './AttributeSelectScreen';
import BottomTabNavigator from '../Components/BottomTabNavigator';
import scratch from './scratch';

const Stack = createNativeStackNavigator();

export function AppNavigator({ isSignedIn, auth }) {
  return (
    <NavigationContainer>
   <Stack.Navigator screenOptions={{ headerShown: false }}>
  
   <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
   <Stack.Screen name="AttributeSelecter" component={AttributeSelectScreen} />
   <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
    </NavigationContainer>
   /*
  <NavigationContainer> 

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {false ? (
          <Stack.Screen name="Main" component={BottomTabNavigator} />
        ) : (
          <>
           <Stack.Screen name="Main" component={BottomTabNavigator} />
           <Stack.Screen name="AttributeSelecter" component={AttributeSelectScreen} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="AttributeSelecter" component={AttributeSelectScreen} />
          </>
        )}
      </Stack.Navigator> 
   </NavigationContainer>
   */
  );
};

export default AppNavigator;