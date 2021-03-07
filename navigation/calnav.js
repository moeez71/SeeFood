import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Keyboard, ScrollView, TouchableOpacity, Button, Image, Linking, LogBox  } from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Calorie from '../screens/calorie'

import calgraphs from '../screens/calgraphs'
import calrecord from '../screens/calrecord'


const Stack2 = createStackNavigator();

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
//const Tab = createMaterialBottomTabNavigator();

const Screen = () => {
    return(
    <View>
        <Text>Hellddo haal chaal hain bhai</Text>
    </View>
    )
}

const Screen2 = () => {
    return(
    <View>
        <Text>Hello2sdfsf</Text>
    </View>
    )
}

function MyTabs() {
  return (
    <Tab.Navigator 
    activeColor = '#ffffff'
     inactiveColor = '#ffffff'
     barStyle = {{backgroundColor: '#b0c4de',}}
     shifting = {false}>
      <Tab.Screen name="Add Record" component={Calorie} />
      <Tab.Screen name="Old Records" component={calrecord} />
      <Tab.Screen name="graphs" component={calgraphs} />
    </Tab.Navigator>
  );
}


const Navigator2 = () => {
    return (
      <Stack2.Navigator>
        <Stack2.Screen 
          name= "Calories"
          component={MyTabs}
          options = {{headerShown : false}} />
      </Stack2.Navigator>
    )
  }
  
  export default Navigator2
  