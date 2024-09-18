// Notification.js
import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';

// Function to request notification permission
export const requestNotificationPermission = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      Alert.alert('Error', 'Notification permission denied');
    }
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
};

// Function to send a custom check-in notification
export const sendCheckInNotification = async (customMessage) => {
  console.log("Sending check-in notification...");
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Check-In Successful',
        body: customMessage || 'You have checked in successfully.',
      },
      trigger: null,
      android: {
        channelId: 'default',
      },
    });
    console.log('Check-in notification sent');
  } catch (error) {
    console.error('Error sending check-in notification:', error);
  }
};

// Function to send a custom check-out notification
export const sendCheckOutNotification = async (customMessage) => {
  console.log("Sending check-out notification...");
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Check-Out Successful',
        body: customMessage || 'You have checked out successfully.',
      },
      trigger: null, 
      android: {
        channelId: 'default',
      },
    });
    console.log('Check-out notification sent');
  } catch (error) {
    console.error('Error sending check-out notification:', error);
  }
};
