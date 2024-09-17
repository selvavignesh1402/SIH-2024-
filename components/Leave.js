import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const LeaveForm = () => {
  const navigation = useNavigation();
  const handleOpenDrawer = () => {
    if (navigation.dispatch) {
      navigation.dispatch(DrawerActions.openDrawer()); // Use DrawerActions for opening the drawer
    } else {
      console.warn('DrawerActions is not available in this navigation context');
    }
  };
  const [leavePeriod, setLeavePeriod] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [reason, setReason] = useState('');

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  const handleSubmit = () => {
    // Submit logic goes here
    console.log('Leave period:', leavePeriod);
    console.log('Leave type:', leaveType);
    console.log('Start date:', startDate);
    console.log('End date:', endDate);
    console.log('Half day:', isHalfDay);
    console.log('Reason:', reason);
  };

  return (
    <ScrollView style={styles.container}>
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
<View style={styles.Form}>


      <View style={styles.dropdown}>
        <Picker
          selectedValue={leavePeriod}
          onValueChange={(itemValue) => setLeavePeriod(itemValue)}
        >
          <Picker.Item label="Select leave period" value="" />
          <Picker.Item label="2024-08-30 to 2024-09-02" value="2024-08-30 to 2024-09-02" />
          <Picker.Item label="2024-09-05 to 2024-09-10" value="2024-09-05 to 2024-09-10" />
        </Picker>
      </View>

      <View style={styles.dropdown}>
        <Picker
          selectedValue={leaveType}
          onValueChange={(itemValue) => setLeaveType(itemValue)}
        >
          <Picker.Item label="Select leave type" value="" />
          <Picker.Item label="Sick Leave" value="sick" />
          <Picker.Item label="Casual Leave" value="casual" />
          <Picker.Item label="Paid Leave" value="paid" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.datePicker} onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.dateText}>Start date</Text>
        <Ionicons name="calendar-outline" size={24} color="black" />
      </TouchableOpacity>

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={onChangeStartDate}
        />
      )}

      <TouchableOpacity style={styles.datePicker} onPress={() => setShowEndDatePicker(true)}>
        <Text style={styles.dateText}>End date</Text>
        <Ionicons name="calendar-outline" size={24} color="black" />
      </TouchableOpacity>

      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={onChangeEndDate}
        />
      )}

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Are they any half days? {isHalfDay ? 'Yes' : 'No'}</Text>
        <Switch
          value={isHalfDay}
          onValueChange={(value) => setIsHalfDay(value)}
        />
      </View>

      <TextInput
        style={styles.textArea}
        placeholder="Reason for leave"
        multiline
        numberOfLines={4}
        value={reason}
        onChangeText={(text) => setReason(text)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
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
  dropdown: {
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    padding: 7,
    marginVertical: 10,
    elevation: 1,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#1A73E8',
    paddingVertical: 10,
    paddingHorizontal:20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom:28,
    marginTop:10
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  Form:{
    padding:20,
  }
});

export default LeaveForm;
