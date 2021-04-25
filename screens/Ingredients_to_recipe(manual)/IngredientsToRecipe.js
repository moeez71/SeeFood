import * as React from 'react';
import { Chip } from 'react-native-paper';
import { StyleSheet, ScrollView, Keyboard, LogBox} from 'react-native';
import { ApplicationProvider, Layout, Text, Divider, Spinner, Input, Button } from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RecipeResults from './RecipeResults';
import TopNav from '../../components/TopNav';

    
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

  return (
    <Layout style={{flex: 1}}>
        <TopNav navigation={navigation} screenTitle="Make Recipes"/>
  <Layout style={styles.container}>
    <Layout style={styles.row}>
      <Input 
        style={{width: '80%'}}
        size="medium"
        placeholder="Enter ingredients"
        onChangeText={item => setValue(item)}
        value={value}

      />
      <Button 
        onPress={() => addIngredient()}
        disabled={value===''}
        size="small"
        style={{borderRadius: 10, marginLeft: 3}}
      >
        Add
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
          <Text>{item}</Text>
      </Chip>
        )
      }
      </Layout>
      </ScrollView>

      {ingredients.length > 0 ? 
      <Button
      accessoryLeft={() => <AntDesign name="search1" size={24} color='white'/>}
      onPress={() => handleSearchPress()}
      >
      Get Recipes</Button> : null}
      
  </Layout>
  </Layout>
  );
}

export default IngredientsToRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10
  },
});