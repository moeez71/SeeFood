import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import PantryScreen from '../screens/PantryScreen';
import Naviagtor_M6 from './recipe_nav_m6';
import CameraStack from './CameraStack';
import Maps from "../screens/Map";
import IngredientsToRecipeNav from '../navigation/IngredientsToRecipeNav';
import Calz from "./calnav"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {BottomFabBar} from 'rn-wave-bottom-bar';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Theme from '../constants/Theme';

const Tab = createBottomTabNavigator();

const tabBarIcon = (name: string,label:string) => ({
  focused,
  color,
  size,
}: {
  focused: boolean;
  color: color; // Defines fab icon color
  size: number;
}) => (
<View style={{alignItems:"center"}}>
  <Ionicons name={name} size={18} color={focused ? 'white' : Theme.COLORS.PRIMARY}/>
  {!focused && <Text style={styles.labelStyle}>{label}</Text>}
  </View>
  ) 

function HomeTabs() {
  return(
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Theme.COLORS.PRIMARY,
        activeBackgroundColor: 'white',
        inactiveTintColor: 'white',
        inactiveBackgroundColor: Theme.COLORS.PRIMARY,
      }}
      tabBar={(props) => <BottomFabBar  {...props} color={Theme.COLORS.WHITE}/>}
      
    >
      <Tab.Screen
        options={{ tabBarIcon: tabBarIcon('home-outline', 'home') }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="PantryScreen"
        options={{ tabBarIcon: tabBarIcon('cart-outline', 'Pantry') }}
        component={PantryScreen}
      />
      
      <Tab.Screen
        name="Recipes"
        options={{ tabBarIcon: tabBarIcon('fast-food-outline', 'Recipes') }}
        component={Naviagtor_M6}
      />
      <Tab.Screen
        name="Maps"
        options={{ tabBarIcon: tabBarIcon('location-outline', 'Maps') }}
        component={Maps}
      />
      <Tab.Screen
        name="IngredientsToRecipeNav"
        options={{ tabBarIcon: tabBarIcon('scan-outline', 'Make Recipe')}}
        component={IngredientsToRecipeNav}
      />
      <Tab.Screen
        name="Calorie"
        options={{ tabBarIcon: tabBarIcon('bar-chart-outline', 'Calories') }}
        component={Calz}
      />
    </Tab.Navigator>
    )
}
export default HomeTabs;

const styles = StyleSheet.create({
  labelStyle:{
    fontSize:12,
    color:Theme.COLORS.PRIMARY,
    fontFamily:"Nexa Regular"
  }
})
