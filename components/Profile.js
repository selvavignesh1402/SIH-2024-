import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons

export default function ProfileScreen({ navigation }) {
  // Replace these with the user's actual data
  const user = {
    name: 'Praise Ade',
    username: '@praiseade',
    email: 'praiseade@example.com',
    department: 'Software Engineering',
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={25} color="#000" />
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/images/profile.png')} // Add user profile image URL here
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userUsername}>{user.username}</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Enhanced UserInfo Section */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoTitle}>User Information</Text>
        <View style={styles.userInfo}>
          <Text style={styles.userDetail}>Email: {user.email}</Text>
          <Text style={styles.userDetail}>Department: {user.department}</Text>
        </View>
      </View>

      {/* Account Settings */}
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingsOption}>
          <Icon name="shield-outline" size={25} color="#000" style={styles.icon} />
          <View>
            <Text style={styles.settingsText}>Security</Text>
            <Text style={styles.settingsSubText}>Activate 2FA for extra security</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsOption}>
          <Icon name="help-circle-outline" size={25} color="#000" style={styles.icon} />
          <View>
            <Text style={styles.settingsText}>Get Support</Text>
            <Text style={styles.settingsSubText}>Contact us if you need any help</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsOption}>
          <Icon name="notifications-outline" size={25} color="#000" style={styles.icon} />
          <View>
            <Text style={styles.settingsText}>Allow Notifications</Text>
            <Text style={styles.settingsSubText}>Manage the alerts you receive</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsOption}>
          <Icon name="log-out-outline" size={25} color="#000" style={styles.icon} />
          <View>
            <Text style={styles.settingsText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    marginLeft: 15,
    marginTop: 15,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#f0f0f0', // Placeholder color
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  userUsername: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  editProfileButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editProfileText: {
    fontSize: 16,
    color: '#000',
  },

  // Enhanced UserInfo Section
  userInfoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  userInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  userInfo: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // Shadow effect on Android
  },
  userDetail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    gap:10
  },

  settingsContainer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 20,
  },
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  icon: {
    marginRight: 15,
  },
  settingsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  settingsSubText: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
});
