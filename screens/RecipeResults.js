import * as React from 'react';
import { Chip } from 'react-native-paper';
import { StyleSheet, ScrollView, SafeAreaView, View, Image, FlatList} from 'react-native';
import { ApplicationProvider, Layout, Text, Divider, Spinner, Avatar, Input, Button, ViewPager, Icon, List, ListItem } from '@ui-kitten/components';
import Settings from '../public/Settings';
import CardView from 'react-native-cardview'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import RecipesSearched from '../components/RecipesSearched';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
            const req = await fetch(`${Settings.URL}search?query=${ingredientString}&number=10&instructionsRequired=true&apiKey=${Settings.API_KEY}`);
            const result = await req.json();
            // console.log(result.results);
            await setRecipes(result.results);
            // for(let item of result.results){
            //     setRecipes([...recipes, item]);
            //     setRecipeCount(recipeCount + 1);
            //     console.log(item);
            //     // this.state.recipes.push(items);
            // }
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

    const renderItemAccessory = (props) => (
        <AntDesign name="right" color="#567" size={18}/>
      );
    
      const itemImg = ({image, ...rest}) => (
        <Layout style={{ width: 200, height: 150}}>
                <Image 
                style={styles.img} 
                resizeMode='contain' 
                source={{uri: `https://spoonacular.com/recipeImages/${item.image}`}}
                {...rest}
                />
        </Layout>
        );
    
      const renderItem = ({ item, index }) => (
        <ListItem
          title={`${item.title}`}
          description={`${item.servings} ${index + 1}`}
        //   accessoryLeft={<Avatar source={require('./yoda.jpeg')}/>}
          accessoryRight={renderItemAccessory}
          ItemSeparatorComponent={<Divider />}
          onPress={() => navigation.navigate('Instructions', {
                                                                            id: item.id, 
                                                                            title: item.title, 
                                                                            servings: item.servings,
                                                                            readyInMinutes: item.readyInMinutes,
                                                                            img: item.image
                                                                        })}
        >
        <Layout 
        level='3'
        style={styles.row}>
        <Layout level='3' style={styles.innerRow}>
            <Avatar source={{uri: `https://spoonacular.com/recipeImages/${item.image}`}}/>
            <Text> {item.title}</Text>  
        </Layout>   
            <AntDesign name="right" color="#567" size={18}/>                                                           
        </Layout>
        </ListItem>
      );

    return (
        <Layout style={styles.container}>
        {isLoading? <Spinner /> : 
            <List
            style={styles.tab}
            data={recipes}
            renderItem={renderItem}
            />
        }
        </Layout>
    );
}

export default RecipeResults;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    tab: {
        height: 192,
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
