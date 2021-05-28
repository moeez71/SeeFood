import * as React from 'react';
import { StyleSheet,  SafeAreaView, LogBox} from 'react-native';
import { Layout,List, } from '@ui-kitten/components';
import Settings from '../../Settings';
import BurgerLoader from '../../components/loaders/BurgerLoader';
import TopNavWithBack from '../../components/TopNavWithBack';
import RecipeCard from '../../components/RecipeCard';
import { AuthContext } from '../../navigation/AuthProvider';
import axios from 'axios';

import config_ip from "../../config_ip"


// LogBox.ignoreAllLogs()


// const ViewPagerSimpleUsageShowcase = () => {

//     const [selectedIndex, setSelectedIndex] = React.useState(0);
  
//     return (
//       <ViewPager
//         selectedIndex={selectedIndex}
//         onSelect={index => setSelectedIndex(index)}>
//         <RecipesSearched 
//             title={item.title} 
//             source={{uri: `https://spoonacular.com/recipeImages/${item.image}`}}
//             ready={item.readyInMinutes}
//             servings={item.servings}
//             onPress={() => alert('im clicked!')}
//         />
//       </ViewPager>
//     );
//   };

const data = new Array(20).fill({
    title: 'Title for Item',
    description: 'Description for Item',
  });

const RecipeResults = ({navigation, route}) => {

    const [isLoading, setIsLoading] = React.useState(true);
    const [recipes, setRecipes] = React.useState([]);
    const [activeSlide, setActiveSlide] = React.useState(0);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const [savedRecipes, setSavedRecipes] = React.useState([]);

    const{userData} = React.useContext(AuthContext);
    
    const getRecipes = async() => {

        var ingredients= route.params.ingredients;
        var ingredientString = ingredients.join(',');
        console.log(ingredientString);
        try{
            const req = await fetch(`${Settings.URL}search?query=${ingredientString}&number=5&instructionsRequired=true&apiKey=${Settings.API_KEY2}`);
            // const req = await fetch(`${Settings.URL}findByIngredients?ingredients=${ingredientString}&limitLicense=true&number=100&ranking=2&ignorePantry=true&apiKey=${Settings.API_KEY}`);
            const result = await req.json();
            console.log(result.results);
            await setRecipes(result.results);
           
        }
        catch(err){
            console.log(err)
        }
        finally{
            // this.setState({isLoading: false});
            setIsLoading(false);
        }
    }

    const getSavedRecipesFromDb = async() => {
      axios.get(`http://${config_ip.DEFAULT_IP}/recipe/find/${userData.uid}`)
      .then(async res => {
        // console.log(res.data.recipes);
        let tmp = res.data.recipes.map(item => item.recipeId);
        // console.log(tmp);
        await setSavedRecipes(tmp);
    
      })
      .catch(e => console.error(e.message));
    }

    const saveQueryToDB = () => {
      let ingredients= route.params.ingredients;
      let ingredientString = ingredients.join(',');

      let bodyData = {
        uid: userData.uid,
        searchQuery: ingredientString
      };
  
      axios.put(`http://${config_ip.DEFAULT_IP}/search/add`, bodyData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
      })
      .then(res => console.log(res.data))
      .catch(e => console.error(e.message));
    }

    React.useEffect(() => {
      saveQueryToDB();
      getSavedRecipesFromDb();
      getRecipes();
    }, []);

    
      const renderItem = ({ item, index }) => (
        <RecipeCard 
        title={item.title} 
        imageURL={item.image}
        isSummary={false}
        key={index}
        id={item.id}
        savedRecipes={savedRecipes}
        handlePress={() => navigation.navigate('Instructions', {
                                                                            id: item.id, 
                                                                            title: item.title, 
                                                                            servings: item.servings,
                                                                            readyInMinutes: item.readyInMinutes,
                                                                            img: item.image
                                                                        })}  
        />
      );
    return (
        <SafeAreaView style={{flex: 1}}>
            <TopNavWithBack navigation={navigation} screenTitle="Recipes"/>
          <Layout style={styles.container}>
          {
            isLoading? <BurgerLoader/>
            : 
              <List
              style={styles.tab}
              data={recipes}
              renderItem={renderItem}
              />
          }
          </Layout>
        </SafeAreaView>
    );
}

export default RecipeResults;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        // backgroundColor: 'red'
    },
    tab: {
        height: 192,
        backgroundColor: "white"
      },
      row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 20,
        width: '100%',
        justifyContent: 'space-between',
        padding: 5
      },
      innerRow: {
        flexDirection: 'row',
        borderRadius: 20,
      },
})
