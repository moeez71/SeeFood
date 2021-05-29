import React, {useState, useEffect, useContext}  from 'react';
import { View, StyleSheet, Keyboard , ScrollView , LogBox ,Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { ApplicationProvider, Text, Divider, Spinner } from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import NetInfo from "@react-native-community/netinfo";
import {windowHeight, windowWidth} from '../../utils/Dimentions';
import config_ip from "../../config_ip"




import { Input, Layout } from '@ui-kitten/components';
import { IndexPath, Select, SelectItem, Datepicker, Button } from '@ui-kitten/components'
 
import DatePicker from 'react-native-datepicker'



import {AuthContext} from '../../navigation/AuthProvider';
import TopNav from '../../components/TopNav';
import Theme from '../../constants/Theme';


// LogBox.ignoreAllLogs()


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
  return await fetch(`http://${config_ip.DEFAULT_IP}/calorie/adduser1`, requestOptions)
  .then(response => response.json())
  .then(data => console.log(data));
}
    onConfirm = async () => {
    await setcaldata([
      ...caldata,
      { calories: calorie * serving, foodname: foodName ,serving: serving , type: footype, date: date.toDateString(), key: Math.random().toString()}
    ])
    Alert.alert("Record Added Successfully")
    ;

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
     // alert('Data successfully saved')
      //fetchAPI2()
    } catch (e) {
    //  alert('Failed to save the data to the storage')
    }
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        fetchAPI2()
      //  alert("You are online in save!");
        //readDataMongo()
        
      } else {
      //  alert("You are offline in save 2!");
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
  const uri = `http://${config_ip.DEFAULT_IP}/calorie/calorie/${user.uid}`
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
          // alert("You are online!");
           readDataMongo()
         } else {
           alert("You need to be online to access Calorie Tracker");
           //readData2()
           
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
<View style= {{borderWidth: 2,borderColor: '#008b8b', padding: 10, margin: 5,backgroundColor:"#feece6", borderRadius: 50, borderColor: Theme.COLORS.PRIMARY }}>
            <Text style= {{fontWeight: "bold", fontSize: 20, fontFamily: "serif",  padding:5, width: "100%"}}>Add a Record</Text>
            </View>

      <View style= {{
      //margin: 5,
      marginBottom: 5,
      width: '100%',
      borderRadius: 10}}>

        <Input
        style={styles.inputContainer}
        value={foodName}
        size= 'medium'
        placeholder='Enter Food Name'
        onChangeText={nextValue => setfood(nextValue)}
        
        required
      />

      <DropDownPicker
        containerStyle={{borderRadius: 50, height: windowHeight / 15, margin: 5, width: '100%'}}
        items={[
            {label: 'Breakfast', value: 'Breakfast'},
            {label: 'Lunch', value: 'Lunch'},
            {label: 'Dinner', value: 'Dinner'},
            {label: 'Other', value: 'Other'}]}
            
            defaultNull
          placeholder="Select type"
        //defaultIndex={0}
        // containerStyle={{height: 50, }}
        onChangeItem={item => setType(item.label)}
/>
      

      <Datepicker
        style={{borderRadius: 50, height: windowHeight / 15, margin: 5, width: '100%'}}
        placeholder= "enter date"
        date={date}
        onSelect={nextDate => setDate(nextDate)}
      />
      

      <Input
        style={styles.inputContainer}
        value={calorie}
        keyboardType='numeric'
        placeholder='Enter Calories (kcal)'
        onChangeText={nextValue => setcalories(nextValue)}
      />

      <Input
        style={styles.inputContainer}
        value={serving}
        keyboardType='numeric'
        placeholder='Enter Total Servings'
        onChangeText={nextValue => setServing(nextValue)}
      />

      
      <Button style={styles.buttonContainer} onPress= {()=> onConfirm()} disabled = {calorie.length > 0 && serving.length > 0 ? false : true}>
        <Text style={styles.buttonText}>Add</Text>
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
      margin: 10,
      alignItems: 'center',
    },
    inputContainer: {
      width: '100%',
      height: windowHeight / 15,
      flexDirection: 'row',
      borderRadius: 5,
      margin: 5,
      opacity: 0.9
    },  
    buttonText : {
      fontFamily: 'Nexa Regular',
      color: "white",
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      // padding: 10
    },
    buttonContainer: {
      // paddingTop: 10,
      width: '95%',
      // height: windowHeight / 12.5,
      backgroundColor: Theme.COLORS.PRIMARY,
      borderColor:Theme.COLORS.PRIMARY,
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
    },  
  });
export default Calorie