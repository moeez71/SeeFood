import React, { useEffect, useState } from 'react';
import { Card, Text } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';
import StarRatings from './StarRatings';
import HeartReact from './HeartReact';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Settings from '../Settings';
import axios from 'axios';
import HTML from "react-native-render-html";

const hardData = {
    id: 1,
    title: 'Mexican Coffee',
    description: 'Mexican coffee is almost the same as Irish coffee, except it uses Mexican',
    url: require('../assets/banners/food-banner1.jpg'),
}; 

function RecipeCard(props) {

    const[summary, setSummary] = useState(null);

    useEffect(() => {
        if (props.isSummary) {
            axios.get(`${Settings.URL}${props.id}/summary?apiKey=${Settings.API_KEY2}`)
            .then(async (res) => await setSummary(res.data.summary))
            .catch(e => console.log(e.message))
        }
    }, []);

    

    return (
        <Card 
        style={styles.container}
        header={() =>
        <TouchableOpacity onPress={props.handlePress} >
            {props.fromRecipe? <Image source={{uri: props.imageURL}} resizeMode="contain" style={styles.imageStyle}/>
            : <Image source={{uri: `https://spoonacular.com/recipeImages/${props.imageURL}`}} resizeMode="contain" style={styles.imageStyle}/>
            }
             
        </TouchableOpacity>
        }
        >
            <View style={styles.headerView}>
            <Text style={styles.headerText}>{props.title.length <= 21? props.title: props.title.substring(0, 21)+'..'}</Text>
            
            <HeartReact/>

            </View>
            {/* <Text style={styles.descriptionText} numberOfLines={3}>{summary}</Text> */}
            {props.isSummary &&
                <HTML 
              source={{ html: summary.substring(0, 150)+'...' }}
              baseFontStyle={{fontFamily: "Nexa Regular"}}
              />
            }
            <StarRatings />
        </Card>
    )
}

export default RecipeCard;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 20,
      borderRadius: 10,
      
      borderBottomWidth: 1,
      elevation: 10, // Android
    },
    imageStyle: {
        height: 250,
        width: 400,
        alignSelf: "center"
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    headerText: {
        fontFamily: 'Nexa Bold',
        fontSize: 28,
        marginBottom: 10,
        marginTop: 10
    },
    descriptionText: {
        fontFamily: 'Nexa Regular',
        fontSize: 16,
    }
});
