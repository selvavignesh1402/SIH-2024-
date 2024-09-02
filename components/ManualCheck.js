import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

// Function to fetch nearby places using the Overpass API
const fetchNearbyLocations = async (latitude, longitude) => {
  try {
    const radius = 500; // Search radius in meters
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:${radius},${latitude},${longitude})[amenity];out;`;

    const response = await fetch(overpassUrl);
    const data = await response.json();

    // Extract relevant information from Overpass API response
    const locations = data.elements.map((element) => ({
      id: element.id,
      name: element.tags.name || 'Unknown Place',
      latitude: element.lat,
      longitude: element.lon,
    }));

    return locations;
  } catch (error) {
    console.error('Error fetching locations from Overpass API:', error);
    Alert.alert('Error', 'Failed to fetch nearby locations.');
    return [];
  }
};

const DynamicLocationSuggestions = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setCurrentLocation(location.coords);

    // Fetch nearby locations using the Overpass API
    const locations = await fetchNearbyLocations(location.coords.latitude, location.coords.longitude);
    setNearbyLocations(locations);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nearby Places:</Text>
      <FlatList
        data={nearbyLocations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
      <Button title="Refresh Location" onPress={getLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DynamicLocationSuggestions;
