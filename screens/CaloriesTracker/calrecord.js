import React, {useState, useEffect, useContext}  from 'react';
import { View, StyleSheet, ScrollView , TouchableOpacity, LogBox } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { ApplicationProvider, Layout, Text, Divider, Spinner, Input, Button } from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NetInfo from "@react-native-community/netinfo";


import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../navigation/AuthProvider';
import TopNav from '../../components/TopNav';

import config_ip from "../../config_ip"


// LogBox.ignoreAllLogs()

const calrecord = ({navigation}) => {

    const {user} = useContext(AuthContext);

    const [data, setdata] = useState([])


    const requestOptions = {
      method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json'
       },
      body: JSON.stringify({
       id: user.uid,
       calorie:  data,
       
      })
  };


    const fetchAPI2 = async () => {
      return await fetch(`http://${config_ip.DEFAULT_IP}/calorie/adduser1`, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
    }
   

     saveData = async () => {
      try {
       await AsyncStorage.setItem(user.uid+"999", JSON.stringify(data))
       // console.log(getWant)
   // alert('Deleted from async')
      } catch (e) {
    //    alert('Failed to save the data to the storage')
      }
       NetInfo.fetch().then(state => {
         if (state.isConnected === true) {
           fetchAPI2()
      //     alert("Successfully deleted hogaya saveData ka online chal gaya");
          
         } else {
      //     alert("You are offline in save 2!");
         }
       })
    }


     readData = async () =>  {
      try {

        function parseDate(date) {
          let [dayOfWeek, month, day, year] = date.split(" ");
          return Date.parse(`${day} ${month} ${year}`);
        }


        const userData= await AsyncStorage.getItem(user.uid+"999")
        const userData2 = JSON.parse(userData)

        let sortedDates = userData2.sort((a, b) => parseDate(a.date) - parseDate(b.date));
       // const sorted_data = userData2.sort((a,b) => b.date - a.date)
       // let sortedCars1 = userData2.sort((a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()));
       // const sortedActivities = userData2.sort((a, b) => new Date(a.date) - new Date(b.date));

        if (userData2 !== null) {
         
          console.log("cal record wala console")
          console.log(sortedDates)
          await setdata(sortedDates)
        }
      

      } catch (e) {
     // alert('Failed to fetch the data from storage')
      }
    }

    const removeItem1 = async (itemKey) => { //for Want List
      await setdata(() => data.filter(item => item.key != itemKey));
      saveData();
    }
  
    const readDataMongo = async () => {

      function parseDate(date) {
        let [dayOfWeek, month, day, year] = date.split(" ");
        return Date.parse(`${day} ${month} ${year}`);
      }

     

      const uri = `http://${config_ip.DEFAULT_IP}/calorie/calorie/${user.uid}`
       return await fetch(uri)
       .then((response) => response.json())
       .then((result) => {
       // console.log(result)
        console.log("read data mongo trig")
        let sortedDates = result.calorie.sort((a, b) => parseDate(b.date) - parseDate(a.date));

        setdata(sortedDates)
        
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
               //alert("You are online!");
               readDataMongo()
             } else {
               alert("You are offlinjdje!");
               readData()
               
             }
           });
         } 
       };

      useEffect(() => {
        
        const unsubscribe = navigation.addListener('focus', () => {
          CheckConnectivity()
        //readData()
        });
    
        return unsubscribe;
      }, [navigation]);
          
      


    return(
      <Layout style={{flex: 1}}>
        <TopNav navigation={navigation} screenTitle="Calorie Tracker"/>
        <Layout style= {styles.container}>
        {data.length === 0 ? 
          <Layout>

        <View style = {{justifyContent: "center", alignItems: "center", backgroundColor: "#ffff"}}>
        <Text style = {{fontWeight: "bold", fontSize: 25, fontFamily: "serif", paddingTop: 200,}}>Your Records List is Empty</Text>
        </View>
          </Layout> : 

          <Layout>

          <View style= {{borderWidth: 2,borderColor: '#008b8b', padding: 7, margin: 5,backgroundColor:'#f0f8ff' }}>
        <Text style= {{fontWeight: "bold", fontSize: 20, fontFamily: "serif",  padding:5, backgroundColor:'#f0f8ff',width: "100%"}}>All Records</Text>
        </View>
        
            <ScrollView  
            keyboardShouldPersistTaps={'handled'}
            key={Math.random().toString()}>
              {data.map((item, id, arr) => {
              var prev = item;
              if (id !== 0)
               prev = arr[id -1];

              return(
            <View style={styles.scrollviewItem}>


               
              {id === 0 && <Text  style={{fontWeight: "bold"}}> {item.date}</Text>}
              {id > 0 && prev.date !== item.date && <Text  style={{fontWeight: "bold"}}> {item.date}</Text>}
              

              <Text  style={styles.scrollviewText}> Item: {item.foodname}            Total Calories {item.calories}        Type : {item.type}           </Text>
              <Text  style={styles.scrollviewText}> Servings: {item.serving}</Text>

              <TouchableOpacity
                  key={item.key}
                  onPress= {()=>removeItem1(item.key)}
              >
                <View style= {{flexDirection: "row-reverse"}}>
                <AntDesign name="delete" size={28} color="black" />
                </View>
              </TouchableOpacity>
              
              
            </View>
              )
              }
              )}
      </ScrollView>
        
        </Layout>
}
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
    scrollviewText: {
      flex: 1,
      fontSize: 15,
      color: 'black',

      
    },
    scrollviewItem: {
      flexDirection: "column",
     // justifyContent: "space-between",
      backgroundColor: '#faebd7',
      alignSelf: "flex-start",
      padding: 3,
      margin: 2,
      width: '100%',
      borderRadius: 10
    },
  });
export default calrecord