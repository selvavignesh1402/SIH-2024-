import React from 'react';
import { StyleSheet, View } from 'react-native';
import ManualCheck from '../../components/ManualCheck';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <ManualCheck />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
