import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import IngredientsToRecipe from '../screens/IngredientsToRecipe';
import RecipeResults from '../screens/RecipeResults';
import Instructions from '../screens/Instructions';

const Stack = createStackNavigator();

const IngredientsToRecipeNav = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="IngredientsScreen" component={IngredientsToRecipe}/>
            <Stack.Screen name="RecipeResults" component={RecipeResults}/>
            <Stack.Screen name="Instructions" component={Instructions}/>
        </Stack.Navigator>
    )

}

export default IngredientsToRecipeNav;