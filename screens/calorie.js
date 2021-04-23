import React, {useState, useEffect, useContext}  from 'react';
import { View, StyleSheet, Keyboard , ScrollView  } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { ApplicationProvider, Text, Divider, Spinner } from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import NetInfo from "@react-native-community/netinfo";



import { Input, Layout } from '@ui-kitten/components';
import { IndexPath, Select, SelectItem, Datepicker, Button } from '@ui-kitten/components'
 
import DatePicker from 'react-native-datepicker'



import {AuthContext} from '../navigation/AuthProvider';
import TopNav from '../components/TopNav';




const Calorie = ({navigation}) => {

  const {user} = useContext(AuthContext);
  
  const [calorie, setcalories] = React.useState('');
  const [foodName, setfood] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [serving, setServing] = React.useState('')
  const [footype, setType]= useState('Breakfast')

  const [caldata, setcaldata] = React.useState([]);

  const requestOptions = {
    method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json'
     },
    body: JSON.stringify({
     id: user.uid,
     calorie:  caldata,
     
    })
};

const fetchAPI2 = async () => {
  return await fetch('http://192.168.0.109:3000/calorie/adduser1', requestOptions)
  .then(response => response.json())
  .then(data => console.log(data));
}
    onConfirm = async () => {
    await setcaldata([
      ...caldata,
      { calories: calorie * serving, foodname: foodName ,serving: serving , type: footype, date: date.toDateString(), key: Math.random().toString()}
    ]);

    console.log(user.uid)
    console.log("on confrim triggered")
    console.log(caldata)
    saveData()
    empty()
  }

   saveData = async () => {
    try {
     await AsyncStorage.setItem(user.uid+"999", JSON.stringify(caldata))
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
  

    


 readData2 = async () => {
  try {
    
    const userData= await AsyncStorage.getItem(user.uid+"999")
    const userData2 = JSON.parse(userData)
    if (userData2 !== null) {
      //console.log(userData2)
      setcaldata(userData2)
      console.log(userData2)
      console.log("read")
      
    }
    if (userData2 === null){
      console.log("empty")
    }
  } catch (e) {
  alert('Failed to fetch the data from storage read  2')
  }
}


const readDataMongo = async () => {
  const uri = `http://192.168.0.109:3000/calorie/calorie/${user.uid}`
   return await fetch(uri)
   .then((response) => response.json())
   .then((result) => {
    console.log(result)
    setcaldata(result.calorie)
    
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
           readData2()
           
         }
       });
     } 
   };

   const empty = () => {
     setcalories('')
     setServing('')
     setfood('')
     setType('Breakfast')
   }

useEffect(() => {
   
  AsyncStorage.clear()
  const unsubscribe = navigation.addListener('focus', () => {
    CheckConnectivity()
    //readData2()
  });
  }, [0])
  
    return(
      <Layout style={{flex: 1}}>
        <TopNav navigation={navigation} screenTitle="Calorie Tracker"/>
      <Layout style= {styles.container}>
<View style= {{borderWidth: 2,borderColor: '#008b8b', padding: 10, margin: 5,backgroundColor:'#f0f8ff' }}>
            <Text style= {{fontWeight: "bold", fontSize: 20, fontFamily: "serif",  padding:5, backgroundColor:'#f0f8ff',width: "100%"}}>Add a Record</Text>
            </View>

      <View style= {{
      //margin: 5,
      marginBottom: 5,
      width: '100%',
      borderRadius: 10}}>

        <Input
        style={styles.input}
        value={foodName}
        size= 'medium'
        placeholder='Enter Food Name'
        onChangeText={nextValue => setfood(nextValue)}
        required
      />

      <DropDownPicker
        items={[
            {label: 'Breakfast', value: 'Breakfast'},
            {label: 'Lunch', value: 'Lunch'},
            {label: 'Dinner', value: 'Dinner'},
            {label: 'Other', value: 'Other'}]}
            
            defaultNull
          placeholder="Select type"
        //defaultIndex={0}
        containerStyle={{height: 50}}
        onChangeItem={item => setType(item.label)}
/>
      

      <Datepicker
        placeholder= "enter date"
        date={date}
        onSelect={nextDate => setDate(nextDate)}
      />
      

      <Input
        style={styles.input}
        value={calorie}
        placeholder='Enter Calories (kcal)'
        onChangeText={nextValue => setcalories(nextValue)}
      />

      <Input
        style={styles.input}
        value={serving}
        placeholder='Enter Total Servings'
        onChangeText={nextValue => setServing(nextValue)}
      />

      
      <Button size='medium' onPress= {()=> onConfirm()} disabled = {calorie.length > 0 && serving.length > 0 ? false : true}>
        Add
      </Button>

      {/* <ScrollView  
            keyboardShouldPersistTaps={'handled'}
            key={Math.random().toString()}>
              {caldata.map((item, id) =>
              
                
            <View style={styles.scrollviewItem}>

              <Text  style={styles.scrollviewText}>{id+1}) {item.foodname} </Text>
              
              
            </View>
          
        )}
      </ScrollView>  */}

      </View>
  
        </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      // padding: 10
    },
  });
export default Calorie