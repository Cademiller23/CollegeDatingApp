import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function Scratch() {
  return (
    <View style={styles.container}> 
      <Text style={styles.textStyle}>HI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // This makes the View fill the entire screen
    justifyContent: 'center', // This centers children vertically in the column
    alignItems: 'center', // This centers children horizontally
    backgroundColor: '#fff', // Optional: background color for the View
  },
  textStyle: {
    fontSize: 20, // Optional: text size
    color: '#000', // Optional: text color
    textAlign: 'center', // This aligns the text itself in the center
  },
});