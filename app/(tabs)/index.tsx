import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons'; // Icons for the header
import { useNavigation, DrawerActions } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const index = () => {
  const navigation = useNavigation();

  const handleOpenDrawer = () => {
    if (navigation.dispatch) {
      navigation.dispatch(DrawerActions.openDrawer()); // Use DrawerActions for opening the drawer
    } else {
      console.warn('DrawerActions is not available in this navigation context');
    }
  };

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [6, 8, 7, 8, 9, 10],
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Good Morning</Text>
          <Text style={styles.userName}>Rajesh Mehta</Text>
        </View>
        <View style={styles.iconsContainer}>
          <FontAwesome name="bell" size={24} color="white" style={styles.bellIcon} />
          <TouchableOpacity onPress={handleOpenDrawer}>
            <FontAwesome name="bars" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Work Efficiency Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Work Efficiency</Text>
        <LineChart
          data={data}
          width={screenWidth - 40} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <FontAwesome name="clock-o" size={24} color="#f39c12" />
          <Text style={styles.statValue}>48h</Text>
          <Text style={styles.statLabel}>Total Work</Text>
        </View>
        <View style={styles.statBox}>
          <FontAwesome name="dollar" size={24} color="#3498db" />
          <Text style={styles.statValue}>$5,600</Text>
          <Text style={styles.statLabel}>Income</Text>
        </View>
      </View>

      {/* Team Members Section */}
      <View style={styles.teamContainer}>
        <Text style={styles.teamTitle}>Team Members</Text>
        <View style={styles.teamRow}>
          <View style={styles.teamMember}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
              style={styles.avatar}
            />
            <Text style={styles.memberName}>Livia Bator</Text>
            <Text style={styles.memberRole}>Manager</Text>
          </View>
          <View style={styles.teamMember}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/35.jpg' }}
              style={styles.avatar}
            />
            <Text style={styles.memberName}>Randy Press</Text>
            <Text style={styles.memberRole}>Employee</Text>
          </View>
          <View style={styles.teamMember}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/42.jpg' }}
              style={styles.avatar}
            />
            <Text style={styles.memberName}>Workman</Text>
            <Text style={styles.memberRole}>Designer</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// Styles
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
    justifyContent: 'space-between', // Space between text and icons
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
    flexDirection: 'row', // Horizontally align icons
    alignItems: 'center',
    marginBottom:18,
    gap:10
  },
  bellIcon: {
    marginRight: 20, // Spacing between icons
  },
  chartContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  chartTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  chart: {
    borderRadius: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  teamContainer: {
    paddingHorizontal: 20,
  },
  teamTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  teamMember: {
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  memberRole: {
    fontSize: 14,
    color: '#666',
  },
});

export default index;
