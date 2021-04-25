import React, {useContext, useEffect}  from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, LogBox } from 'react-native';
import FormButton from '../../components/FormButton';

import {AuthContext} from '../../navigation/AuthProvider';
import NetInfo from "@react-native-community/netinfo";
import { Text, Layout, List, ListItem, Button, TopNavigation} from '@ui-kitten/components';
import Meals from '../../components/Meals';
import { Card } from 'react-native-paper';
import ImageSwiper from '../../components/ImageSwiper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import nowTheme from '../../constants/Theme'
import Theme from '../../constants/Theme';
import TopNav from '../../components/TopNav';
var User = require('../../back/backend/models/user')


LogBox.ignoreAllLogs()

//const abcd = useContext(AuthContext)
//const {user} = useContext(AuthContext);
//exports.user = user
const HomeTabs = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  const U1 = new User ({
    id: user.uid
  })
  
  module.exports = U1

  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
     id : user.uid
    })
};
  const fetchAPI2 = async () => {
  return await fetch('http://localhost:3000/users/adduser', requestOptions)
  .then(response => response.json())
  .then(data => console.log(data));
}

  // const uri = "http://192.168.10.2:3000/users/add"
  // const fetchAPI = async ()=> {
  //   return await fetch(uri)
  //   .then((response) => response.json())
  //   .then((result) => {
  //    console.log(result)
  //     console.log("User succerjrgn")
  //   }
  //   )
  //   .catch((error) => {
  //     console.error(error);
  //   });}

  const CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === "android") {
      NetInfo.fetch().then(state => {
        if (state.isConnected === true) {
          // alert("You are online!");
          fetchAPI2()
        } else {
          alert("You are offline!");
          
        }
      });
    } 
  };
    

    useEffect(() => {
    // fetchAPI2()
     CheckConnectivity()
     NetInfo.fetch().then(state => {
         console.log("Connection type", state.type);
           console.log("Is connected?", state.isConnected);
       });
      }, [])
    
    return (
    <SafeAreaView style={{ flex: 1 }}>
        <Layout style={styles.container}>
          <TopNav navigation={navigation} screenTitle="Home"/> 
          <ImageSwiper/>
          <View style={styles.categoryContainer}>

            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => {}}>
              <View style={styles.categoryIcon}>
                <AntDesign name='shoppingcart' color="white" size={35}/>
              </View>
              <Text style={styles.categoryBtnTxt}>Pantry</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => {}}>
              <View style={styles.categoryIcon}>
              <Ionicons name='fast-food-outline' color="white" size={35}/>
              </View>
              <Text style={styles.categoryBtnTxt}>Get Recipes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => {}}>
              <View style={styles.categoryIcon}>
              <Ionicons name="ios-restaurant" size={35} color="white" />
              </View>
              <Text style={styles.categoryBtnTxt}>Restaurants</Text>
            </TouchableOpacity>


          </View>

          <View style={styles.categoryContainer}>

            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => {}}>
              <View style={styles.categoryIcon}>
              <SimpleLineIcons name='chemistry' color="white" size={35}/>
              </View>
              <Text style={styles.categoryBtnTxt}>Make Recipes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => {}}>
              <View style={styles.categoryIcon}>
              <AntDesign name='scan1' color="white" size={35}/>
              </View>
              <Text style={styles.categoryBtnTxt}>Scan Food</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => {}}>
              <View style={styles.categoryIcon}>
              <AntDesign name='linechart' color="white" size={35}/>
              </View>
              <Text style={styles.categoryBtnTxt}>Calorie Track</Text>
            </TouchableOpacity>
            

            
          </View>
      </Layout>
      </SafeAreaView>
        
    );
  }

export default HomeTabs;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // padding: 10,
  },
  header: {
    fontFamily: 'Nexa Bold',
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 10,
    maxHeight: 100,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    marginBottom: 0
  },
  cardStyle: {
    maxHeight: 100,
  },
  cardStyle2: {
    height: 200,
    width: 150,
    margin: 15,
    alignItems: 'center',
    justifyContent:'center'
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: nowTheme.COLORS.PRIMARY /* 'white' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: nowTheme.COLORS.PRIMARY,
  },
}
);