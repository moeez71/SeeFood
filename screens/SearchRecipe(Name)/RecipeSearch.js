import * as React from 'react';
import { StyleSheet, ScrollView, Keyboard, LogBox, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import { ApplicationProvider, Layout, Text, Divider, Spinner, Input, Button, List } from '@ui-kitten/components';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Settings from '../../Settings';
import {windowHeight, windowWidth} from '../../utils/Dimentions';
import TopNav from '../../components/TopNav';
import BurgerLoader from '../../components/loaders/BurgerLoader';
import RecipeCard from '../../components/RecipeCard';
import axios from 'axios';
import { AuthContext } from '../../navigation/AuthProvider';

const RecipeSearch = ({navigation, route}) => {

  const[isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState('');
  const[image, setImage] = React.useState(null);
  const [recipes, setRecipes] = React.useState([]);
  const [savedRecipes, setSavedRecipes] = React.useState([]);
  const{userData} = React.useContext(AuthContext);

  const getRecipes = async() => {

    const{food} = value;
    setIsLoading(true);
    try{
        const req = await fetch(`${Settings.URL}complexSearch?query=${value}&number=5&apiKey=${Settings.API_KEY2}`);
        const result = await req.json();
        // console.log(result.results);
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
    axios.get(`http://192.168.0.104:5010/recipe/find/${userData.uid}`)
    .then(async res => {
      // console.log(res.data.recipes);
      let tmp = res.data.recipes.map(item => item.recipeId);
      // console.log(tmp);
      await setSavedRecipes(tmp);

    })
    .catch(e => console.error(e.message));
  }

  const handleSearch = () => {
    Keyboard.dismiss();
    getRecipes();
    
  }

  React.useEffect(() => {
    getSavedRecipesFromDb();
  }, []);

  const renderIcon = (props) => (
    <TouchableOpacity 
    onPress={()=>navigation.navigate('CameraNew', {changeValue: setValue, searchPress: getRecipes})}
    >
      <Ionicon name='camera-outline' size={25}/>
    </TouchableOpacity>
  );

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

  const handleTextChange = (item) => {
    setValue(item);
    if (value.length < 1)
        setRecipes([]);
  }


  if (isLoading)
      return (<BurgerLoader />);

  return (
    <SafeAreaView style={{flex: 1}}>
        <TopNav navigation={navigation} screenTitle="Make Recipes"/>
  <Layout style={styles.container}>
    
      <Input 
        style={styles.inputContainer}
        size="large"
        placeholder="Enter food name"
        textStyle={styles.inputText}
        // onChange={e => handleTextChange(e.nativeEvent.text)}
        onChangeText={item => handleTextChange(item)}
        value={value}
        accessoryRight={renderIcon}
        onSubmitEditing={()=>handleSearch()}

      />
        <List
              style={styles.tab}
              data={recipes}
              renderItem={renderItem}
              />
      
  </Layout>
  </SafeAreaView>
  );
}

export default RecipeSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // padding: 10,
    // backgroundColor: 'red'
  },
  inputContainer: {
    marginLeft: '4%',
    width: '90%',
    height: windowHeight / 15,
    flexDirection: 'row',
    borderRadius: 50,
    margin: 5,
    opacity: 0.9
  },
  imageContainer: {
    flex: 4,
    alignItems: 'center',

  },
  tab: {
    height: 192,
    backgroundColor: "white",
    marginRight: 10
  },
  inputText : {
    fontFamily: 'Nexa Regular'
  }
});