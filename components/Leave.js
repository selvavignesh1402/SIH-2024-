import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,ScrollView, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';  // Import Picker from the new package
import { FontAwesome } from '@expo/vector-icons';

const Leave = () => {
  const [leavePeriod, setLeavePeriod] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [halfDay, setHalfDay] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [reason, setReason] = useState('');

  const toggleHalfDaySwitch = () => setHalfDay(previousState => !previousState);

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

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Good Morning</Text>
        <Text style={styles.userName}>Rajesh Mehta</Text>
        <FontAwesome name="bell" size={24} color="white" style={styles.bellIcon} />
        <FontAwesome name="bars" size={24} color="white" style={styles.menuIcon} />
      </View>

      {/* Leave Period */}
      <View style={styles.field}>
        <Text style={styles.label}>Select leave period</Text>
        <Picker
          selectedValue={leavePeriod}
          style={styles.picker}
          onValueChange={(itemValue) => setLeavePeriod(itemValue)}
        >
          <Picker.Item label="2024-08-30 - 2024-09-02" value="2024-08-30_2024-09-02" />
        </Picker>
      </View>

      {/* Leave Type */}
      <View style={styles.field}>
        <Text style={styles.label}>Select leave type</Text>
        <Picker
          selectedValue={leaveType}
          style={styles.picker}
          onValueChange={(itemValue) => setLeaveType(itemValue)}
        >
          <Picker.Item label="Sick Leave" value="sick" />
          <Picker.Item label="Casual Leave" value="casual" />
          <Picker.Item label="Earned Leave" value="earned" />
        </Picker>
      </View>

      {/* Start Date */}
      <View style={styles.field}>
        <Text style={styles.label}>Start date</Text>
        <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
          <View style={styles.datePicker}>
            <Text>{startDate.toDateString()}</Text>
            <Ionicons name="calendar" size={24} color="black" />
          </View>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onChangeStartDate}
          />
        )}
      </View>

      {/* End Date */}
      <View style={styles.field}>
        <Text style={styles.label}>End date</Text>
        <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
          <View style={styles.datePicker}>
            <Text>{endDate.toDateString()}</Text>
            <Ionicons name="calendar" size={24} color="black" />
          </View>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onChangeEndDate}
          />
        )}
      </View>

      {/* Half Day Switch */}
      <View style={styles.field}>
        <Text style={styles.label}>Are they any half days? {halfDay ? 'Yes' : 'No'}</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={halfDay ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleHalfDaySwitch}
          value={halfDay}
        />
      </View>

      {/* Reason for Leave */}
      <View style={styles.field}>
        <Text style={styles.label}>Reason for leave</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter reason for leave"
          onChangeText={text => setReason(text)}
          value={reason}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
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
  field: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  picker: {
    backgroundColor: '#eef2f5',
    borderRadius: 5,
    padding: 10,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eef2f5',
    borderRadius: 5,
    padding: 10,
  },
  textInput: {
    backgroundColor: '#eef2f5',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 30,
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft:20,
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Leave;
