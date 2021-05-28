import React, {useState, useEffect, useContext}  from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { ApplicationProvider, Layout, Text, Divider, Spinner, Input, Button } from '@ui-kitten/components';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {VictoryChart, VictoryGroup, VictoryBar, VictoryLine, VictoryAxis, VictoryTheme} from "victory-native"

import { View, StyleSheet, ScrollView , TouchableOpacity , LogBox } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

import Prompt from "react-native-input-prompt";


import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../navigation/AuthProvider';
import TopNav from '../../components/TopNav';

import config_ip from "../../config_ip"



// LogBox.ignoreAllLogs()

const calgraphs = ({navigation}) => {
    const {user} = useContext(AuthContext);

    const [data, setdata] = useState([])
    const [graphData, setgraphData] = useState([])
    const [visible, setvisible] = useState(false)
    const [limit, setlimit] = useState("")

    const testsample = { data : [
        {x: "Mar 06", y: 200},
        {x: "Mar 07", y: 150},
        {x: "Mar 08", y: 100},
        {x: "Mar 09", y: 220}

    ]}


    const requestOptions = {
      method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json'
       },
      body: JSON.stringify({
       id: user.uid,
       limit:  limit,
       
      })
  };

  saveData = async () => {
    try {
     await AsyncStorage.setItem(user.uid+"321", JSON.stringify(limit))
     
    //  alert('Data successfully saved bro')
      //fetchAPI2()
    } catch (e) {
   //   alert('Failed to save the data to the storage')
    }
  }



    async function readData() {
      try {

        function parseDate(date) {
          let [dayOfWeek, month, day, year] = date.split(" ");
          return Date.parse(`${day} ${month} ${year}`);
        }


        const userData= await AsyncStorage.getItem(user.uid+"999")
        const userData2 = JSON.parse(userData)

        const userData3= await AsyncStorage.getItem(user.uid+"321")
        const userData4 = JSON.parse(userData3)

        console.log("data3")
        console.log(userData3)
        let sortedDates = userData2.sort((a, b) => parseDate(a.date) - parseDate(b.date));
       // const sorted_data = userData2.sort((a,b) => b.date - a.date)
       // let sortedCars1 = userData2.sort((a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()));
       // const sortedActivities = userData2.sort((a, b) => new Date(a.date) - new Date(b.date));

        if (userData2 !== null) {
          //console.log("cal record wala console")
          //console.log(sortedDates)
          await setdata(sortedDates)
          await setlimit(userData4)
          //setgraphData([{x: sortedDates.date, y: sortedDates.calories }])

        }
        if (userData2.length() === null){
          console.log("empty")
        }

      } catch (e) {
    //  alert('Failed to fetch the data from storageeee')
      }
    }

    const removeItem1 = async (itemKey) => { //for Want List
      await setdata(() => data.filter(item => item.key != itemKey));
      saveData();
    }
    const fetchAPI2 = async () => {
        return await fetch(`http://${config_ip.DEFAULT_IP}/limit/adduser1`, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
      }
  
    const readDataMongo = async () => {
      function parseDate(date) {
        let [dayOfWeek, month, day, year] = date.split(" ");
        return Date.parse(`${day} ${month} ${year}`);
      }

      fetch2()
      const uri = `http://${config_ip.DEFAULT_IP}/calorie/calorie/${user.uid}`
       return await fetch(uri)
       .then((response) => response.json())
       .then((result) => {
        //console.log(result)
        //console.log("read data mongo trig")
        let sortedDates = result.calorie.sort((a, b) => parseDate(a.date) - parseDate(b.date));

        // setdata(sortedDates)
        let tmp = [];
        tmp.pop();
        sortedDates.map((item, index, arr) => {
           // console.log(sortedDates)
            // setgraphData([...graphData, {x: item.date, y: item.calories }])
            let prev;
            if (index > 0) {
              prev = arr[index-1];
              if (prev.date === item.date) {
                tmp.push({x: item.date.substring(4, 10), y: item.calories+prev.calories });
              }
              else
              tmp.push({x: item.date.substring(4, 10), y: item.calories });
            }
            else
              tmp.push({x: item.date.substring(4, 10), y: item.calories });
            
         });

         setgraphData(tmp);
      //  console.log("mongo")
       // console.log(sortedDates)
        //await setgraphData([{x: result.calorie.date, y: sortedDates.calories }])
        console.log(graphData)
        
       }
       )
       .catch((error) => {
         console.error(error);
       });
    }
      
    
       const CheckConnectivity = () => {
         // For Android devices
         if (Platform.OS === "android") {
           NetInfo.fetch().then(state => {
             if (state.isConnected === true) {
              // alert("You are online!");
               readDataMongo()
             } else {
              // alert("You are offlinjdje!");
               readData()
               
             }
           });
         } 
       };
       const limitReset = async (limit) => {
           
           await setlimit(limit)
            fetchAPI2()
           setvisible(false)
       }

       const fetch2 = async () => {
        const uri = `http://${config_ip.DEFAULT_IP}/limit/calorie/${user.uid}`
        return await fetch(uri)
        .then((response) => response.json())
        .then((result) => {
         console.log(result)
         setlimit(result.limit)
         
        }
        )
        .catch((error) => {
          console.error(error);
        });}
       
    

      useEffect(() => {
        
        const unsubscribe = navigation.addListener('focus', () => {
          CheckConnectivity()
          //readData()
        });
    
        return unsubscribe;
      }, [navigation]);
          
     const  red_style= {data: {fill: '#f08080'}}
    
  

        //const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30
    return(
        <Layout style={{flex: 1}}>
        <TopNav navigation={navigation} screenTitle="Calorie Tracker"/>
        <Layout style= {styles.container}>

        
            <View style= {{borderWidth: 2,borderColor: '#008b8b', padding: 10, margin: 5,backgroundColor:'#f0f8ff' }}>
            <Text style= {{fontWeight: "bold", fontSize: 20, fontFamily: "serif",  padding:5, backgroundColor:'#f0f8ff',width: "100%"}}>Calories Tracker</Text>
            </View>
           
            
            

             <VictoryChart domainPadding={10}>
             <VictoryLine  y={() => limit } style={{data: { stroke: "#c43a31", strokeWidth: "6" }
    }}/>
             <VictoryAxis label= "Day" style= {{axis: {stroke: "#756f6a"},axisLabel: {fontSize: 18, padding: 30}}}/>
             <VictoryAxis dependentAxis label= "Calories Consumed" style= {{axisLabel: {padding: 37}}}/>
                <VictoryGroup >     
                    <VictoryBar barWidth={20} data= {graphData} style= {{data: {fill: '#4169e1'}}}
                    
                    >
                    </VictoryBar>
                </VictoryGroup>
            </VictoryChart> 
                   
            <View style= {styles.row}>         
               <Button style={styles.button} status='primary'>
      Add Record
    </Button>

    <Button style={styles.button} status='primary'>
      View All Records
    </Button>

    <Button style={styles.button} status='primary' onPress= {() => setvisible(true)}  > 
      Set Daily Limit
    </Button>

    

    <Prompt
    visible={visible}
    title="Set Daily Calories Limit"
    placeholder="Enter Here"
    onCancel={() => 
        setvisible(false)
    }
    onSubmit={text =>
        limitReset(text)
        
    }
/>

    
    
    </View>

    <View><Text>Your Daily Calories Limit is set as {limit}Kcal</Text></View>

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
        paddingTop:30,
        justifyContent: "space-between",
      flexDirection: 'row',
      //flexWrap: 'wrap',
       
    },
  });
export default calgraphs