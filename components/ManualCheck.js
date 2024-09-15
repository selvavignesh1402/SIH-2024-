import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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

// Function to get the public IP address
const getPublicIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching public IP address:', error);
    return null;
  }
};

// Function to check if the IP is using a VPN
const checkVPN = async (ip) => {
  try {
    const apiKey = 'afcd3ed0346eab';
    const url = `https://ipinfo.io/${ip}?token=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const isVPN = data.bogon || false;

    console.log(`Is VPN: ${isVPN}`); 

    return isVPN;
  } catch (error) {
    console.error('Error checking VPN status:', error.message);
    return false;
  }
};

const DynamicLocationSuggestions = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [checkInTime, setCheckInTime] = useState(null);
  const [isVPN, setIsVPN] = useState(false);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    setCurrentLocation(location.coords);

    // Fetch nearby locations using the Overpass API
    const locations = await fetchNearbyLocations(location.coords.latitude, location.coords.longitude);
    setNearbyLocations(locations);

    // Get public IP address and check for VPN
    const ip = await getPublicIP();
    if (ip) {
      const vpnStatus = await checkVPN(ip);
      setIsVPN(vpnStatus);
    } else {
      console.error('Unable to fetch public IP address');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  // Handle location selection
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setCheckInTime(null); // Reset check-in time when a new location is selected
  };

  // Handle check-in action
  const handleCheckIn = () => {
    const currentTime = new Date();
    setCheckInTime(currentTime.toLocaleString()); // Set check-in time
    Alert.alert('Checked In', `Checked in at ${selectedLocation.name} on ${currentTime.toLocaleString()}`);
  };

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={styles.map}
          mapType="hybrid"
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {nearbyLocations.map((location) => (
            <Marker
              key={location.id}
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title={location.name}
            />
          ))}
        </MapView>
      )}
      <View style={styles.listContainer}>
        <Text style={styles.heading}>Nearby Places:</Text>
        <FlatList
          data={nearbyLocations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text onPress={() => handleLocationSelect(item)}>{item.name}</Text>
            </View>
          )}
        />
        {selectedLocation && (
          <>
            <Button title={`Check-In`} onPress={handleCheckIn} />
            {checkInTime && console.log("Checked in at: ", checkInTime)}
          </>
        )}
        <Button title="Refresh Location" onPress={getLocation} />
        {isVPN && <Text style={styles.vpnWarning}>VPN detected. Your IP address may be hidden.</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2, // Adjust the height of the map as needed
  },
  listContainer: {
    flex: 1,
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
  vpnWarning: {
    color: 'red',
    marginTop: 10,
  },
});

export default DynamicLocationSuggestions;

// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, FlatList, StyleSheet, Alert, Dimensions } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';

// const fetchNearbyLocations = async (latitude, longitude) => {
//   try {
//     const radius = 500; 
//     const apiKey = 'fsq3mYZ6ETlORsrHsrqL/+dxKd4oBndLOV7wySamZS/Gaf8='; // Replace with your new Foursquare API key for V3
//     const foursquareUrl = `https://api.foursquare.com/v3/places/search?ll=${latitude},${longitude}&radius=${radius}`;

//     // Fetch data from Foursquare API V3
//     const response = await fetch(foursquareUrl, {
//       method: 'GET',
//       headers: {
//         'Authorization': apiKey,  // Use the API key in the headers for V3
//         'Accept': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     // console.log('Foursquare API V3 Response:', data);

//     // Parse the response according to V3 structure
//     if (data && data.results) {
//       const locations = data.results.map((place) => ({
//         id: place.fsq_id,
//         name: place.name,
//         latitude: place.geocodes.main.latitude,
//         longitude: place.geocodes.main.longitude,
//       }));

//       return locations;
//     } else {
//       throw new Error('Unexpected response structure from Foursquare API');
//     }
//   } catch (error) {
//     console.error('Error fetching locations from Foursquare API:', error);
//     Alert.alert('Error', 'Failed to fetch nearby locations.');
//     return [];
//   }
// };



// // Function to get the public IP address
// const getPublicIP = async () => {
//   try {
//     const response = await fetch('https://api.ipify.org?format=json');
//     const data = await response.json();
//     return data.ip;
//   } catch (error) {
//     console.error('Error fetching public IP address:', error);
//     return null;
//   }
// };

// // Function to check if the IP is using a VPN
// const checkVPN = async (ip) => {
//   try {
//     const apiKey = 'afcd3ed0346eab';
//     const url = `https://ipinfo.io/${ip}?token=${apiKey}`;
//     const response = await fetch(url);
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     const isVPN = data.bogon || false;

//     console.log(`Is VPN: ${isVPN}`); 

//     return isVPN;
//   } catch (error) {
//     console.error('Error checking VPN status:', error.message);
//     return false;
//   }
// };

// const DynamicLocationSuggestions = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [nearbyLocations, setNearbyLocations] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [checkInTime, setCheckInTime] = useState(null);
//   const [isVPN, setIsVPN] = useState(false);

//   const getLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
//       return;
//     }

//     let location = await Location.getCurrentPositionAsync({
//       accuracy: Location.Accuracy.Highest,
//     });

//     setCurrentLocation(location.coords);

//     // Fetch nearby locations using the Foursquare API
//     const locations = await fetchNearbyLocations(location.coords.latitude, location.coords.longitude);
//     setNearbyLocations(locations);

//     // Get public IP address and check for VPN
//     const ip = await getPublicIP();
//     if (ip) {
//       const vpnStatus = await checkVPN(ip);
//       setIsVPN(vpnStatus);
//     } else {
//       console.error('Unable to fetch public IP address');
//     }
//   };

//   useEffect(() => {
//     getLocation();
//   }, []);

//   // Handle location selection
//   const handleLocationSelect = (location) => {
//     setSelectedLocation(location);
//     setCheckInTime(null); // Reset check-in time when a new location is selected
//   };

//   // Handle check-in action
//   const handleCheckIn = () => {
//     const currentTime = new Date();
//     setCheckInTime(currentTime.toLocaleString()); // Set check-in time
//     Alert.alert('Checked In', `Checked in at ${selectedLocation.name} on ${currentTime.toLocaleString()}`);
//   };

//   return (
//     <View style={styles.container}>
//       {currentLocation && (
//         <MapView
//           style={styles.map}
//           mapType="hybrid"
//           initialRegion={{
//             latitude: currentLocation.latitude,
//             longitude: currentLocation.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//           showsUserLocation={true}
//           showsMyLocationButton={true}
//         >
//           {nearbyLocations.map((location) => (
//             <Marker
//               key={location.id}
//               coordinate={{ latitude: location.latitude, longitude: location.longitude }}
//               title={location.name}
//             />
//           ))}
//         </MapView>
//       )}
//       <View style={styles.listContainer}>
//         <Text style={styles.heading}>Nearby Places:</Text>
//         <FlatList
//           data={nearbyLocations}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.listItem}>
//               <Text onPress={() => handleLocationSelect(item)}>{item.name}</Text>
//             </View>
//           )}
//         />
//         {selectedLocation && (
//           <>
//             <Button title={`Check-In`} onPress={handleCheckIn} />
//             {checkInTime && console.log("Checked in at: ", checkInTime)}
//           </>
//         )}
//         <Button title="Refresh Location" onPress={getLocation} />
//         {isVPN && <Text style={styles.vpnWarning}>VPN detected. Your IP address may be hidden.</Text>}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height / 2, // Adjust the height of the map as needed
//   },
//   listContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
//   listItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   vpnWarning: {
//     color: 'red',
//     marginTop: 10,
//   },
// });

// export default DynamicLocationSuggestions;

