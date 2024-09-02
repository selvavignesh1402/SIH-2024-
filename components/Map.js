// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Button } from 'react-native';
// import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps';
// import * as Location from 'expo-location';
// import * as geolib from 'geolib';

// const Map = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [manualLocation, setManualLocation] = useState(null); // State for manual location

//   const center = { latitude: 11.048585818309306, longitude: 76.98050339975696 };

//   const polygonCoords = [
//     { latitude: center.latitude + 0.0018, longitude: center.longitude + 0.002 }, // Top right
//     { latitude: center.latitude + 0.0018, longitude: center.longitude - 0.002 }, // Top left
//     { latitude: center.latitude - 0.0018, longitude: center.longitude - 0.002 }, // Bottom left
//     { latitude: center.latitude - 0.0018, longitude: center.longitude + 0.002 }, // Bottom right
//   ];

//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();

//       if (status === 'granted') {
//         getCurrentLocation();
//       } else {
//         console.log('Location permission denied');
//       }
//     };

//     const getCurrentLocation = async () => {
//       const location = await Location.getCurrentPositionAsync({});

//       if (location) {
//         const { coords: { latitude, longitude } } = location;
//         setCurrentLocation({ latitude, longitude });

//         // Check if the current location is within the polygon
//         const isInPolygon = geolib.isPointInPolygon(
//           { latitude, longitude },
//           polygonCoords
//         );
//         console.log('Is the user inside the polygon?', isInPolygon);
//       } else {
//         console.log('Unable to retrieve location');
//       }
//     };

//     requestLocationPermission();
//   }, []);

//   // Function to set a manual location for testing
//   const setTestLocation = () => {
//     const testLocation = { latitude: 11.089, longitude: 76.981 }; 
//     setManualLocation(testLocation);


//     const isInPolygon = geolib.isPointInPolygon(
//       testLocation,
//       polygonCoords
//     );
//     console.log('Is the test location inside the polygon?', isInPolygon);
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={{
//           latitude: center.latitude,
//           longitude: center.longitude,
//           latitudeDelta: 0.015,
//           longitudeDelta: 0.0121,
//         }}
//       >
//         <Polygon
//           coordinates={polygonCoords}
//           strokeColor="#F00"
//           fillColor="rgba(255,0,0,0.3)"
//           strokeWidth={1}
//         />
//         {currentLocation && (
//           <Marker
//             coordinate={currentLocation}
//             title={"Your Location"}
//           />
//         )}
//         {manualLocation && (
//           <Marker
//             coordinate={manualLocation}
//             title={"Manual Location"}
//             pinColor="blue" // Different color to distinguish
//           />
//         )}
//       </MapView>
//       <Button title="Set Test Location" onPress={setTestLocation} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end', // Ensure the button is at the bottom
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default Map;

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import * as geolib from 'geolib';
import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';
import ManualCheck from './ManualCheck';

const polygonCoords = [
  { latitude: 10.926485799543615, longitude: 76.92540093858133 },
  { latitude: 10.92648389992211, longitude: 76.92536155700793 },
  { latitude: 10.926478219352054, longitude: 76.92532255470209 },
  { latitude: 10.926468812540657, longitude: 76.9252843072788 },
  { latitude: 10.926455770081006, longitude: 76.92524718308297 },
  { latitude: 10.926439217579587, longitude: 76.9252115396421 },
  { latitude: 10.926419314446607, longitude: 76.92517772022295 },
  { latitude: 10.92639625236077, longitude: 76.9251460505257 },
  { latitude: 10.926370253423283, longitude: 76.92511683554731 },
  { latitude: 10.926341568018856, longitude: 76.92509035664413 },
  { latitude: 10.926310472404353, longitude: 76.92506686882234 },
  { latitude: 10.92627726604825, longitude: 76.92504659828205 },
  { latitude: 10.926242268746561, longitude: 76.92502974023894 },
  { latitude: 10.926205817543005, longitude: 76.92501645704422 },
  { latitude: 10.926168263483065, longitude: 76.92500687662114 },
  { latitude: 10.926129968233223, longitude: 76.92500109123311 },
  { latitude: 10.926091300597877, longitude: 76.92499915659512 },
  { latitude: 10.926052632967568, longitude: 76.92500109133731 },
  { latitude: 10.926014337732644, longitude: 76.9250068768255 },
  { latitude: 10.925976783696935, longitude: 76.9250164573409 },
  { latitude: 10.925940332525983, longitude: 76.92502974061655 },
  { latitude: 10.925905335264023, longitude: 76.92504659872608 },
  { latitude: 10.925872128953246, longitude: 76.92506686931571 },
  { latitude: 10.925841033387925, longitude: 76.9250903571679 },
  { latitude: 10.925812348034649, longitude: 76.92511683608134 },
  { latitude: 10.925786349148307, longitude: 76.92514605104947 },
  { latitude: 10.925763287111653, longitude: 76.92517772071632 },
  { latitude: 10.925743384023999, longitude: 76.92521154008614 },
  { latitude: 10.925726831562312, longitude: 76.9252471834606 },
  { latitude: 10.925713789135262, longitude: 76.92528430757548 },
  { latitude: 10.925704382348094, longitude: 76.92532255490644 },
  { latitude: 10.925698701792957, longitude: 76.9253615571121 },
  { latitude: 10.925696802176487, longitude: 76.92540093858133 },
  { latitude: 10.925698701792957, longitude: 76.92544032005055 },
  { latitude: 10.925704382348094, longitude: 76.92547932225624 },
  { latitude: 10.925713789135262, longitude: 76.92551756958719 },
  { latitude: 10.925726831562312, longitude: 76.92555469370207 },
  { latitude: 10.925743384023999, longitude: 76.92559033707653 },
  { latitude: 10.925763287111653, longitude: 76.92562415644635 },
  { latitude: 10.925786349148307, longitude: 76.9256558261132 },
  { latitude: 10.925812348034649, longitude: 76.92568504108132 },
  { latitude: 10.925841033387925, longitude: 76.92571151999476 },
  { latitude: 10.925872128953246, longitude: 76.92573500784695 },
  { latitude: 10.925905335264023, longitude: 76.92575527843658 },
  { latitude: 10.925940332525983, longitude: 76.92577213654612 },
  { latitude: 10.925976783696935, longitude: 76.92578541982176 },
  { latitude: 10.926014337732644, longitude: 76.92579500033716 },
  { latitude: 10.926052632967568, longitude: 76.92580078582536 },
  { latitude: 10.926091300597877, longitude: 76.92580272056753 },
  { latitude: 10.926129968233223, longitude: 76.92580078592955 },
  { latitude: 10.926168263483065, longitude: 76.92579500054153 },
  { latitude: 10.926205817543005, longitude: 76.92578542011844 },
  { latitude: 10.926242268746561, longitude: 76.92577213692373 },
  { latitude: 10.92627726604825, longitude: 76.92575527888062 },
  { latitude: 10.926310472404353, longitude: 76.92573500834033 },
  { latitude: 10.926341568018856, longitude: 76.92571152051853 },
  { latitude: 10.926370253423283, longitude: 76.92568504161535 },
  { latitude: 10.92639625236077, longitude: 76.92565582663697 },
  { latitude: 10.926419314446607, longitude: 76.92562415693973 },
  { latitude: 10.926439217579587, longitude: 76.92559033752056 },
  { latitude: 10.926455770081006, longitude: 76.9255546940797 },
  { latitude: 10.926468812540657, longitude: 76.92551756988387 },
  { latitude: 10.926478219352054, longitude: 76.92547932246059 },
  { latitude: 10.92648389992211, longitude: 76.92544032015475 },
  { latitude: 10.926485799543615, longitude: 76.92540093858133 },
];

// const Map = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [manualLocation, setManualLocation] = useState(null);
//   const [entryTime, setEntryTime] = useState(null);
//   const [hasChecked, setHasChecked] = useState(false);
//   const [accelerometerData, setAccelerometerData] = useState({});
//   const [gyroscopeData, setGyroscopeData] = useState({});
//   const [magnetometerData, setMagnetometerData] = useState(null);
//   const [stepCount, setStepCount] = useState(0);
//   const [heading, setHeading] = useState(0);

//   const center = { latitude: 11.04860471121232, longitude: 76.98053638312406 };

//   useEffect(() => {
//     let locationSubscription;
//     let accelSubscription;
//     let gyroSubscription;
//     let magnetometerSubscription;

//     const requestLocationPermission = async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();

//       if (status === 'granted') {
//         locationSubscription = await Location.watchPositionAsync(
//           {
//             accuracy: Location.Accuracy.High,
//             timeInterval: 1000,
//             distanceInterval: 1,
//           },
//           (location) => {
//             if (location && !hasChecked) {
//               const { coords: { latitude, longitude } } = location;
//               setCurrentLocation({ latitude, longitude });

//               const isInPolygon = geolib.isPointInPolygon(
//                 { latitude, longitude },
//                 polygonCoords
//               );
//               console.log('Is the user inside the polygon?', isInPolygon);

//               if (isInPolygon && !entryTime) {
//                 const currentTime = new Date().toISOString();
//                 setEntryTime(currentTime);
//                 console.log('Entry time recorded:', currentTime);
//               }
//               setHasChecked(true);
//             }
//           }
//         );
//       } else {
//         console.log('Location permission denied');
//       }
//     };

//     const startSensors = () => {
//       accelSubscription = Accelerometer.addListener((data) => {
//         setAccelerometerData(data);
//         calculateStepCount(data);
//       });

//       gyroSubscription = Gyroscope.addListener((data) => {
//         setGyroscopeData(data);
//         updateHeading(data);
//       });

//       magnetometerSubscription = Magnetometer.addListener((data) => {
//         setMagnetometerData(data);
//         // console.log('Magnetometer Data:', data);
//       });

//       Accelerometer.setUpdateInterval(100); // 100ms
//       Gyroscope.setUpdateInterval(100); // 100ms
//       Magnetometer.setUpdateInterval(100); // 100ms
//     };

//     requestLocationPermission();
//     startSensors();

//     return () => {
//       if (locationSubscription) locationSubscription.remove();
//       if (accelSubscription) accelSubscription.remove();
//       if (gyroSubscription) gyroSubscription.remove();
//       if (magnetometerSubscription) magnetometerSubscription.remove();
//     };
//   }, [entryTime, hasChecked]);

//   const calculateStepCount = (accelerometerData) => {
//     const threshold = 1.2; // Adjust this threshold based on testing
//     if (accelerometerData.z > threshold) {
//       setStepCount((prevCount) => prevCount + 1);
//       console.log('Step detected! Total steps:', stepCount + 1);
//     }
//   };

//   const updateHeading = (gyroscopeData) => {
//     const { x, y, z } = gyroscopeData;
//     const deltaHeading = Math.sqrt(x * x + y * y + z * z); // Change in heading based on angular velocity
//     setHeading((prevHeading) => prevHeading + deltaHeading);
//   };

//   const setTestLocation = () => {
//     const testLocation = { latitude: 10.926058752319875, longitude: 76.92540367417263 };
//     setManualLocation(testLocation);

//     const isInPolygon = geolib.isPointInPolygon(
//       testLocation,
//       polygonCoords
//     );
//     console.log('Is the test location inside the polygon?', isInPolygon);

//     if (isInPolygon && !entryTime) {
//       const testEntryTime = new Date();
//       setEntryTime(testEntryTime.toISOString());
//       console.log('Entry time recorded for manual location:', new Date(testEntryTime).toLocaleString());
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         mapType="hybrid"
//         initialRegion={{
//           latitude: center.latitude,
//           longitude: center.longitude,
//           latitudeDelta: 0.015,
//           longitudeDelta: 0.0121,
//         }}
//       >
//         <Polygon
//           coordinates={polygonCoords}
//           strokeColor="#F00"
//           fillColor="rgba(255,0,0,0.3)"
//           strokeWidth={1}
//         />
//         {currentLocation && (
//           <Marker
//             coordinate={currentLocation}
//             title={"Your Location"}
//           />
//         )}
//         {manualLocation && (
//           <Marker
//             coordinate={manualLocation}
//             title={"Manual Location"}
//             pinColor="blue"
//           />
//         )}
//       </MapView>
//       <Button title="Set Test Location" onPress={setTestLocation} />
//       <Text>Step Count: {stepCount}</Text>
//       <Text>Heading: {heading}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default Map;

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [manualLocation, setManualLocation] = useState(null);
  const [entryTime, setEntryTime] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [accelerometerData, setAccelerometerData] = useState({});
  const [gyroscopeData, setGyroscopeData] = useState({});
  const [magnetometerData, setMagnetometerData] = useState({});
  const [stepCount, setStepCount] = useState(0);
  const [heading, setHeading] = useState(0);
  const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });

  const center = { latitude: 10.928549250240643, longitude: 76.92494883585357 };
  // 10.928549250240643, 76.92494883585357
  const [region, setRegion] = useState({
    latitude: 10.928549250240643,
    longitude: 76.92494883585357,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    let locationSubscription;
    let accelSubscription;
    let gyroSubscription;
    let magnetometerSubscription;

    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (location) => {
            if (location && !hasChecked) {
              const { coords: { latitude, longitude } } = location;
              setCurrentLocation({ latitude, longitude });
              setCurrentPosition({ latitude, longitude });

              const isInPolygon = geolib.isPointInPolygon(
                { latitude, longitude },
                polygonCoords
              );
              //console.log('Is the user inside the polygon?', isInPolygon);

              if (isInPolygon && !entryTime) {
                const currentTime = new Date().toISOString();
                setEntryTime(currentTime);
                console.log('Entry time recorded:', currentTime);
              }
              setHasChecked(true);
            }
          }
        );
      } else {
        console.log('Location permission denied');
      }
    };

    const startSensors = () => {
      Accelerometer.setUpdateInterval(100);
      Gyroscope.setUpdateInterval(100);
      Magnetometer.setUpdateInterval(100);

      accelSubscription = Accelerometer.addListener((data) => {
        setAccelerometerData(data);
        calculateStepCount(data);
      });

      gyroSubscription = Gyroscope.addListener((data) => {
        setGyroscopeData(data);
        updateHeading(data);
      });

      magnetometerSubscription = Magnetometer.addListener((data) => {
        setMagnetometerData(data);
        calculateHeading(data);
      });
    };

    requestLocationPermission();
    startSensors();


    return () => {
      if (locationSubscription) locationSubscription.remove();
      if (accelSubscription) accelSubscription.remove();
      if (gyroSubscription) gyroSubscription.remove();
      if (magnetometerSubscription) magnetometerSubscription.remove();
    };
  }, [entryTime, hasChecked,heading, currentPosition]);

  const applyLowPassFilter = (data, prevData) => {
    const alpha = 0.1; // Smoothing factor
    return prevData + alpha * (data - prevData);
  };

  const calculateStepCount = (accelerometerData) => {
    const threshold = 1.2; // Adjust this threshold based on testing
    if (accelerometerData.z > threshold) {
      setStepCount((prevCount) => prevCount + 1);
      updatePosition();
      console.log('Step detected! Total steps:', stepCount + 1);
    }
  };

  const updateHeading = (gyroscopeData) => {
    const { x, y, z } = gyroscopeData;
    const deltaHeading = Math.sqrt(x * x + y * y + z * z); // Change in heading based on angular velocity
    setHeading((prevHeading) => prevHeading + deltaHeading);
  };

  const calculateHeading = (magnetometerData) => {
    const { x, y } = magnetometerData;
    let angle = Math.atan2(y, x) * (180 / Math.PI); // Convert radians to degrees
    if (angle < 0) {
      angle += 360;
    }
    setHeading((prevHeading) => 0.98 * prevHeading + 0.02 * angle); // Complementary filter
  };

  const updatePosition = () => {
    const stepLength = 0.7;
    const headingInRadians = heading * (Math.PI / 180);

    const deltaLatitude = (stepLength * Math.cos(headingInRadians)) / 111320;
    const deltaLongitude = (stepLength * Math.sin(headingInRadians)) / (111320 * Math.cos(currentPosition.latitude * (Math.PI / 180)));

    const newLatitude = currentPosition.latitude + deltaLatitude;
    const newLongitude = currentPosition.longitude + deltaLongitude;

    const filteredLatitude = applyLowPassFilter(newLatitude, currentPosition.latitude);
    const filteredLongitude = applyLowPassFilter(newLongitude, currentPosition.longitude);
   
    setCurrentPosition({ latitude: filteredLatitude, longitude: filteredLongitude });

    
    console.log('Updated Position:', newLatitude, newLongitude);
    const distanceToStart = geolib.getDistance(
      { latitude: filteredLatitude, longitude: filteredLongitude },
      center
    );

    if (distanceToStart < 1) { 
      setCurrentPosition(center);
      setStepCount(0);
      console.log('Returned to the starting position.');
    }
  };

  const setTestLocation = () => {
    const testLocation = { latitude: 10.926058752319875, longitude: 76.92540367417263 };
    setManualLocation(testLocation);

    const isInPolygon = geolib.isPointInPolygon(
      testLocation,
      polygonCoords
    );
    console.log('Is the test location inside the polygon?', isInPolygon);

    if (isInPolygon && !entryTime) {
      const testEntryTime = new Date();
      setEntryTime(testEntryTime.toISOString());
      console.log('Entry time recorded for manual location:', new Date(testEntryTime).toLocaleString());
    }
  };


  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // Use Google Maps
        style={styles.map}
        mapType="satellite" // Set map type to satellite for 3D terrain
        initialRegion={region}
       
        showsBuildings={true} // Show 3D buildings
        showsTraffic={true}   // Optional: Show traffic
        onRegionChangeComplete={(region) => setRegion(region)}
        camera={{
          center: { latitude: 10.928549250240643, longitude: 76.92494883585357 }, // Your coordinates
          pitch: 45,  // Tilt angle (0-90), 45 is a good default for 3D effect
          heading: 0, // Heading in degrees (0-360), 0 is North
          altitude: 500, // Altitude of the camera
          zoom: 18, // Zoom level, closer for 3D effect
        }}
      >
        <Polygon
          coordinates={polygonCoords}
          strokeColor="#F00"
          fillColor="rgba(255,0,0,0.3)"
          strokeWidth={1}
        />
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title={"Your Location"}
          />
        )}
        {manualLocation && (
          <Marker
            coordinate={manualLocation}
            title={"Manual Location"}
            pinColor="blue"
          />
        )}
        {currentPosition && (
          <Marker
            coordinate={currentPosition}
            title={"Tracked Position"}
            pinColor="green"
          />
        )}
      </MapView>
      <Button title="Set Test Location" onPress={setTestLocation} />
      <Text>Step Count: {stepCount}</Text>
      <Text>Heading: {heading.toFixed(2)}°</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  map: {
    flex: 1,
  },
});

export default Map;