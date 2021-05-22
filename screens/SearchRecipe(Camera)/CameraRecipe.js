import React, {useState, useEffect}  from 'react';
import { Icon, Input, Spinner, Layout } from '@ui-kitten/components';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { View, TouchableWithoutFeedback, Text, StyleSheet, FlatList, Keyboard, ScrollView, TouchableOpacity, Button, Image, Linking , LogBox } from 'react-native';
import TopNavWithBack from '../../components/TopNavWithBack';

// LogBox.ignoreAllLogs()


const CameraRecipe= ({navigation, route}) => {

    const App_Id = "8a8af900";
    const App_Key = "213e4d7c875a4c51c5c700b3a059ce9e";
    const foodName = route.params.foodName;
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [alert, setAlert] = useState("");
    const [img, setImg]= useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const url = `https://api.edamam.com/search?q=${foodName}&app_id=${App_Id}&app_key=${App_Key}&from=0&to=30`;

    const fetchAPI = async ()=> {
        console.log(foodName);
        setIsLoading(true);
        return await fetch(url)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            setIsLoading(false);
            setRecipes(result.hits);
          //setImg(result.hits[0].recipe.uri)
         //console.log(recipes.recipe)
         setQuery("");
         setAlert("");
        }
        )
        .catch((error) => {
          console.error(error);
        });
    }

    useEffect(()=> {
        fetchAPI();
    }, []);

      
    return(

    <Layout style={{flex:1}}>
    <TopNavWithBack navigation={navigation} screenTitle="Recipes"/>
    <Layout style = {styles2.MainContainer}>

    {isLoading? <Layout style = {styles2.MainContainer}><Spinner /></Layout>: 
    
    <Layout style= {{borderWidth: 2,borderColor: '#008b8b', padding: 1, margin: 5,backgroundColor:'#f0f8ff' }}>
        <ScrollView  
            keyboardShouldPersistTaps={'handled'}>
              {recipes.map(({recipe}, id) =>
              <TouchableOpacity
              
                key={id}
                activeOpacity={0.7}
               // {...console.log(recipe.image)}
                onPress = {() => 
                
                navigation.navigate("2",{Recipe: recipe})}
                
                >
                
            <Layout style={styles.scrollviewItem}>
            
              <Text  style={styles.scrollviewText}  numberOfLines = {2}>{id+1}) {recipe.label}</Text>
              <Image style={{width: 80,height: 80,resizeMode: 'cover'}} source={{uri: recipe.image}}></Image>
                <TouchableOpacity
                  
              >
                
              </TouchableOpacity>

              
            </Layout>
          </TouchableOpacity>
        )}
      </ScrollView>  
    </Layout>
    }
    </Layout>
    </Layout>
    )
}
export default CameraRecipe;




const styles2 = StyleSheet.create({
 
    MainContainer: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center'
    //   backgroundColor: '#ffff',
    },
   
    row: {
      fontSize: 15,
      padding: 15
    },
   
    textInput: {
      textAlign: 'center',
      height: 42,
      borderWidth: 2,
      borderColor: '#008b8b',
      borderRadius: 120,
      backgroundColor: "#FFFF",
    }
  });

  const styles = StyleSheet.create({
    crosstextcontainer: {
      backgroundColor: 'red',
      borderRadius: 50,
      padding: 5,
      width: 30,
      justifyContent: 'center',
      alignItems: 'center'
    },
    crosstext: {
      fontSize: 16,
      color: 'red',
      fontWeight: "bold"
    },
    scrollviewText2: {
      flex: 2,
      fontSize: 26,
      color: 'white',
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid'
    },
    scrollviewText: {
      flex: 1,
      fontSize: 20,
      color: 'black',
      
    },
    scrollview: {
      paddingTop: 20,
      width: '100%'
    },
    scrollviewItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: '#faebd7',
      alignSelf: "flex-start",
      padding: 1,
      margin: 5,
      width: '100%',
      borderRadius: 10
    },
    title: {
      fontSize: 64,
      color: 'lightgrey'
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 40
    },
    inputContainer: {
      flexDirection: "row",
      width: '70%',
      justifyContent: "space-between",
      alignItems: "center"
    },
    textInput: {
      borderColor: 'red',
      //borderWidth: 2,
      borderBottomWidth: 2,
      width: '100%',
      // borderRadius: 50,
      fontSize: 16,
      padding: 10
    }
  })