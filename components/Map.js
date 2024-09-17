// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Button, Text } from 'react-native';
// import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps';
// import * as Location from 'expo-location';
// import * as geolib from 'geolib';
// import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';

// const polygonCoords = [
//   { latitude: 10.926485799543615, longitude: 76.92540093858133 },
//   { latitude: 10.92648389992211, longitude: 76.92536155700793 },
//   { latitude: 10.926478219352054, longitude: 76.92532255470209 },
//   { latitude: 10.926468812540657, longitude: 76.9252843072788 },
//   { latitude: 10.926455770081006, longitude: 76.92524718308297 },
//   { latitude: 10.926439217579587, longitude: 76.9252115396421 },
//   { latitude: 10.926419314446607, longitude: 76.92517772022295 },
//   { latitude: 10.92639625236077, longitude: 76.9251460505257 },
//   { latitude: 10.926370253423283, longitude: 76.92511683554731 },
//   { latitude: 10.926341568018856, longitude: 76.92509035664413 },
//   { latitude: 10.926310472404353, longitude: 76.92506686882234 },
//   { latitude: 10.92627726604825, longitude: 76.92504659828205 },
//   { latitude: 10.926242268746561, longitude: 76.92502974023894 },
//   { latitude: 10.926205817543005, longitude: 76.92501645704422 },
//   { latitude: 10.926168263483065, longitude: 76.92500687662114 },
//   { latitude: 10.926129968233223, longitude: 76.92500109123311 },
//   { latitude: 10.926091300597877, longitude: 76.92499915659512 },
//   { latitude: 10.926052632967568, longitude: 76.92500109133731 },
//   { latitude: 10.926014337732644, longitude: 76.9250068768255 },
//   { latitude: 10.925976783696935, longitude: 76.9250164573409 },
//   { latitude: 10.925940332525983, longitude: 76.92502974061655 },
//   { latitude: 10.925905335264023, longitude: 76.92504659872608 },
//   { latitude: 10.925872128953246, longitude: 76.92506686931571 },
//   { latitude: 10.925841033387925, longitude: 76.9250903571679 },
//   { latitude: 10.925812348034649, longitude: 76.92511683608134 },
//   { latitude: 10.925786349148307, longitude: 76.92514605104947 },
//   { latitude: 10.925763287111653, longitude: 76.92517772071632 },
//   { latitude: 10.925743384023999, longitude: 76.92521154008614 },
//   { latitude: 10.925726831562312, longitude: 76.9252471834606 },
//   { latitude: 10.925713789135262, longitude: 76.92528430757548 },
//   { latitude: 10.925704382348094, longitude: 76.92532255490644 },
//   { latitude: 10.925698701792957, longitude: 76.9253615571121 },
//   { latitude: 10.925696802176487, longitude: 76.92540093858133 },
//   { latitude: 10.925698701792957, longitude: 76.92544032005055 },
//   { latitude: 10.925704382348094, longitude: 76.92547932225624 },
//   { latitude: 10.925713789135262, longitude: 76.92551756958719 },
//   { latitude: 10.925726831562312, longitude: 76.92555469370207 },
//   { latitude: 10.925743384023999, longitude: 76.92559033707653 },
//   { latitude: 10.925763287111653, longitude: 76.92562415644635 },
//   { latitude: 10.925786349148307, longitude: 76.9256558261132 },
//   { latitude: 10.925812348034649, longitude: 76.92568504108132 },
//   { latitude: 10.925841033387925, longitude: 76.92571151999476 },
//   { latitude: 10.925872128953246, longitude: 76.92573500784695 },
//   { latitude: 10.925905335264023, longitude: 76.92575527843658 },
//   { latitude: 10.925940332525983, longitude: 76.92577213654612 },
//   { latitude: 10.925976783696935, longitude: 76.92578541982176 },
//   { latitude: 10.926014337732644, longitude: 76.92579500033716 },
//   { latitude: 10.926052632967568, longitude: 76.92580078582536 },
//   { latitude: 10.926091300597877, longitude: 76.92580272056753 },
//   { latitude: 10.926129968233223, longitude: 76.92580078592955 },
//   { latitude: 10.926168263483065, longitude: 76.92579500054153 },
//   { latitude: 10.926205817543005, longitude: 76.92578542011844 },
//   { latitude: 10.926242268746561, longitude: 76.92577213692373 },
//   { latitude: 10.92627726604825, longitude: 76.92575527888062 },
//   { latitude: 10.926310472404353, longitude: 76.92573500834033 },
//   { latitude: 10.926341568018856, longitude: 76.92571152051853 },
//   { latitude: 10.926370253423283, longitude: 76.92568504161535 },
//   { latitude: 10.92639625236077, longitude: 76.92565582663697 },
//   { latitude: 10.926419314446607, longitude: 76.92562415693973 },
//   { latitude: 10.926439217579587, longitude: 76.92559033752056 },
//   { latitude: 10.926455770081006, longitude: 76.9255546940797 },
//   { latitude: 10.926468812540657, longitude: 76.92551756988387 },
//   { latitude: 10.926478219352054, longitude: 76.92547932246059 },
//   { latitude: 10.92648389992211, longitude: 76.92544032015475 },
//   { latitude: 10.926485799543615, longitude: 76.92540093858133 },

//     // { "latitude": 10.928683341133276, "longitude": 76.92491082824739 },
//     // { "latitude": 10.928682155467547, "longitude": 76.9248862476923 },
//     // { "latitude": 10.928678609888994, "longitude": 76.924861903862 },
//     // { "latitude": 10.928672738543565, "longitude": 76.92483803120139 },
//     // { "latitude": 10.92866459797566, "longitude": 76.9248148596178 },
//     // { "latitude": 10.92865426658358, "longitude": 76.9247926122667 },
//     // { "latitude": 10.928641843864503, "longitude": 76.92477150340261 },
//     // { "latitude": 10.928627449456258, "longitude": 76.9247517363157 },
//     // { "latitude": 10.928611221985141, "longitude": 76.92473350137399 },
//     // { "latitude": 10.928593317730856, "longitude": 76.92471697419002 },
//     // { "latitude": 10.928573909121447, "longitude": 76.92470231392954 },
//     // { "latitude": 10.92855318307271, "longitude": 76.9246896617787 },
//     // { "latitude": 10.928531339188078, "longitude": 76.92467913958431 },
//     // { "latitude": 10.928508587836319, "longitude": 76.92467084868053 },
//     // { "latitude": 10.92848514812558, "longitude": 76.92466486891286 },
//     // { "latitude": 10.928461245793216, "longitude": 76.92466125786915 },
//     // { "latitude": 10.928437111031842, "longitude": 76.92466005032522 },
//     // { "latitude": 10.928412976272432, "longitude": 76.92466125790975 },
//     // { "latitude": 10.928389073945883, "longitude": 76.9246648689925 },
//     // { "latitude": 10.928365634244582, "longitude": 76.92467084879615 },
//     // { "latitude": 10.928342882905532, "longitude": 76.92467913973147 },
//     // { "latitude": 10.92832103903638, "longitude": 76.92468966195172 },
//     // { "latitude": 10.928300313005304, "longitude": 76.92470231412179 },
//     // { "latitude": 10.92828090441506, "longitude": 76.92471697439412 },
//     // { "latitude": 10.928263000180705, "longitude": 76.9247335015821 },
//     // { "latitude": 10.928246772729517, "longitude": 76.9247517365198 },
//     // { "latitude": 10.928232378340436, "longitude": 76.92477150359485 },
//     // { "latitude": 10.92821995563902, "longitude": 76.92479261243973 },
//     // { "latitude": 10.928209624262422, "longitude": 76.92481485976495 },
//     // { "latitude": 10.928201483707223, "longitude": 76.924838031317 },
//     // { "latitude": 10.928195612371232, "longitude": 76.9248619039416 },
//     // { "latitude": 10.928192066798497, "longitude": 76.9248862477329 },
//     // { "latitude": 10.928190881134729, "longitude": 76.92491082824739 },
//     // { "latitude": 10.928192066798497, "longitude": 76.92493540876188 },
//     // { "latitude": 10.928195612371232, "longitude": 76.92495975255318 },
//     // { "latitude": 10.928201483707223, "longitude": 76.92498362517779 },
//     // { "latitude": 10.928209624262422, "longitude": 76.92500679672983 },
//     // { "latitude": 10.92821995563902, "longitude": 76.92502904405505 },
//     // { "latitude": 10.928232378340436, "longitude": 76.92505015289993 },
//     // { "latitude": 10.928246772729517, "longitude": 76.92506991997499 },
//     // { "latitude": 10.928263000180705, "longitude": 76.92508815491269 },
//     // { "latitude": 10.92828090441506, "longitude": 76.92510468210067 },
//     // { "latitude": 10.928300313005304, "longitude": 76.925119342373 },
//     // { "latitude": 10.92832103903638, "longitude": 76.92513199454308 },
//     // { "latitude": 10.928342882905532, "longitude": 76.92514251676332 },
//     // { "latitude": 10.928365634244582, "longitude": 76.92515080769863 },
//     // { "latitude": 10.928389073945883, "longitude": 76.92515678750229 },
//     // { "latitude": 10.928412976272432, "longitude": 76.92516039858504 },
//     // { "latitude": 10.928437111031842, "longitude": 76.92516160616957 },
//     // { "latitude": 10.928461245793216, "longitude": 76.92516039862564 },
//     // { "latitude": 10.92848514812558, "longitude": 76.92515678758193 },
//     // { "latitude": 10.928508587836319, "longitude": 76.92515080781425 },
//     // { "latitude": 10.928531339188078, "longitude": 76.92514251691047 },
//     // { "latitude": 10.92855318307271, "longitude": 76.9251319947161 },
//     // { "latitude": 10.928573909121447, "longitude": 76.92511934256524 },
//     // { "latitude": 10.928593317730856, "longitude": 76.92510468230476 },
//     // { "latitude": 10.928611221985141, "longitude": 76.92508815512079 },
//     // { "latitude": 10.928627449456258, "longitude": 76.92506992017908 },
//     // { "latitude": 10.928641843864503, "longitude": 76.92505015309217 },
//     // { "latitude": 10.92865426658358, "longitude": 76.92502904422808 },
//     // { "latitude": 10.92866459797566, "longitude": 76.92500679687699 },
//     // { "latitude": 10.928672738543565, "longitude": 76.9249836252934 },
//     // { "latitude": 10.928678609888994, "longitude": 76.9249597526328 },
//     // { "latitude": 10.928682155467547, "longitude": 76.92493540880248 },
//     // { "latitude": 10.928683341133276, "longitude": 76.92491082824739 }  
// ];


// const Map = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [manualLocation, setManualLocation] = useState(null);
//   const [entryTime, setEntryTime] = useState(null);
//   const [hasChecked, setHasChecked] = useState(false);
//   const [accelerometerData, setAccelerometerData] = useState({});
//   const [gyroscopeData, setGyroscopeData] = useState({});
//   const [magnetometerData, setMagnetometerData] = useState({});
//   const [stepCount, setStepCount] = useState(0);
//   const [heading, setHeading] = useState(0);
//   const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });

//   const center = { latitude: 10.928549250240643, longitude: 76.92494883585357 };
  
//   const [region, setRegion] = useState({
//     latitude: 10.928549250240643,
//     longitude: 76.92494883585357,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });

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
//             accuracy: Location.Accuracy.BestForNavigation,
//             timeInterval: 10000,
//             distanceInterval: 10,
//           },
//           (location) => {
//             if (location && !hasChecked) {
//               const { coords: { latitude, longitude } } = location;
//               setCurrentLocation({ latitude, longitude });
//               setCurrentPosition({ latitude, longitude });

//               const isInPolygon = geolib.isPointInPolygon(
//                 { latitude, longitude },
//                 polygonCoords
//               );
//               console.log('Is the user inside the polygon?', isInPolygon);

//               if (isInPolygon && !entryTime) {
//                 const currentTime = new Date().toISOString();
//                 setEntryTime(currentTime);
//                 // console.log('Entry time recorded:', currentTime);
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
//   }, [entryTime,heading, currentPosition]);

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

//   const setTestLocation = () => {
//     const testLocation = { latitude: 10.926264683573066, longitude:  76.92487742683454 };
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
//         mapType="satellite" 
//         initialRegion={region}
//         showsUserLocation={true}
//         showsMyLocationButton={true}
//         showsBuildings={true}
//         showsTraffic={true}  
//         onRegionChangeComplete={(region) => setRegion(region)}
//         camera={{
//           center: { latitude: 10.928549250240643, longitude: 76.92494883585357 },
//           pitch: 95, 
//           heading: 0, 
//           altitude: 500, 
//           zoom: 18,
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
//         {currentPosition && (
//           <Marker
//             coordinate={currentPosition}
//             title={"Tracked Position"}
//             pinColor="green"
//           />
//         )}
//       </MapView>
//       <Button title="Set Test Location" onPress={setTestLocation} />
//       <Text>Step Count: {stepCount}</Text>
//       <Text>Heading: {heading.toFixed(2)}°</Text>
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

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import * as geolib from 'geolib';
import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';

const polygonCoords = [
  { latitude: 11.049065781195477, longitude: 76.98047419614151 },
  { latitude: 11.04906361573629, longitude: 76.98042928477177 },
  { latitude: 11.04905714021338, longitude: 76.98038480592504 },
  { latitude: 11.049046416989853, longitude: 76.98034118795883 },
  { latitude: 11.049031549336677, longitude: 76.98029885093975 },
  { latitude: 11.049012680438093, longitude: 76.98025820259795 },
  { latitude: 11.048989992012661, longitude: 76.98021963440048 },
  { latitude: 11.048963702563181, longitude: 76.98018351778107 },
  { latitude: 11.04893406527235, longitude: 76.98015020056309 },
  { latitude: 11.048901365564449, longitude: 76.98012000360974 },
  { latitude: 11.04886591835651, longitude: 76.98009321773402 },
  { latitude: 11.048828065025456, longitude: 76.98007010089798 },
  { latitude: 11.048788170120412, longitude: 76.98005087572842 },
  { latitude: 11.048746617851874, longitude: 76.98003572737301 },
  { latitude: 11.048703808391522, longitude: 76.98002480171716 },
  { latitude: 11.048660154018322, longitude: 76.98001820397916 },
  { latitude: 11.048616075148027, longitude: 76.9800159976969 },
  { latitude: 11.048571996284355, longitude: 76.98001820411615 },
  { latitude: 11.048528341930764, longitude: 76.98002480198589 },
  { latitude: 11.048485532502257, longitude: 76.98003572776315 },
  { latitude: 11.048443980276577, longitude: 76.98005087622498 },
  { latitude: 11.048404085423751, longitude: 76.98007010148186 },
  { latitude: 11.048366232152274, longitude: 76.98009321838279 },
  { latitude: 11.04833078500898, longitude: 76.98012000429847 },
  { latitude: 11.04829808536831, longitude: 76.9801502012653 },
  { latitude: 11.048268448144709, longitude: 76.9801835184698 },
  { latitude: 11.048242158759873, longitude: 76.98021963504925 },
  { latitude: 11.048219470394018, longitude: 76.98025820318185 },
  { latitude: 11.048200601547654, longitude: 76.9802988514363 },
  { latitude: 11.048185733937332, longitude: 76.98034118834897 },
  { latitude: 11.048175010745652, longitude: 76.98038480619378 },
  { latitude: 11.04816853524235, longitude: 76.98042928490877 },
  { latitude: 11.048166369789787, longitude: 76.98047419614151 },
  { latitude: 11.04816853524235, longitude: 76.98051910737428 },
  { latitude: 11.048175010745652, longitude: 76.98056358608926 },
  { latitude: 11.048185733937332, longitude: 76.98060720393408 },
  { latitude: 11.048200601547654, longitude: 76.98064954084676 },
  { latitude: 11.048219470394018, longitude: 76.98069018910121 },
  { latitude: 11.048242158759873, longitude: 76.9807287572338 },
  { latitude: 11.048268448144709, longitude: 76.98076487381326 },
  { latitude: 11.04829808536831, longitude: 76.98079819101775 },
  { latitude: 11.04833078500898, longitude: 76.98082838798459 },
  { latitude: 11.048366232152274, longitude: 76.98085517390025 },
  { latitude: 11.048404085423751, longitude: 76.9808782908012 },
  { latitude: 11.048443980276577, longitude: 76.98089751605806 },
  { latitude: 11.048485532502257, longitude: 76.98091266451989 },
  { latitude: 11.048528341930764, longitude: 76.98092359029715 },
  { latitude: 11.048571996284355, longitude: 76.98093018816691 },
  { latitude: 11.048616075148027, longitude: 76.98093239458616 },
  { latitude: 11.048660154018322, longitude: 76.9809301883039 },
  { latitude: 11.048703808391522, longitude: 76.98092359056588 },
  { latitude: 11.048746617851874, longitude: 76.98091266491004 },
  { latitude: 11.048788170120412, longitude: 76.98089751655462 },
  { latitude: 11.048828065025456, longitude: 76.98087829138508 },
  { latitude: 11.04886591835651, longitude: 76.98085517454902 },
  { latitude: 11.048901365564449, longitude: 76.98082838867332 },
  { latitude: 11.04893406527235, longitude: 76.98079819171997 },
  { latitude: 11.048963702563181, longitude: 76.98076487450199 },
  { latitude: 11.048989992012661, longitude: 76.98072875788256 },
  { latitude: 11.049012680438093, longitude: 76.98069018968509 },
  { latitude: 11.049031549336677, longitude: 76.9806495413433 },
  { latitude: 11.049046416989853, longitude: 76.98060720432422 },
  { latitude: 11.04905714021338, longitude: 76.980563586358 },
  { latitude: 11.04906361573629, longitude: 76.98051910751127 },
  { latitude: 11.049065781195477, longitude: 76.98047419614151 },
];


const center = { latitude: 11.048736043278879, longitude: 76.9804565417652 };

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [manualLocation, setManualLocation] = useState(null);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stepCount, setStepCount] = useState(0);
  const [heading, setHeading] = useState(0);
  const [error, setError] = useState(null);

  const allowedCheckInTime = { start: "09:00", end: "19:52" };
  const allowedCheckOutTime = { start: "19:53", end: "19:55" };

  useEffect(() => {
    let locationSubscription;
    let accelSubscription;
    let gyroSubscription;
    let magnetometerSubscription;

    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 10000, distanceInterval: 10 },
        (location) => {
          try {
            const { latitude, longitude } = location.coords;
            setCurrentLocation({ latitude, longitude });

            const isInPolygon = geolib.isPointInPolygon({ latitude, longitude }, polygonCoords);
            if (isInPolygon) {
              if (!hasCheckedIn) {
                handleCheckIn(latitude, longitude);
              } else if (hasCheckedIn && !hasCheckedOut) {
                handleCheckOut(latitude, longitude);
              }
            }
          } catch (err) {
            console.error('Error processing location data:', err);
          }
        }
      );
    };

    const startSensors = () => {
      Accelerometer.setUpdateInterval(1000);
      Gyroscope.setUpdateInterval(1000);
      Magnetometer.setUpdateInterval(1000);

      accelSubscription = Accelerometer.addListener((data) => {
        try {
          calculateStepCount(data);
        } catch (err) {
          console.error('Error processing accelerometer data:', err);
        }
      });

      gyroSubscription = Gyroscope.addListener((data) => {
        try {
          updateHeading(data);
        } catch (err) {
          console.error('Error processing gyroscope data:', err);
        }
      });

      magnetometerSubscription = Magnetometer.addListener((data) => {
        try {
          calculateHeading(data);
        } catch (err) {
          console.error('Error processing magnetometer data:', err);
        }
      });
    };

    const handleCheckIn = (latitude, longitude) => {
      const now = new Date();
      const currentHourMinute = now.toTimeString().slice(0, 5);

      if (!hasCheckedIn && currentHourMinute >= allowedCheckInTime.start && currentHourMinute <= allowedCheckInTime.end) {
        setCheckInTime(now);
        setHasCheckedIn(true);
        console.log('Checked In:', now);
      }
    };

    const handleCheckOut = (latitude, longitude) => {
      const now = new Date();
      const currentHourMinute = now.toTimeString().slice(0, 5);

      if (hasCheckedIn && !hasCheckedOut) {
        if (currentHourMinute >= allowedCheckOutTime.start && currentHourMinute <= allowedCheckOutTime.end) {
          setCheckOutTime(now);
          setHasCheckedOut(true);
          console.log('Checked Out:', now);
        } else if (currentHourMinute < allowedCheckOutTime.start) {
          console.log('Check-out not allowed yet. Current time is before check-out window.');
        } else if (currentHourMinute > allowedCheckOutTime.end) {
          console.log('Check-out time window has passed.');
        }
      } else if (!hasCheckedIn) {
        console.log('Check-out not allowed. User has not checked in yet.');
      }
    };

    const updateTime = () => {
      setCurrentTime(new Date());
    };

    requestLocationPermission();
    startSensors();
    const timeInterval = setInterval(updateTime, 60000);

    return () => {
      if (locationSubscription) locationSubscription.remove();
      if (accelSubscription) accelSubscription.remove();
      if (gyroSubscription) gyroSubscription.remove();
      if (magnetometerSubscription) magnetometerSubscription.remove();
      clearInterval(timeInterval);
    };
  }, [hasCheckedIn, hasCheckedOut, heading]);

  const applyLowPassFilter = (data, prevData) => {
    const alpha = 0.1;
    return prevData + alpha * (data - prevData);
  };

  const calculateStepCount = (accelerometerData) => {
    try {
      const threshold = 1.2;
      if (accelerometerData.z > threshold) {
        setStepCount((prevCount) => prevCount + 1);
        updatePosition();
        console.log('Step detected! Total steps:', stepCount + 1);
      }
    } catch (err) {
      console.error('Error calculating step count:', err);
    }
  };

  const updateHeading = (gyroscopeData) => {
    try {
      const { x, y, z } = gyroscopeData;
      const deltaHeading = Math.sqrt(x * x + y * y + z * z);
      setHeading((prevHeading) => prevHeading + deltaHeading);
    } catch (err) {
      console.error('Error updating heading:', err);
    }
  };

  const calculateHeading = (magnetometerData) => {
    try {
      const { x, y } = magnetometerData;
      let angle = Math.atan2(y, x) * (180 / Math.PI);
      if (angle < 0) {
        angle += 360;
      }
      setHeading((prevHeading) => 0.98 * prevHeading + 0.02 * angle);
    } catch (err) {
      console.error('Error calculating heading:', err);
    }
  };

  const updatePosition = () => {
    try {
      const stepLength = 0.7;
      const headingInRadians = heading * (Math.PI / 180);

      const deltaLatitude = (stepLength * Math.cos(headingInRadians)) / 111320;
      const deltaLongitude = (stepLength * Math.sin(headingInRadians)) / (111320 * Math.cos(currentLocation.latitude * (Math.PI / 180)));

      const newLatitude = currentLocation.latitude + deltaLatitude;
      const newLongitude = currentLocation.longitude + deltaLongitude;

      const filteredLatitude = applyLowPassFilter(newLatitude, currentLocation.latitude);
      const filteredLongitude = applyLowPassFilter(newLongitude, currentLocation.longitude);

      setCurrentLocation({ latitude: filteredLatitude, longitude: filteredLongitude });

      console.log('Updated Position:', newLatitude, newLongitude);
    } catch (err) {
      console.error('Error updating position:', err);
    }
  };

  const setTestLocation = () => {
    try {
      const testLocation = { latitude: 10.926264683573066, longitude: 76.92487742683454 };
      setManualLocation(testLocation);

      const isInPolygon = geolib.isPointInPolygon(testLocation, polygonCoords);
      console.log('Is the test location inside the polygon?', isInPolygon);

      if (isInPolygon && !hasCheckedIn) {
        const testEntryTime = new Date();
        setCheckInTime(testEntryTime);
        setHasCheckedIn(true);
        console.log('Entry time recorded for manual location:', new Date(testEntryTime).toLocaleString());
      }
    } catch (err) {
      console.error('Error setting test location:', err);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType="satellite" 
        initialRegion={{
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {manualLocation && (
          <Marker coordinate={manualLocation} title="Manual Location" />
        )}
        <Polygon
          coordinates={polygonCoords}
          fillColor="rgba(255, 0, 0, 0.3)"
          strokeColor="rgba(255, 0, 0, 1)"
          strokeWidth={2}
        />
        {currentLocation && (
          <Marker coordinate={currentLocation} title="Your Location" />
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Set Test Location" onPress={setTestLocation} />
      </View>
      <View style={styles.infoContainer}>
        <Text>Steps: {stepCount}</Text>
        <Text>Heading: {heading.toFixed(2)}°</Text>
        <Text>Check-In Time: {checkInTime ? new Date(checkInTime).toLocaleString() : 'Not checked in'}</Text>
        <Text>Check-Out Time: {checkOutTime ? new Date(checkOutTime).toLocaleString() : 'Not checked out'}</Text>
      </View>
      {error && <Text>Error: {error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
});

export default Map;
