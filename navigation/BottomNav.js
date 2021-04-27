import React from 'react';
import {BottomFabBar} from 'rn-wave-bottom-bar';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/Others/HomeScreen';
import CameraStack from './CameraStack';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

export default function BottomNav() {
// const tabBarIcon = (name: string) => ({
//   focused,
//   color,
//   size,
// }: {
//   focused: boolean;
//   color: string; // Defines fab icon color
//   size: number;
// }) => <Icon name={name} size={28} color={focused ? 'white' : 'white'} />;
 
  return(
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: 'purple', // Used for the FAB background Color
    }}
    tabBar={(props) => <BottomFabBar color="purple" {...props} />}
  >
    <Tab.Screen
      options={{ tabBarIcon: tabBarIcon('home') }}
      name="Home"
      component={HomeScreen}
    />
    <Tab.Screen
      name="Camera"
      options={{ tabBarIcon: tabBarIcon('scan1') }}
      component={CameraStack}
    />
  </Tab.Navigator>
  )
}