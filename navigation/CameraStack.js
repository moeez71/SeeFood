import React, {useState, useEffect}  from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Keyboard, ScrollView, TouchableOpacity, Button, Image, Linking  } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Recipe2 from "../screens/SearchRecipe(Name)/recipe2";
import CameraRecipe from '../screens/SearchRecipe(Camera)/CameraRecipe';
import CameraNew from '../screens/SearchRecipe(Camera)/CameraNew';
const Stack = createStackNavigator();


const CameraStack = ({navigation}) => {
  return (
   <Stack.Navigator 
     headerMode='none'
     screenOptions = {({navigation}) => ({
     title : "Search Recipe", 
     headerTintColor: "black",
     headerStyle: {backgroundColor: "#ffff"},
   })}
 >
   <Stack.Screen name="CameraNew" component={CameraNew} />
   <Stack.Screen name="CameraRecipe" component={CameraRecipe} />
   <Stack.Screen 
    name= "2" 
    component={Recipe2}
    // options = {({navigation}) => ({
    //       title: "Yalala",
    //       headerLeft: () =>
    //         <View style= {{paddingLeft:15}}>
    //           <Button title= "Back"></Button>
    //         </View>,
    //       })}
    />
 </Stack.Navigator>
  )
}
export default CameraStack;