import * as React from 'react';
import { Chip } from 'react-native-paper';
import { StyleSheet, ScrollView, SafeAreaView, View, Image, FlatList, LogBox} from 'react-native';
import { ApplicationProvider, Layout, Text, Divider, Spinner, Avatar, Input, Button, ViewPager, Icon, List, ListItem } from '@ui-kitten/components';
import Settings from '../../Settings';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BurgerLoader from '../../components/loaders/BurgerLoader';
import TopNavWithBack from '../../components/TopNavWithBack';
import RecipeCard from '../../components/RecipeCard';

LogBox.ignoreAllLogs()


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

    
    const getRecipes = async() => {

        var ingredients= route.params.ingredients;
        var ingredientString = ingredients.join(',');
        console.log(ingredientString);
        try{
            const req = await fetch(`${Settings.URL}search?query=${ingredientString}&number=5&instructionsRequired=true&apiKey=${Settings.API_KEY}`);
            // const req = await fetch(`${Settings.URL}findByIngredients?ingredients=${ingredientString}&limitLicense=true&number=100&ranking=2&ignorePantry=true&apiKey=${Settings.API_KEY}`);
            const result = await req.json();
            console.log(result.results);
            await setRecipes(result.results);
           
            console.log(recipeCount);
        }
        catch(err){
            console.log(err)
        }
        finally{
            // this.setState({isLoading: false});
            setIsLoading(false);
        }
    }


    React.useEffect(() => {
        getRecipes();
    }, []);

    
      const renderItem = ({ item, index }) => (
        <RecipeCard 
        title={item.title} 
        imageURL={item.image}
        key={index}
        id={item.id}
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
