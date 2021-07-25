import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, RefreshControl } from 'react-native';
import BurgerLoader from '../../components/loaders/BurgerLoader';
import TopNav from '../../components/TopNav';
import { Layout, List } from '@ui-kitten/components';
import RecipeCard from '../../components/RecipeCard';
import { AuthContext } from '../../navigation/AuthProvider';
import axios from 'axios';
import Settings from '../../Settings.js';

import config_ip from "../../config_ip"


function Favourites({navigation}) {
    const[loading, setLoading] = React.useState(false);
    const{userData} = React.useContext(AuthContext);
    const [savedRecipes, setSavedRecipes] = React.useState([]);
    const [recipes, setRecipes] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    
    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      await setRecipes([]);
      axios.get(`http://192.168.190.98:3000/recipe/find/${userData.uid}`)
        .then(async res => {
          let tmp = await res.data.recipes.map(item => item.recipeId);
          await setSavedRecipes(tmp);
          for(const item of tmp) {
            axios.get(`${Settings.URL}${item}/information?apiKey=${Settings.API_KEY}`)
            .then(async res => {
                await setRecipes(arr => [...arr, res.data]);
            })
            .catch(e => {
                console.error(e.message);
            })
          }
          setLoading(false)
    
        })
        .catch(e => console.error(e.message));
      setRefreshing(false);
      }, [refreshing]);
    
    const getSavedRecipesFromDb = async() => {
        setLoading(true);
        axios.get(`http://192.168.190.98:3000/recipe/find/${userData.uid}`)
        .then(async res => {
          // console.log(res.data.recipes);
          let tmp = await res.data.recipes.map(item => item.recipeId);
          // console.log(tmp);
          await setSavedRecipes(tmp);
          for(const item of tmp) {
            axios.get(`${Settings.URL}${item}/information?apiKey=${Settings.API_KEY}`)
            .then(async res => {

                await setRecipes(arr => [...arr, res.data]);
                // setLoading(false);
            })
            .catch(e => {
                console.error(e.message);
            })
          }
          // await setRecipes(foodArr);
          setLoading(false)
    
        })
        .catch(e => console.error(e.message));
      }
      useEffect(() => {
        getSavedRecipesFromDb();
      }, []);
    const renderItem = ({ item, index }) => (
        <RecipeCard 
        title={item.title} 
        imageURL={item.image}
        isSummary={false}
        key={index}
        id={item.id}
        fromRecipe={true}
        subtitle={item.summary}
        savedRecipes={savedRecipes}
        handlePress={() => navigation.navigate('Instructions', {
                                                                            id: item.id, 
                                                                            title: item.title, 
                                                                            img: item.image,
                                                                            fromRecipe: true
                                                                        })}  
        />
      );


    if (loading)
        return (<BurgerLoader />)
    return (
        <SafeAreaView style={{flex: 1}}>
            <TopNav navigation={navigation} screenTitle="Favourites"/>
            <Layout style={styles.container}>
            <List
              style={styles.tab}
              data={recipes}
              renderItem={renderItem}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              />
        </Layout>
        </SafeAreaView>
    )
}

export default Favourites;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   alignItems: 'center',

    },
    tab: {
        height: 192,
        backgroundColor: "white",
        marginRight: 10
      },
});