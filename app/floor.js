import React from 'react';
import { StyleSheet, View } from 'react-native';
import FloorPlan from '../components/FloorPlan';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <FloorPlan />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
