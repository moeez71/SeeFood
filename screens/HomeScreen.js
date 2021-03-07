import React, {useContext, useEffect}  from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import FormButton from '../components/FormButton';

import {AuthContext} from '../navigation/AuthProvider';
import NetInfo from "@react-native-community/netinfo";
import { Text, Layout, List, ListItem, Button} from '@ui-kitten/components';
import Meals from '../components/Meals';
import { Card } from 'react-native-paper';


var User = require('../back/backend/models/user')


//const abcd = useContext(AuthContext)
//const {user} = useContext(AuthContext);
//exports.user = user
const HomeScreen = ({navigation}) => {
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
    
    const meals = [ 
        {id: 1, icon: require('../public/assets/images/cherry.png')},
        {id: 2, icon: require('../public/assets/images/lunch.png')},
        {id: 3, icon: require('../public/assets/images/dinner.png')},
        {id: 4, icon: require('../public/assets/images/cherry.png')}
    ];
    const renderListItem = ({ item, index }) => (
      <ListItem>
        <Meals 
          image={item.icon}
          />
      </ListItem>
    );
    return (
    <SafeAreaView style={{ flex: 1 }}>
        <Layout style={styles.container}>
          <Text category='h1' style={styles.header}>Home Screen</Text>
          <Card style={styles.cardStyle}>
            <List 
              data={meals}
              renderItem={renderListItem}
              horizontal={true}
              showsVerticalScrollIndicator ={false}
              showsHorizontalScrollIndicator={false}
              style={styles.listContainer}
            />
          </Card>

          <Layout style={styles.cardContainer}>
          <Card style={styles.cardStyle2}>
              <Text category='p1'>You can search for recipes here!</Text>
              <Button
              size='small'
              status='info'
              onPress={() => navigation.navigate('Recipes')}
              >
              search
            </Button>
            </Card>
            <Card style={styles.cardStyle2}>
            <Text category='p1'>Wanna go Shopping? Make a pantry list</Text>
              <Button
              size='small'
              status='info'
              onPress={() => navigation.navigate('PantryScreen')}              
              >
              make pantrylist
            </Button>
            </Card>
          </Layout>
          <Layout style={styles.cardContainer}>
          <Card style={styles.cardStyle2}>
              <Text category='p1'>Make recipes with what you have</Text>
              <Button
              size='small'
              status='info'
              onPress={() => navigation.navigate('IngredientsToRecipeNav')}              
              >
              create recipe
            </Button>
            </Card>
            <Card style={styles.cardStyle2}>
              <Text category='p1'>Wanna see foodspots around you?</Text>
              <Button
              size='small'
              status='info'
              onPress={() => navigation.navigate('Maps')}              
              >
              see map
            </Button>
            </Card>
          </Layout>
          
      </Layout>
      </SafeAreaView>
        
    );
  }

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  header: {
    fontFamily: 'Kufam-SemiBoldItalic',
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
}
);