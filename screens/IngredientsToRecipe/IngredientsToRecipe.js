import * as React from 'react';
import { Chip } from 'react-native-paper';
import { StyleSheet, ScrollView, Keyboard, LogBox} from 'react-native';
import { ApplicationProvider, Layout, Text, Divider, Spinner, Input, Button } from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RecipeResults from './RecipeResults';
import {windowHeight, windowWidth} from '../../utils/Dimentions';
import TopNav from '../../components/TopNav';
import Theme from '../../constants/Theme';

    
LogBox.ignoreAllLogs()

const IngredientsToRecipe = ({navigation}) => {

  const [ingredients, setIngredients] = React.useState([]);

  const [value, setValue] = React.useState('')

  const addIngredient = async() => {
    await setIngredients([
      ...ingredients, value
    ]);
    setValue('');
    console.log(ingredients);
  }

  const removeIngredient = async(ing) => {
    await setIngredients(() => ingredients.filter(item => item != ing));
  }

  const handleSearchPress = () => {
    Keyboard.dismiss();
    navigation.navigate('RecipeResults', {ingredients: ingredients});
  }

  // React.useEffect(()=>{
  //   navigation.reset({
  //     index: 0,
  //     routes: [{name: 'IngredientScreen'}],
  //     key: null,
  //   }); 
  // }, [])
  return (
    <Layout style={{flex: 1}}>
        <TopNav navigation={navigation} screenTitle="Make Recipes"/>
  <Layout style={styles.container}>
    <Layout style={styles.row}>
      <Input 
        style={styles.inputContainer}
        size="medium"
        placeholder="Enter ingredients"
        textStyle={styles.inputText}
        onChangeText={item => setValue(item)}
        onEndEditing={e => addIngredient()}
        value={value}

      />
      <Button 
        onPress={() => addIngredient()}
        disabled={value===''}
        size="small"
        style={{borderRadius: 50, marginLeft: 3, backgroundColor: Theme.COLORS.PRIMARY, borderColor:Theme.COLORS.PRIMARY}}
      >
        <Text style={styles.buttonText}>Add</Text>
      </Button>
    </Layout>

      <ScrollView>
        <Layout style={styles.row}>
        {ingredients.map((item, index) => 
        
        <Chip
          mode="outlined"  
          key={index}
          onClose={() => removeIngredient(item)}
          >
          <Text style={{fontFamily: "Nexa Regular", fontSize: 18}}>{item}</Text>
      </Chip>
        )
      }
      </Layout>
      </ScrollView>

      {ingredients.length > 0 ? 
      <Button
      style={styles.buttonContainer}
      accessoryLeft={() => <AntDesign name="search1" size={24} color='white'/>}
      onPress={() => handleSearchPress()}
      >
      <Text style={styles.buttonText}>Get Recipes</Text>
      </Button> : null}
      
  </Layout>
  </Layout>
  );
}

export default IngredientsToRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Nexa Bold",
    color: "white"
  },
  inputContainer: {
    width: '80%',
    height: windowHeight / 15,
    flexDirection: 'row',
    borderRadius: 50,
    margin: 5,
    opacity: 0.9
  },
  buttonContainer: {
    // paddingTop: 10,
    width: '90%',
    height: windowHeight / 12.5,
    backgroundColor: Theme.COLORS.PRIMARY,
    borderColor:Theme.COLORS.PRIMARY,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },  
  inputText : {
    fontFamily: 'Nexa Regular'
  }
});