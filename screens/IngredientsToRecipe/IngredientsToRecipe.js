import * as React from 'react';
import { Chip } from 'react-native-paper';
import { StyleSheet, ScrollView, Keyboard, LogBox, SafeAreaView, TouchableOpacity, Image, ImageBackground} from 'react-native';
import { ApplicationProvider, Layout, Text, Divider, Spinner, Input, Button } from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RecipeResults from './RecipeResults';
import {windowHeight, windowWidth} from '../../utils/Dimentions';
import TopNav from '../../components/TopNav';
import Theme from '../../constants/Theme';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import BurgerLoader from '../../components/loaders/BurgerLoader';
import Ionicon from 'react-native-vector-icons/Ionicons';
import CloseButton from '../../components/CloseButton';


    
// LogBox.ignoreAllLogs()

const IngredientsToRecipe = ({navigation}) => {

  const [ingredients, setIngredients] = React.useState([]);
  const[isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState('');
  const[image, setImage] = React.useState(null);

  const addIngredient = async() => {
    await setIngredients([
      ...ingredients, value
    ]);
    setValue(null);
    console.log(ingredients);
  }

  const removeIngredient = async(ing) => {
    await setIngredients(() => ingredients.filter(item => item != ing));
  }

  const handleSearchPress = () => {
    Keyboard.dismiss();
    navigation.navigate('RecipeResults', {ingredients: ingredients});
  }

  const renderIcon = (props) => (
    <TouchableOpacity 
    onPress={
      ()=>openCamera()
      // ()=>classifyImg(image)
      }
    >
      <Ionicon name='camera-outline' size={25}/>
    </TouchableOpacity>
  );

  const axiosClient = axios.create({
    baseURL: 'http://192.168.43.123:3000',
    timeout: 50000, //50 seconds
  });

  const openCamera = async() => {
    
    let response = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1.0
    })
    await setImage({
        uri: response.uri
    });
    console.log(response);
    classifyImg(response);

}

const classifyImg = (imgData) => {
        
  const uri = imgData.uri;
  let data = new FormData();
  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  data.append('file', {
      uri: uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
  });
  console.log('fetching!!')
  console.log(data);
  setIsLoading(true);
  axiosClient.get("/ping")
  .then(res=> console.log(res.data))
  .catch(e => console.log(e))
  // setIsLoading(false);

  axiosClient.post('/api/predict', data, {
      headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'

      }
  })
  .then(async(res) => {
      await setImage(res.data.image);
      await console.log(res.data.detections);
      await setIngredients(res.data.detections);
      setIsLoading(false);
  })
  .catch(e => {
      console.log(e)
      setIsErr(true);
  })

}

const handleCloseBtn = () => {
  setImage(null);
  setIngredients([]);
}
  if (isLoading)
      return (<BurgerLoader />);

  return (
    <SafeAreaView style={{flex: 1}}>
        <TopNav navigation={navigation} screenTitle="Make Recipes"/>
  <Layout style={styles.container}>
    <Layout style={styles.row}>
      <Input 
        style={styles.inputContainer}
        size="medium"
        placeholder="Enter ingredients / Capture image"
        textStyle={styles.inputText}
        onChangeText={item => setValue(item)}
        onEndEditing={e => addIngredient()}
        value={value}
        accessoryRight={renderIcon}

      />
      <Button 
        onPress={() => addIngredient()}
        disabled={value===''}
        size="small"
        style={{borderRadius: 50, marginLeft: 3, marginTop: 2, backgroundColor: Theme.COLORS.PRIMARY, borderColor:Theme.COLORS.PRIMARY, width: 50, height: 50}}
      >
        <Text style={styles.addBtnText}>+</Text>
      </Button>
    </Layout>
      {
        image !== null && <TouchableOpacity style={styles.imageContainer}>
          
          <ImageBackground source={{uri: `data:image/gif;base64,${image}`}} style={{height: 400, width: 400,  resizeMode: "center"}}>
            <CloseButton onPressHandle={() => handleCloseBtn()}/>
          </ImageBackground>
      </TouchableOpacity>
      }
      

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
  </SafeAreaView>
  );
}

export default IngredientsToRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 50,
    backgroundColor: "transparent"
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Nexa Bold",
    color: "white"
  },
  addBtnText: {
    fontSize: 40,
    fontFamily: "Nexa Regular",
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
  imageContainer: {
    flex: 4,
    alignItems: 'center',
    // marginTop: 0
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