import React, { Component } from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet, Dimensions, FlatList, ActivityIndicator, ScrollView, LogBox } from 'react-native';
import Settings from '../../Settings';
import InstructionsComponent from '../../components/instructionsComponent';
import IngredientsComponent from '../../components/ingredientsComponent';
import TopNavWithBack from '../../components/TopNavWithBack';
import axios from 'axios';
import HTML from "react-native-render-html";



const screenHeight = Math.round(Dimensions.get('window').height);

const htmlContent = `<div class="spoonacular-caption">Quickview</div><div class="spoonacular-quickview">112 Calories</div><div class="spoonacular-quickview">18g Protein</div><div class="spoonacular-quickview">2g Total Fat</div><div class="spoonacular-quickview">1g Carbs</div><div class="spoonacular-quickview">5% Health Score</div>`;

// LogBox.ignoreAllLogs()

export default class Instructions extends Component {
  constructor(props){
    super(props);
    
    this.state = { 
      isLoading: true,
      info: [],
      instructions: [],
      ingredients: [],
      nutritionInfo: htmlContent
    }
  }

  async getInstructions() {
    const { id } = this.props.route.params;
    try{
      const reqInfo = await fetch(`${Settings.URL}${id}/information?apiKey=${Settings.API_KEY}`);
      const resInfo = await reqInfo.json();
      for (const item of resInfo.extendedIngredients) {
        this.state.ingredients.push(item);
      }
      for (const item of resInfo.analyzedInstructions[0].steps) {
        this.state.instructions.push(item);
      }
      this.state.info.push(resInfo.aggregateLikes, resInfo.vegetarian)
    }
    catch(err){
      console.log(err)
    }
    finally{
      this.setState({isLoading: false})
    }
  }

  async getNutritionInfo() {
    const { id } = this.props.route.params;
    axios.get(`${Settings.URL}${id}/nutritionWidget?apiKey=${Settings.API_KEY2}`)
    .then(res => {
      console.log(res.data)
      this.setState({
      nutritionInfo: res.data.substring(34, 330)
    })
  }
    )
    
    .catch(e => console.error(e))
  }
  componentDidMount(){
    this.getInstructions();
    this.getNutritionInfo();
  }

  renderItem({ item }) {
    return (
      <IngredientsComponent 
        key={item.id}
        name={item.original}
        source={{uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}}
      />
    );
  }

  renderInstruction({item}) {
    return(
      <InstructionsComponent 
        number={item.number}
        step={item.step}
      />
    )
  }

  render() {
    const { img, title, servings, readyInMinutes, fromRecipe } = this.props.route.params;
    return (
      <SafeAreaView style={{flex:1}}>
        <View style={{flex:1}}>
          <TopNavWithBack navigation={this.props.navigation} screenTitle="Instructions" />
          <View style={styles.header}>
            {fromRecipe? <Image style={styles.img} source={{uri: img}}/> :  
            <Image style={styles.img} source={{uri: `https://spoonacular.com/recipeImages/${img}`}}/>
            }
            
          </View>
          <ScrollView style={styles.containerInfo}>
            <View style={{borderWidth: 3, alignSelf: 'center', width: 65, borderColor: 'rgba(219, 219, 219, 0.8)', borderRadius: 5, marginTop: 16}}/>
            <View style={{marginHorizontal:50}}>
              <Text style={styles.title}>{title}</Text>
              <View style={[styles.horizontal, {marginTop:16, justifyContent:'space-around'}]}>
                <View  style={styles.horizontal}>
                  <Text style={styles.subtitle}>servings: </Text>
                  <Text style={styles.answer}>{servings}</Text>
                </View>
                <View style={styles.horizontal}>
                  <Text style={styles.subtitle}>Ready in: </Text>
                  <Text style={styles.answer}>{readyInMinutes} min</Text>
                </View>
              </View>   
              <Text style={{...styles.title, fontSize: 22}}>Ingredients</Text>
            </View>
            {this.state.isLoading ? <ActivityIndicator /> : (
              <View style={styles.flat}>
                <FlatList 
                  showsVerticalScrollIndicator={false}
                  data={this.state.ingredients}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.id}
                />
              </View>
            )}
            <Text style={{...styles.title, fontSize: 22, fontFamily: "Nexa Bold"}}>Instructions</Text>
            {this.state.isLoading ? <ActivityIndicator /> : (
              <View style={styles.flat}>
                <FlatList 
                  showsVerticalScrollIndicator={false}
                  data={this.state.instructions}
                  renderItem={this.renderInstruction}
                  keyExtractor={item => item.id}
                />
              </View>
            )}
            <Text style={{...styles.title, fontSize: 22, fontFamily: "Nexa Bold"}}>Nutrition Info</Text>
            {/* <Text>{this.state.nutritionInfo}</Text> */}
            {/* <WebView
              originWhitelist={['*']}
              source={{ html: '<h1>Hammad</h1>' }}
            /> */}
            <ScrollView horizontal={true}>
              <HTML 
              source={{ html: this.state.nutritionInfo }} 
              containerStyle={{width: '80%', alignItems: 'center', flexDirection: "row", justifyContent: 'center', height: 100}}
              classesStyles={{'spoonacular-quickview': {
                borderWidth: 1, borderColor: "black", margin: 2, padding: 3, fontFamily: "Nexa Regular", borderRadius: 50, marginBottom: 10
              },
              'spoonacular-caption':{
                display: 'none'
              }
              }}  
              />
            </ScrollView>
            
            
          </ScrollView>
          </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 300,  
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  containerInfo: {
    width: '100%',
    marginTop: -150,
    height: screenHeight - 150,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nexa Bold',
    color: '#1B1B13',
    textAlign: 'center',
    marginTop: 24
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Nexa Regular',
    color: '#000'  
  },
  answer: {
    fontSize: 16,
    fontFamily: 'Nexa Light',
    color: '#000'
  },
  horizontal: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  flat: {
    marginHorizontal:24, 
    marginTop: 24, 
    marginBottom: 24, 
    flex: 1
  }
})