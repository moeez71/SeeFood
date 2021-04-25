import React, {useState, useEffect, useContext}  from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Keyboard, ScrollView, TouchableOpacity, Button, LogBox } from 'react-native';

import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../navigation/AuthProvider';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import { createStackNavigator } from '@react-navigation/stack';

import { Layout} from '@ui-kitten/components';
import TopNav from '../../components/TopNav';


const Stack = createStackNavigator();

LogBox.ignoreAllLogs()

const PantryNavigator = ({navigation}) => {
  return (
   <Stack.Navigator 
   headerMode='none'
     screenOptions = {({navigation}) => ({
    //  title : "Pantry List", 
    //  headerTintColor: "black",
    //  headerStyle: {backgroundColor: "#ffff"},
   })}
 >
   <Stack.Screen name="1" component={PantryScreen} />
  
 </Stack.Navigator>
  )
}




const PantryScreen = ({navigation}) => {
    const {user} = useContext(AuthContext);
    const [people, setpeople] = useState([
        {name: "moeez"},
        {name: "waleed"}
    ])

    const [getGot ,setgot] = useState([]);
    const [getWant, setwant] = useState([]);
    const [getText, setText] = useState('');
    const [getTransfer, setTransfer] = useState([]);

    const requestOptions = {
      method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json'
       },
      body: JSON.stringify({
       id: user.uid,
       getgot:  getGot,
       getwant: getWant
      })
  };
    const fetchAPI2 = async () => {
    return await fetch('http://192.168.23.98:3000/pantry/adduser1', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
  }
 
      saveData = async () => {
       try {
        await AsyncStorage.setItem(user.uid, JSON.stringify(getWant))
        // console.log(getWant)
         alert('Data successfully saved')
         //fetchAPI2()
       } catch (e) {
         alert('Failed to save the data to the storage')
       }
        NetInfo.fetch().then(state => {
         if (state.isConnected === true) {
           fetchAPI2()
           alert("You are online in save!");
           //readDataMongo()
           
         } else {
           alert("You are offline in save 2!");
           //readData()
           //readData2()
         }
       })

       
     }

        readData = async () => {
        try {
          const userData= await AsyncStorage.getItem(user.uid)
          const userData2 = JSON.parse(userData)
          if (userData2 !== null) {
           // console.log(userData2)
            setwant(userData2)
            
          }

        } catch (e) {
        alert('Failed to fetch the data from storage')
        }
      }


       saveData2 = async () => {
        try {                 //user,uid+12 is for maintaining boughtitems record for a user
         await AsyncStorage.setItem(user.uid+"12", JSON.stringify(getGot))
          console.log(getGot)
          console.log("save2chalpaya")
          //fetchAPI2()
          alert('Data successfully saved get got kdsk')
        } catch (e) {
          alert('Failed to save the data to the storage')
        }
        NetInfo.fetch().then(state => {
          if (state.isConnected === true) {
            fetchAPI2()
            alert("You are online in save!");
            //readDataMongo()
            
          } else {
            alert("You are offline in save 2!");
            //readData()
            //readData2()
          }
        })
      }
 
      readData2 = async () => {
         try {
           
           const userData= await AsyncStorage.getItem(user.uid+"12")
           const userData2 = JSON.parse(userData)
           if (userData2 !== null) {
             //console.log(userData2)
             setgot(userData2)
             
           }
         } catch (e) {
         alert('Failed to fetch the data from storage read  2')
         }
       }

       const readDataMongo = async () => {
       //  const uri = `http://localhost:3000/pantry/pantry/${user.uid}`
       const uri = `http://192.168.23.98:3000/pantry/pantry/uO6WUKFb0paef644AoGzliM6OjC2`
          return await fetch(uri)
          .then((response) => response.json())
          .then((result) => {
           console.log(result)
           // setRecipes(result.hits);
            //setImg(result.hits[0].recipe.uri)
           //console.log(recipes.recipe)
           //setQuery("");
           //setAlert("");
           setwant(result.getwant)
           setgot(result.getgot)
          }
          )
          .catch((error) => {
            console.error(error);
          });}
         
       
          const CheckConnectivity = () => {
            // For Android devices
            if (Platform.OS === "android") {
              NetInfo.fetch().then(state => {
                if (state.isConnected === true) {
                  alert("You are online!");
                  readDataMongo()
                } else {
                  alert("You are offlinjdje!");
                  readData()
                  readData2()
                }
              });
            } 
          };
 

      useEffect(() => {
      //readData()
      //readData2()
     // readDataMongo()
     CheckConnectivity()
    //   NetInfo.fetch().then(state => {
    //     console.log("Connection type", state.type);
    //     console.log("Is connected?", state.isConnected);
    // });


    
    const unsubscribe = NetInfo.addEventListener(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
    });
    //unsubscribe()
      }, [])

     const addItem = async () => {
        await setwant([
          ...getWant,
          { key: Math.random().toString(), data: getText ,}
        ]);
        setText(''); 
        saveData();
        //console.log("add item sy")
        //console.log(getWant)
        Keyboard.dismiss();
      }

    const itemBought = async (id,itemKey) => {
      let newArr = [...getWant]; 
      await setgot([
        ...getGot,
        { key: Math.random().toString(), data: newArr[id].data ,}
      ])
      //console.log("get got")
      console.log(getGot)
      await setwant(() => getWant.filter(item => item.key != itemKey));
      saveData()
      saveData2()
    }

    const removeItem1 = async (itemKey) => { //for Want List
      await setwant(() => getWant.filter(item => item.key != itemKey));
      saveData();
    }

    const removeItem2 = async(itemKey) => { //for get List
      await setgot(() => getGot.filter(item => item.key != itemKey));
      saveData2()
    }
    const empty = async() => {
      await setgot([])
      await setwant([])
      saveData()
      saveData2()
    }

    return (
      <Layout style= {styles2.Layout}>
      <TopNav navigation={navigation} screenTitle="Pantry"/>
      <View style={styles2.MainContainer }>
      {
        getWant.length === 0 ? 
        <View  style={styles2.MainContainer2 } >
          
          <TextInput 
              style={styles2.textInput}
              underlineColorAndroid='transparent'
              placeholder="Enter Item Here" 
              onChangeText={text => setText(text)}
              value={getText}
              
              autoFocus={true}
              onSubmitEditing={()=> addItem()}
              />
        
        <View style = {{justifyContent: "center", alignItems: "center", backgroundColor: "#ffff"}}>
        <Text style = {{fontWeight: "bold", fontSize: 25, fontFamily: "serif", paddingTop: 200,}}>Your Pantry List is Empty</Text>
        </View>
        </View>
          
      :


      <View style={styles2.MainContainer }>
        <TextInput 
            style={styles2.textInput}
            underlineColorAndroid='transparent'
            placeholder="Enter Item Here" 
            onChangeText={text => setText(text)}
            value={getText}
            autoFocus= {true}
            onSubmitEditing={()=> addItem()}
            />
            


        <View style= {{borderWidth: 2,borderColor: '#008b8b', padding: 10, margin: 5,backgroundColor:'#f0f8ff' }}>
            <Text style= {{fontWeight: "bold", fontSize: 20, fontFamily: "serif",  padding:5, backgroundColor:'#f0f8ff',width: "100%"}}>What's In My List</Text>
            {/* <FlatList
                data = {getWant}
                renderItem = {({item}) => (
                    <Text>{item.data}</Text>
                )}
            /> */}

            <ScrollView  keyboardShouldPersistTaps={'handled'}>
              {getWant.map((item, id) =>
              <TouchableOpacity
                key={item.key}
                activeOpacity={0.7}
                var a = {{}}
                onPress = {() => itemBought(id, item.key)}>
                
            <View style={styles.scrollviewItem}>
              <Text  style={styles.scrollviewText}> <Octicons name="primitive-dot" size={15} color="black" />    {item.data}</Text>
                <TouchableOpacity
                  onPress= {()=>removeItem1(item.key)}
              >
                <View >
                <AntDesign name="delete" size={24} color="black" />
                </View>
              </TouchableOpacity>

              
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>  




        </View>

        <View style= {{borderWidth: 2,borderColor: '#008b8b', padding: 10, margin: 5,backgroundColor:'#f0f8ff' }}>
        <Text style= {{fontWeight: "bold", fontSize: 20, fontFamily: "serif",  padding:5, backgroundColor:'#f0f8ff',width: "100%"}}>What I Got</Text>
            {/* <FlatList
                data = {getGot}
                renderItem = {({item}) => (
                    <Text>{item.data}</Text>
                )}
            /> */}

            <ScrollView  keyboardShouldPersistTaps={'handled'}>
              {getGot.map((item, id) =>
              <TouchableOpacity
                key={item.key}
                activeOpacity={0.7}
                var a = {{}}>
              
                
            <View style={styles.scrollviewItem}>
            <Text  style={styles.scrollviewText2}> <Octicons name="primitive-dot" size={15} color="black" />    {item.data}</Text>
                <TouchableOpacity
                  onPress= {()=>removeItem2(item.key)}
              >
                <View>
                <AntDesign name="delete" size={24} color="black" />
                </View>
              </TouchableOpacity>

              
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>  

        </View>

        <Button title ="clear"
              onPress= {()=> {
                //AsyncStorage.clear()
                empty()
                alert("cleared")}}
       ></Button>
      </View>
      }
      </View>

      </Layout>
    );}
export default PantryNavigator;


const styles2 = StyleSheet.create({

  Layout: {
    flex: 1
  },
 
    MainContainer: {
      padding: 10,
      justifyContent: 'center',
      backgroundColor: '#ffff',
      
    },

    MainContainer2: {
      padding: 10,
      justifyContent: 'center',
      backgroundColor: '#ffff',
      
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
      backgroundColor: 'grey',
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
      flex: 1,
      fontSize: 15,
      color: 'black',
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid'
    },
    scrollviewText: {
      flex: 1,
      fontSize: 15,
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
      padding: 3,
      margin: 2,
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