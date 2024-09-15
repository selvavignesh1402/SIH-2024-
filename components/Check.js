import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Check = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Good Morning</Text>
        <Text style={styles.userName}>Rajesh Mehta</Text>
        <FontAwesome name="bell" size={24} color="white" style={styles.bellIcon} />
        <FontAwesome name="bars" size={24} color="white" style={styles.menuIcon} />
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

      {/* Bottom Icons */}
      <View style={styles.bottomMenu}>
        {['Task', 'Leave', 'Attendance'].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <FontAwesome name={item.toLowerCase() === 'task' ? 'clipboard' : item.toLowerCase() === 'leave' ? 'calendar' : 'users'} size={24} color="#3498db" />
            <Text style={styles.menuText}>{item}</Text>
          </TouchableOpacity>
        ))}
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
    position: 'relative',
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
  bellIcon: {
    position: 'absolute',
    right: 60,
    top: 60,
  },
  menuIcon: {
    position: 'absolute',
    right: 20,
    top: 60,
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
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    marginTop: 5,
    color: '#3498db',
  },
});

export default Check;
