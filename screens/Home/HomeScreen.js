import React, {useContext, useEffect, useCallback, useState}  from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, LogBox, RefreshControl } from 'react-native';
import {AuthContext} from '../../navigation/AuthProvider';
import NetInfo from "@react-native-community/netinfo";
import { Text, Layout } from '@ui-kitten/components';
import ImageSwiper from '../../components/ImageSwiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import nowTheme from '../../constants/Theme';
import TopNavHome from '../../components/TopNavHome';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import FoodList from '../../components/FoodList';


import config_ip from "../../config_ip"


var User = require('../../back/backend/models/user')


// // LogBox.ignoreAllLogs()

//const abcd = useContext(AuthContext)
//const {user} = useContext(AuthContext);
//exports.user = user
const HomeScreen = ({navigation}) => {

  const {user, setUserData, userData} = useContext(AuthContext);
  var thisUser = {};
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
    // body: JSON.stringify({
    //  id : user.uid
    // })
    body: JSON.stringify(thisUser)
  };
  
  const prepareUserData = async() => {
    if (user.displayName) {
      
      let fullName = user.displayName;
      let nameArray = fullName.split(/\b(\s)/).filter(e => e.trim().length > 0);
      let tmpUser = await user.providerData[0];
      thisUser = await{
        uid: tmpUser.uid,
        firstName: nameArray[0],
        lastName: nameArray[nameArray.length - 1],
        email: tmpUser.email,
        phoneNumber: tmpUser.phone===undefined? null : tmpUser.phone,
        photoURL: tmpUser.photoURL,
        providerId: tmpUser.providerId,
      };
      if (tmpUser.providerId.includes('facebook')) {
        try {
          const currentAccessToken = await AccessToken.getCurrentAccessToken()
        
          const graphRequest = await new GraphRequest('/me', {
            accessToken: currentAccessToken.accessToken,
            parameters: {
              fields: {
                string: 'picture.type(large)',
              },
            },
          }, async(error, result) => {
            if (error) {
              console.log(error)
            } else {
              // console.log(result.picture.data.url);
              // console.log(userData);
              thisUser = await{
                uid: tmpUser.uid,
                firstName: nameArray[0],
                lastName: nameArray[nameArray.length - 1],
                email: tmpUser.email,
                phoneNumber: tmpUser.phone,
                photoURL: result.picture.data.url,
                providerId: tmpUser.providerId,
              };
              // console.log(thisUser);
              await setUserData(thisUser);
              // setUserData({...userData, photoURL: result.picture.data.url})
            }
          })
        
          await new GraphRequestManager().addRequest(graphRequest).start();
        } catch (error) {
          console.error(error)
        }
      }
    else if (tmpUser.providerId.includes('google')){
        thisUser = await{
        uid: tmpUser.uid,
        firstName: nameArray[0],
        lastName: nameArray[nameArray.length - 1],
        email: tmpUser.email,
        phoneNumber: tmpUser.phone===undefined? null : tmpUser.phone,
        photoURL: tmpUser.photoURL,
        providerId: tmpUser.providerId,
      };
      
      await setUserData(thisUser)
    }
  }
  else {
    console.log(user.uid);
    axios.get(`http://192.168.190.98:3000/users/find/${user.uid}`)
      .then(async res => {
        let tmp = {
          uid: res.data.uid,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          phoneNumber: res.data.phoneNumber,
          photoURL: res.data.photoURL,
          providerId: res.data.providerId,
        };
        await setUserData(tmp);
          })
          
      .catch(e => console.error(e.message));
  }

  }
  
  
  const fetchAPI2 = async () => {
  //always use the ip address from ipconfig command here with the port number of the backend server!!
  if (userData.providerId === 'google.com' || userData.providerId === 'facebook.com') {
    console.log(userData);
    axios.post(`http://192.168.190.98:3000/users/register`, thisUser, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'

      }
    })
    .then(res => console.log(res.data))
    .catch(e => console.log(e.message))
    }
  }
  

  const CheckConnectivity = () => {
    prepareUserData();
    // getFacebookDp();
    // For Android devices
    if (Platform.OS === "android") {
      NetInfo.fetch().then(state => {
        if (state.isConnected === true) {
          // alert("You are online!");
          fetchAPI2();
        } else {
          // alert("You are offline!");
          
        }
      });
    } 
  };


    useEffect(() => {
      // setUserData(user.providerData);
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
          <TopNavHome navigation={navigation} screenTitle="Home"/>
          <ScrollView >
          <ImageSwiper/>
          <Text style={styles.heading}>Features</Text>
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
          <FoodList navigation={navigation}/>
          {/* <CustomGallery /> */}
          </ScrollView>
      </Layout>
      </SafeAreaView>
        
    );
  }

export default HomeScreen;


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
  heading: {
    fontFamily: "Nexa Bold",
    fontSize: 28,
    marginLeft: 20
}
}
);