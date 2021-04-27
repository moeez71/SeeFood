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
import HomeTabs, { ProfileStackScreen } from './HomeTabs';
import ProfileScreen from '../screens/ProfileScreen';
import DrawerContent from '../screens/DrawerContent';
import Theme from '../constants/Theme';

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



const AppStack = ({navigation}) => {
    return (
        
        <Drawer.Navigator 
        drawerContent={props => <DrawerContent {...props} />}
        style={{ flex: 1 }}
        drawerStyle={{
        backgroundColor: Theme.COLORS.PRIMARY,
        width: width * 0.65
      }}
      >
            <Drawer.Screen name="Home" component={HomeTabs}/>
            <Drawer.Screen name="Profile" component={ProfileStackScreen} navigation={navigation}/>
            <Drawer.Screen name="LogoutScreen" component={LogoutScreen}/>
        </Drawer.Navigator>
        

    )
}

export default AppStack;