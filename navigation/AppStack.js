import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
import HomeTabs, { ProfileStackScreen } from './HomeTabs';
import DrawerContent from '../components/DrawerContent';
import Theme from '../constants/Theme';
import Favourites from '../screens/Home/Favourites';

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
            <Drawer.Screen name="Favourites" component={Favourites}/>
            
        </Drawer.Navigator>
        

    )
}

export default AppStack;