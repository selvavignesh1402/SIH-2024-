import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStoredStatus = async () => {
  try {
    const status = await AsyncStorage.getItem('attendanceStatus');
    return JSON.parse(status) || { hasCheckedIn: false, hasCheckedOut: false };
  } catch (error) {
    console.error('Error retrieving status:', error);
    return { hasCheckedIn: false, hasCheckedOut: false };
  }
};

export const setStoredStatus = async (status) => {
  try {
    await AsyncStorage.setItem('attendanceStatus', JSON.stringify(status));
  } catch (error) {
    console.error('Error setting status:', error);
  }
};
