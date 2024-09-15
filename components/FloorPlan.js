// import React, { useState, useEffect } from 'react';
// import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';
// import { View, StyleSheet, Image } from 'react-native';
// import Svg, { Circle } from 'react-native-svg';
// import * as Location from 'expo-location';
// import geolib from 'geolib';

// const IndoorNavigation = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [accelerometerData, setAccelerometerData] = useState({});
//   const [gyroscopeData, setGyroscopeData] = useState({});
//   const [magnetometerData, setMagnetometerData] = useState({});
//   const [stepCount, setStepCount] = useState(0);
//   const [heading, setHeading] = useState(0);
//   const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });

//   const center = { latitude: 10.928549250240643, longitude: 76.92494883585357 };
  
//   // Define points with their coordinates
//   const points = {
//     class1: { latitude: 10.9283, longitude: 76.9250 },
//     class2: { latitude: 10.9275, longitude: 76.9260 }
//   };

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
//             timeInterval: 10000,
//             distanceInterval: 10,
//           },
//           (location) => {
//             if (location) {
//               const { coords: { latitude, longitude } } = location;
//               setCurrentLocation({ latitude, longitude });
//               setCurrentPosition({ latitude, longitude });
//             }
//           }
//         );
//       } else {
//         console.log('Location permission denied');
//       }
//     };

//     const startSensors = () => {
//       Accelerometer.setUpdateInterval(1000);
//       Gyroscope.setUpdateInterval(1000);
//       Magnetometer.setUpdateInterval(1000);

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
//         calculateHeading(data);
//       });
//     };

//     requestLocationPermission();
//     startSensors();

//     return () => {
//       if (locationSubscription) locationSubscription.remove();
//       if (accelSubscription) accelSubscription.remove();
//       if (gyroSubscription) gyroSubscription.remove();
//       if (magnetometerSubscription) magnetometerSubscription.remove();
//     };
//   }, [heading, currentPosition]);

//   const applyLowPassFilter = (data, prevData) => {
//     const alpha = 0.1;
//     return prevData + alpha * (data - prevData);
//   };

//   const calculateStepCount = (accelerometerData) => {
//     const threshold = 1.2;
//     if (accelerometerData.z > threshold) {
//       setStepCount((prevCount) => prevCount + 1);
//       updatePosition();
//       console.log('Step detected! Total steps:', stepCount + 1);
//     }
//   };

//   const updateHeading = (gyroscopeData) => {
//     const { x, y, z } = gyroscopeData;
//     const deltaHeading = Math.sqrt(x * x + y * y + z * z);
//     setHeading((prevHeading) => prevHeading + deltaHeading);
//   };

//   const calculateHeading = (magnetometerData) => {
//     const { x, y } = magnetometerData;
//     let angle = Math.atan2(y, x) * (180 / Math.PI);
//     if (angle < 0) {
//       angle += 360;
//     }
//     setHeading((prevHeading) => 0.98 * prevHeading + 0.02 * angle);
//   };

//   const updatePosition = () => {
//     const stepLength = 0.7;
//     const headingInRadians = heading * (Math.PI / 180);

//     const deltaLatitude = (stepLength * Math.cos(headingInRadians)) / 111320;
//     const deltaLongitude = (stepLength * Math.sin(headingInRadians)) / (111320 * Math.cos(currentPosition.latitude * (Math.PI / 180)));

//     const newLatitude = currentPosition.latitude + deltaLatitude;
//     const newLongitude = currentPosition.longitude + deltaLongitude;

//     const filteredLatitude = applyLowPassFilter(newLatitude, currentPosition.latitude);
//     const filteredLongitude = applyLowPassFilter(newLongitude, currentPosition.longitude);

//     setCurrentPosition({ latitude: filteredLatitude, longitude: filteredLongitude });

//     console.log('Updated Position:', newLatitude, newLongitude);
//     const distanceToStart = geolib.getDistance(
//       { latitude: filteredLatitude, longitude: filteredLongitude },
//       center
//     );

//     if (distanceToStart < 1) {
//       setCurrentPosition(center);
//       setStepCount(0);
//       console.log('Returned to the starting position.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require('../assets/images/floorplan.jpg')} style={styles.floorplan} resizeMode="contain" />
//       <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
//         {/* Display the current position */}
//         <Circle
//           cx={(currentPosition.longitude - center.longitude) * 1000} // Convert to image coordinates
//           cy={(center.latitude - currentPosition.latitude) * 1000} // Convert to image coordinates
//           r="10"
//           fill="red"
//         />
//         {/* Display the predefined points */}
//         {Object.keys(points).map((key) => {
//           const { latitude, longitude } = points[key];
//           return (
//             <Circle
//               key={key}
//               cx={(longitude - center.longitude) * 1000} // Convert to image coordinates
//               cy={(center.latitude - latitude) * 1000} // Convert to image coordinates
//               r="10"
//               fill="blue"
//             />
//           );
//         })}
//       </Svg>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   floorplan: {
//     width: '100%',
//     height: '100%',
//   },
// });

// export default IndoorNavigation;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://app.mappedin.com/map/66dc9e845ef57f000ca2389d?embedded=true' }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
