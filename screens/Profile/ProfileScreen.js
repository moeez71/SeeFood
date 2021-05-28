import { Layout } from '@ui-kitten/components';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageGrid from '../../components/ImageGrid';
import TopNavProfile from '../../components/TopNavProfile';
import { AuthContext } from '../../navigation/AuthProvider';


import config_ip from "../../config_ip"

const data = [
  "Your Favorites",
  "Tell Your Friends",
  "Support",
  "Settings"
];

const ProfileScreen = ({navigation}) => {

  const {userData} = useContext(AuthContext);
  const[recipeCount, setRecipeCount] = useState(0);

  const getSavedRecipesFromDb = async() => {
    axios.get(`http://${config_ip.DEFAULT_IP}/recipe/find/${userData.uid}`)
    .then(async res => {
      await setRecipeCount(res.data.recipes.length);
    })
    .catch(e => console.error(e.message));
  }

  useEffect(() => {
    getSavedRecipesFromDb();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
      <TopNavProfile navigation={navigation} screenTitle="Profile"/>
      {/* <TopNavWithBack navigation={navigation} screenTitle="Profile"/> */}
      <ScrollView>
      <Layout>
      <Layout style={styles.userInfoSection}>
        <Layout style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: userData.photoURL,
            }}
            size={80}
          />
          <Layout style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{userData.firstName} {userData.lastName}</Title>
            <Caption style={styles.caption}>{userData.firstName} {userData.lastName}</Caption>
          </Layout>
        </Layout>
      </Layout>

      <Layout style={styles.userInfoSection}>
        <Layout style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Islamabad, Pakistan</Text>
        </Layout>
        <Layout style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{!userData.phoneNumber? "+92340000000": userData.phoneNumber}</Text>
        </Layout>
        <Layout style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{userData.email}</Text>
        </Layout>
      </Layout>

      <Layout style={styles.infoBoxWrapper}>
          <Layout style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{recipeCount}</Title>
            <Caption>Saved Recipes</Caption>
          </Layout>
          <Layout style={styles.infoBox}>
            <Title>2</Title>
            <Caption>Saved Places</Caption>
          </Layout>
      </Layout>
      </Layout>
      {/* <Layout style={styles.menuWrapper}>
      {data.map((item, index) => 
        <TouchableRipple key={index}>
          <Layout style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>{item}</Text>
          </Layout>
        </TouchableRipple>
      )}
      
      </Layout> */}
      {/* <CustomGallery /> */}
      <Layout style={{flex: 1, justifyContent: "center", marginTop: 10, alignItems: "center"}}>
        <Text style={{...styles.title, fontSize: 22}}>Food Gallery</Text>
        <ImageGrid navigation={navigation}/>
      </Layout>
      </ScrollView>
    </SafeAreaView> 
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    fontFamily: "Nexa Bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    fontFamily: "Nexa Regular",
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    paddingTop: 40,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
    fontFamily: "Nexa Regular",
  },
});
