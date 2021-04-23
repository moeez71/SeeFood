import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from "react-native";
import HomeScreen from '../screens/HomeScreen';
import PantryScreen from '../screens/PantryScreen';
import Naviagtor_M6 from './recipe_nav_m6';
import Maps from "../screens/Map";
import IngredientsToRecipeNav from '../navigation/IngredientsToRecipeNav';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LogoutScreen from '../screens/LogoutScreen';
import CameraStack from '../navigation/CameraStack';
import nowTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");

import Calz from "./calnav"
import HomeTabs from './HomeTabs';

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
        
        <Drawer.Navigator 
        style={{ flex: 1 }}
        drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.65
      }}
      drawerContentOptions={{
        activeTintColor: nowTheme.COLORS.PRIMARY,
        activeBackgroundColor: 'white',
        inactiveTintColor: 'white',
        inactiveBackgroundColor: nowTheme.COLORS.PRIMARY,
        itemStyle: {
        //   width: width * 0.75,
        //   backgroundColor: "transparent",
        //   paddingVertical: 10,
        //   paddingHorizonal: 12,
        height: 60,
          justifyContent: "center",
        //   alignContent: "center",
        //   alignItems: "center",
        borderRadius: 50,
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: nowTheme.SIZES.FONT,
          marginLeft: 5,
          fontWeight: "normal",
          fontFamily: "Nexa Regular"
          
        }
      }}
      
      >
            <Drawer.Screen 
            name="HomeStack" component={HomeTabs}
            options={{
                drawerIcon: ({ color }) => <AntDesign name='home' color={color} size={18}/>
                }}
            />
            {/* <Drawer.Screen 
            name="HomeScreen" component={HomeScreen}
            options={{
                drawerIcon: ({ color }) => <AntDesign name='home' color={color} size={18}/>
                }}
            /> */}
            <Drawer.Screen name="PantryScreen" component={PantryScreen}
                options={{
                drawerIcon: ({ color }) => <AntDesign name='shoppingcart' color={color} size={18}/>
                }}
            />
            <Drawer.Screen name="Recipes" component={Naviagtor_M6}
                options={{
                drawerIcon: ({ color }) => <Ionicons name='fast-food-outline' color={color} size={18}/>
                }}
            />
            <Drawer.Screen name="Maps" component={Maps}
                options={{
                drawerIcon: ({ color }) => <Ionicons name='location-outline' color={color} size={18}/>
                }}
            /> 
            <Drawer.Screen name="IngredientsToRecipeNav" component={IngredientsToRecipeNav} 
                options={{
                    drawerLabel: 'Make Recipe',
                drawerIcon: ({ color }) => <SimpleLineIcons name='chemistry' color={color} size={18}/>
                }}
            />
            
            <Drawer.Screen name="Camera" component={CameraStack}
                options={{
                    drawerLabel: 'Scan Food',
                drawerIcon: ({ color }) => <AntDesign name='scan1' color={color} size={18}/>
                }}
            />
              <Drawer.Screen name="Calorie" component={Calz}
                options={{
                    drawerLabel: 'Calorie Tracker',
                drawerIcon: ({ color }) => <AntDesign name='linechart' color={color} size={18}/>
                }}
            /> 

            <Drawer.Screen name="LogoutScreen" component={LogoutScreen}
                options={{
                    drawerLabel: 'Logout',
                drawerIcon: ({ color }) => <SimpleLineIcons name='logout' color={color} size={18}/>
                }}
            />
        </Drawer.Navigator>

    )
}

const logout = () => {
    return (
        <FontAwesome icon="sign-out-alt" size={18} color="black" />
    );
}
export default AppStack;