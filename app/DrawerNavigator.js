import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons'; // Icons
import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      {/* Custom Drawer Items with Icons */}
      <DrawerItem
        label={() => (
          <View style={styles.drawerItem}>
            <FontAwesome name="home" size={20} color="#3498db" style={styles.drawerIcon} />
            <Text style={styles.drawerLabel}>Home</Text>
          </View>
        )}
        onPress={() => navigation.navigate('HomeTabs', { screen: 'index' })}
      />

      <DrawerItem
        label={() => (
          <View style={styles.drawerItem}>
            <FontAwesome name="map" size={20} color="#e74c3c" style={styles.drawerIcon} />
            <Text style={styles.drawerLabel}>Map</Text>
          </View>
        )}
        onPress={() => navigation.navigate('Map')}
      />

      <DrawerItem
        label={() => (
          <View style={styles.drawerItem}>
            <FontAwesome name="book" size={20} color="#2ecc71" style={styles.drawerIcon} />
            <Text style={styles.drawerLabel}>Manual</Text>
          </View>
        )}
        onPress={() => navigation.navigate('Manual')}
      />

      <DrawerItem
        label={() => (
          <View style={styles.drawerItem}>
            <FontAwesome name="clock-o" size={20} color="#f39c12" style={styles.drawerIcon} />
            <Text style={styles.drawerLabel}>Leave</Text>
          </View>
        )}
        onPress={() => navigation.navigate('Leave')}
      />
    </DrawerContentScrollView>
  );
};

// Custom styles for the drawer
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7', // Light background color for the drawer
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f0f4f7', // White background for drawer items
    borderRadius: 5, // Rounded corners
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 0.8, // Shadow for Android
  },
  drawerIcon: {
    marginRight: 20, // Larger space between icon and label
  },
  drawerLabel: {
    fontSize: 18,
    fontWeight: '600', // Semi-bold for better readability
    color: '#333', // Darker text color
  },
});

export default CustomDrawerContent;
