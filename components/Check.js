import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const Check = () => {
  const navigation = useNavigation();

  const handleOpenDrawer = () => {
    if (navigation.dispatch) {
      navigation.dispatch(DrawerActions.openDrawer()); // Use DrawerActions for opening the drawer
    } else {
      console.warn('DrawerActions is not available in this navigation context');
    }
  };

  return (
    <ScrollView style={styles.container}>
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

      {/* Date Selection */}
      <View style={styles.dateContainer}>
        {['Mon 4', 'Tue 5', 'Wed 6', 'Thr 7', 'Fri 8'].map((date, index) => (
          <TouchableOpacity key={index} style={[styles.dateItem, index === 4 && styles.activeDate]}>
            <Text style={[styles.dateText, index === 4 && styles.activeDateText]}>{date.split(' ')[0]}</Text>
            <Text style={[styles.dateText, index === 4 && styles.activeDateText]}>{date.split(' ')[1]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Check-in/Check-out Section */}
      <View style={styles.statusContainer}>
        {/* Check-in */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTime}>12:00 PM</Text>
          <Text style={styles.statusDate}>April, 08</Text>
          <View style={styles.statusIndicator}>
            <FontAwesome name="circle" size={12} color="green" />
            <Text style={styles.statusText}>Check-In</Text>
          </View>
          <Text style={styles.statusLocation}>Branch, place</Text>
        </View>

        {/* Check-out */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTime}>12:00 PM</Text>
          <Text style={styles.statusDate}>April, 08</Text>
          <View style={styles.statusIndicator}>
            <FontAwesome name="circle" size={12} color="red" />
            <Text style={styles.statusText}>Check-Out</Text>
          </View>
          <Text style={styles.statusLocation}>Branch, place</Text>
        </View>

        {/* Working Hours */}
        <View style={styles.statusCard}>
          <FontAwesome name="clock-o" size={24} color="#3498db" />
          <Text style={styles.workingHoursText}>Working Hours</Text>
          <Text style={styles.workingHoursTime}>06:32:04</Text>
        </View>
      </View>
    </ScrollView>
  );
};

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
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  dateItem: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  activeDate: {
    backgroundColor: 'blue',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  activeDateText: {
    color: 'white',
  },
  statusContainer: {
    paddingHorizontal: 20,
  },
  statusCard: {
    backgroundColor: '#eef5fc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#ccc',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  statusTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statusDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  statusText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  statusLocation: {
    color: '#666',
  },
  workingHoursText: {
    fontSize: 16,
    marginLeft: 10,
  },
  workingHoursTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
});

export default Check;
