import React  from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Recipe from "../screens/SearchRecipe(Name)/recipe";
import CameraNew from '../screens/SearchRecipe(Camera)/CameraNew';
import RecipeSearch from '../screens/SearchRecipe(Name)/RecipeSearch';
import Instructions from '../screens/IngredientsToRecipe/Instructions';


const Stack = createStackNavigator();


const Naviagtor_M6 = ({navigation}) => {
  return (
   <Stack.Navigator 
     headerMode='none'
     screenOptions = {({navigation}) => ({
     title : "Search Recipe", 
     headerTintColor: "black",
     headerStyle: {backgroundColor: "#ffff"},
   })}
 >
   {/* <Stack.Screen name="recipe" component={Recipe} /> */}
   <Stack.Screen name="recipe" component={RecipeSearch} />
   <Stack.Screen name="Instructions" component={Instructions} />
   <Stack.Screen name="CameraNew" component={CameraNew} />
   
 </Stack.Navigator>
  )
}
export default Naviagtor_M6