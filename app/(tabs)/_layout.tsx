import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabBar from '../../components/TabBar';  
import Leave from '../../components/Leave';
import Manual from '../../components/ManualCheck';
import Map from '../../components/Map';
import Notification from "../../components/Notification";
import CustomDrawerContent from '../DrawerNavigator'; 
import { Tabs } from 'expo-router';

const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tabs 
      tabBar={props => <TabBar {...props} />}>

      <Tabs.Screen 
        name="index" 
        options={{ title: "Home", headerShown: false }} 
      />
      <Tabs.Screen 
        name="check" 
        options={{ title: "Check", headerShown: false }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ title: "Login", headerShown: false }} 
      />
    </Tabs>
  );
}

export default function Layout() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f7f7f7',
          width: 240,
        },
        headerShown: false,
        drawerPosition: 'right',
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={TabNavigator}
        options={{ title: 'Home', headerShown: false }}
      />
      <Drawer.Screen name="Leave" component={Leave} options={{ headerShown: false }} />
      <Drawer.Screen name="Map" component={Map} options={{ headerShown: false }} />
      <Drawer.Screen name="Manual" component={Manual} options={{ headerShown: false }} />
      <Drawer.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
