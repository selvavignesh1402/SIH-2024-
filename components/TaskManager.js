import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

// Define the task name
const LOCATION_TASK_NAME = 'background-location-task';

// Function to start background location updates
export const startBackgroundLocationTask = async () => {
  const { status } = await Location.requestBackgroundPermissionsAsync();
  if (status === 'granted') {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 10000,  // Track every 10 seconds
      distanceInterval: 10, // Track every 10 meters
      showsBackgroundLocationIndicator: true,
    });
  } else {
    console.error('Location permission denied');
  }
};

// Define the background task to handle location updates
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("Background location task error:", error);
    return;
  }

  if (data) {
    const { locations } = data;
    const [location] = locations;
    console.log('Background location update:', location);
    // Implement your logic for check-in and check-out based on location here
    // For example:
    // if (isInPolygon(location.coords)) handleCheckInOrCheckOut(location.coords);
  }
});
