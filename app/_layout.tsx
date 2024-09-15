// app/layout.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen name="index"/>  
        <Stack.Screen name="map" />    
        <Stack.Screen name="manual" />    
        <Stack.Screen name="floor" />    
        <Stack.Screen name="login" 
         options={{ headerShown: false }}/>    
        <Stack.Screen name="check"
        options={{ headerShown: false }} />    
        <Stack.Screen name="leave"
        options={{ headerShown: false }} />    
        </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});

export default RootLayout;
