import { Layout, List } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import RecipeCard from './RecipeCard';


const hard = [
    {
    id: 716429,
    title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
    },
    {
    id: 715538,    
    title: "Bruschetta Style Pork & Pasta",
    image: "https://spoonacular.com/recipeImages/715538-312x231.jpg",
    },
    {
    id: 716342,    
    title: "Chicken Suya",
    image: "https://spoonacular.com/recipeImages/716342-312x231.jpg",
    },
    {
    id: 662585,    
    title: "Sweet Potato Oven Fries",
    image: "https://spoonacular.com/recipeImages/662585-312x231.jpg",
    },
    {
    id: 663136,    
    title: "Thai Pizza",
    image: "https://spoonacular.com/recipeImages/663136-312x231.jpg",
    },
]


function FoodList(props) {

    const renderItem = ({ item, index }) => (
        <RecipeCard 
        title={item.title} 
        imageURL={item.image}
        isSummary={false}
        key={index}
        id={item.id}
        fromRecipe={true}
        savedRecipes={[]}
        handlePress={() => props.navigation.navigate('Instructions', {
                                                                            id: item.id, 
                                                                            title: item.title, 
                                                                            img: item.image,
                                                                            fromRecipe: true
                                                                        })}  
        />
      );
    return (
        <SafeAreaView style={{flex: 1}}>
            <Layout style={styles.container}>
            <Text style={styles.heading}>Trending Recipes</Text>
            <List
              horizontal={true}
              style={styles.tab}
              data={hard}
              renderItem={renderItem}
              />
        </Layout>
        </SafeAreaView>
    )
}

export default FoodList;

const styles = StyleSheet.create({
    container: {
     margin: 20
    },
    tab: {
        // height: 192,
        backgroundColor: "white",
        marginRight: 10
      },
    heading: {
        fontFamily: "Nexa Bold",
        fontSize: 28,
    }
});

