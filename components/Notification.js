import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; // for icons
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function Notification() {
    const navigation = useNavigation();

  const handleOpenDrawer = () => {
    if (navigation.dispatch) {
      navigation.dispatch(DrawerActions.openDrawer()); // Use DrawerActions for opening the drawer
    } else {
      console.warn('DrawerActions is not available in this navigation context');
    }
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Good Morning</Text>
          <Text style={styles.userName}>Rajesh Mehta</Text>
        </View>
        {/* Icons Container */}
        <View style={styles.iconsContainer}>
          <FontAwesome name="bell" size={24} color="white" style={styles.bellIcon} />
          <TouchableOpacity onPress={handleOpenDrawer} style={styles.menuButton}>
            <FontAwesome name="bars" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Notifications */}
      <ScrollView contentContainerStyle={styles.notificationsContainer}>
        <View style={styles.notificationItem}>
          <FontAwesome5 name="user-tie" size={24} color="#4A90E2" />
          <Text style={styles.notificationText}>
            HR has applied offsite work on Thudiyalur.
          </Text>
        </View>
        <View style={styles.notificationItem}>
          <FontAwesome5 name="money-check-alt" size={24} color="#4A90E2" />
          <Text style={styles.notificationText}>
            Salary credited to your account
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
      },
      header: {
        backgroundColor: 'blue',
        padding: 20,
        paddingTop: 60,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: 'row', // Align items horizontally
        justifyContent: 'space-between', // Space between the text and icons
        alignItems: 'center', // Vertically center items
      },
      headerText: {
        fontSize: 18,
        color: 'white',
      },
      userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 5,
      },
      iconsContainer: {
        flexDirection: 'row', 
        marginBottom:18,
        alignItems: 'center', 
        gap:10
      },
      bellIcon: {
        marginRight: 20, 
      },
  notificationsContainer: {
    padding: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF0F6', // light blue background from the image
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  notificationText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});
