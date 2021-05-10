import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import PantryScreen from '../screens/Pantry/PantryScreen';
import Naviagtor_M6 from './SearchRecipeStack';
import Maps from "../screens/RestaurantFinder/Map";
import IngredientsToRecipeNav from '../navigation/IngredientsToRecipeNav';
import Calz from "./CalorieTrackerNav";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BottomFabBar} from 'rn-wave-bottom-bar';
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Theme from '../constants/Theme';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import CameraStack from './CameraStack';



const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();


const tabBarIcon = (name,label) => ({
  focused,
  color,
  size,
}) => (
<View style={{alignItems:"center"}}>
  <Ionicons name={name} size={18} color={focused ? 'white' : Theme.COLORS.PRIMARY}/>
  {!focused && <Text style={styles.labelStyle}>{label}</Text>}
  </View>
  ) 

function HomeTabs({navigation}) {
  return(
    <Tab.Navigator
      initialRouteName="home"
      tabBarOptions={{
        activeTintColor: Theme.COLORS.PRIMARY,
        activeBackgroundColor: 'white',
        inactiveTintColor: 'white',
        inactiveBackgroundColor: Theme.COLORS.PRIMARY,
      }
      }
      tabBar={(props) => <BottomFabBar {...props} color="white"/>}
      
    >
      <Tab.Screen
        // options={{ tabBarIcon: tabBarIcon('home-outline', 'home') }}
        options={({route,navigation})=>({ 
          tabBarIcon: tabBarIcon('home-outline', 'home'), 
          tabBarVisible: ((route) => {
            let routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
            if (routeName === 'Home') {
              return true;
            }
            else return false;
          })(route),
          })}
        name="Home"
        component={HomeScreen}
        navigation={navigation}
      />
      <Tab.Screen
        name="PantryScreen"
        // options={{ tabBarIcon: tabBarIcon('cart-outline', 'Pantry') }}
        options={({route,navigation})=>({ 
          tabBarIcon: tabBarIcon('cart-outline', 'pantry'), 
          tabBarVisible: ((route) => {
            let routeName = getFocusedRouteNameFromRoute(route) ?? 'PantryScreen';
            if (routeName === 'PantryScreen') {
              return true;
            }
            else return false;
          })(route),
          })}
        component={PantryScreen}
      />
      
      <Tab.Screen
        name="Recipes"
        options={({route,navigation})=>({ 
          tabBarIcon: tabBarIcon('fast-food-outline', 'recipes'), 
          tabBarVisible: ((route) => {
            let routeName = getFocusedRouteNameFromRoute(route) ?? 'recipe';
            if (routeName === 'recipe') {
              return true;
            }
            else return false;
          })(route),
          })}
        component={Naviagtor_M6}
      />
      <Tab.Screen
        name="Maps"
        options={({route,navigation})=>({ 
          tabBarIcon: tabBarIcon('restaurant-outline', 'restaurants'), 
          tabBarVisible: ((route) => {
            let routeName = getFocusedRouteNameFromRoute(route) ?? 'Maps';
            if (routeName === 'Maps') return true;
            else return false;
          })(route),
          })}
        component={Maps}
      />
      <Tab.Screen
        name="IngredientScreen"
        options={({route,navigation})=>({ 
          tabBarIcon: tabBarIcon('scan-outline', 'make recipe'), 
          tabBarVisible: ((route) => {
            let routeName = getFocusedRouteNameFromRoute(route) ?? 'IngredientScreen';
            if (routeName === 'IngredientScreen') {
              return true;
            }
            else return false;
          })(route),
          })}
        // options={{ tabBarIcon: tabBarIcon('scan-outline', 'Make Recipe')}}
        component={IngredientsToRecipeNav}
        
      />
      <Tab.Screen
        name="Calorie"
        options={({route,navigation})=>({ 
          tabBarIcon: tabBarIcon('bar-chart-outline', 'calories'), 
          tabBarVisible: ((route) => {
            let routeName = getFocusedRouteNameFromRoute(route) ?? 'Calorie';
            if (routeName === 'Calorie') {
              return true;
            }
            else return false;
          })(route),
          })}
        // options={{ tabBarIcon: tabBarIcon('bar-chart-outline', 'Calories') }}
        component={Calz}
      />
    </Tab.Navigator>
    )
}

export const ProfileStackScreen = ({navigation}) => {

  return (
    <ProfileStack.Navigator headerMode='none'>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        navigation={navigation}
      />
      
    </ProfileStack.Navigator>
  );
};

export default HomeTabs;

const styles = StyleSheet.create({
  labelStyle:{
    fontSize:12,
    color:Theme.COLORS.PRIMARY,
    fontFamily:"Nexa Regular"
  }
})
