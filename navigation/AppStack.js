import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import IngredientsToRecipe from "../screens/IngredientsToRecipe";
import PantryScreen from '../screens/PantryScreen';
import Naviagtor_M6 from './recipe_nav_m6';
import Maps from "../Map"
import Maps2 from "../Map2"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Text, Layout, Divider, TopNavigation  } from '@ui-kitten/components';
import IngredientsToRecipeNav from '../navigation/IngredientsToRecipeNav';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Recipe from '../screens/recipe';
import LogoutScreen from '../screens/LogoutScreen';
import CameraNew from '../screens/CameraNew';
import CameraStack from '../navigation/CameraStack';

import Calz from "./calnav"

 const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
//  const AppStack = () => {
//      return (
//         <Stack.Navigator
//         screenOptions= {({navigation}) => ({
//           title : "Shazam For Food", 
//           headerTintColor: "black",
//           headerStyle: {backgroundColor: "#f0f8ff"},
//           headerLeft: ()=> 
//             <View style= {{paddingLeft:15}}>
//               <Ionicons 
//                 name="md-menu" 
//                 size={40} 
//                 color="red" 
//                 onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}/>
//             </View>
//         })}>
//              <Stack.Screen name="HomeScreen" component={AppStack2}/>
//         </Stack.Navigator>
//      );
//  }



const AppStack = () => {
    return (
        
        <Drawer.Navigator >
            <Drawer.Screen 
            name="HomeScreen" component={HomeScreen}
            options={{
                drawerIcon: () => <AntDesign name='home' color="#567" size={25}/>
                }}
            />
            <Drawer.Screen name="PantryScreen" component={PantryScreen}
                options={{
                drawerIcon: () => <AntDesign name='shoppingcart' color="#567" size={25}/>
                }}
            />
            <Drawer.Screen name="Recipes" component={Naviagtor_M6}
                options={{
                drawerIcon: () => <Ionicons name='fast-food-outline' color="#567" size={25}/>
                }}
            />
            <Drawer.Screen name="Maps" component={Maps}
                options={{
                drawerIcon: () => <Ionicons name='location-outline' color="#567" size={25}/>
                }}
            /> 
            <Drawer.Screen name="IngredientsToRecipeNav" component={IngredientsToRecipeNav} 
                options={{
                    drawerLabel: 'Make Recipe',
                drawerIcon: () => <SimpleLineIcons name='chemistry' color="#567" size={25}/>
                }}
            />
            
            <Drawer.Screen name="Camera" component={CameraStack}
                options={{
                    drawerLabel: 'Scan Food',
                drawerIcon: () => <AntDesign name='scan1' color="#567" size={25}/>
                }}
            />
              <Drawer.Screen name="Calorie" component={Calz}
                options={{
                    drawerLabel: 'Calorie Tracker',
                drawerIcon: () => <AntDesign name='linechart' color="#567" size={25}/>
                }}
            /> 

            <Drawer.Screen name="LogoutScreen" component={LogoutScreen}
                options={{
                    drawerLabel: 'Logout',
                drawerIcon: () => <SimpleLineIcons name='logout' color="#567" size={25}/>
                }}
            />
        </Drawer.Navigator>
    );
}

const logout = () => {
    return (
        <FontAwesome icon="sign-out-alt" size={22} color="black" />
    );
}
export default AppStack;