import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import IngredientsToRecipe from '../screens/Ingredients_to_recipe(manual)/IngredientsToRecipe';
import RecipeResults from '../screens/Ingredients_to_recipe(manual)/RecipeResults';
import Instructions from '../screens/Ingredients_to_recipe(manual)/Instructions';

const Stack = createStackNavigator();

const IngredientsToRecipeNav = () => {

    return (
        <Stack.Navigator headerMode='none' initialRouteName="IngredientsScreen">
            <Stack.Screen name="IngredientsScreen" component={IngredientsToRecipe}/>
            <Stack.Screen name="RecipeResults" component={RecipeResults}/>
            <Stack.Screen name="Instructions" component={Instructions}/>
        </Stack.Navigator>
    )

}

export default IngredientsToRecipeNav;