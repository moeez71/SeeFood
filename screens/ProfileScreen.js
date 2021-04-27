import { Layout } from '@ui-kitten/components';
import React, {useContext} from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TopNav from '../components/TopNav';
import TopNavProfile from '../components/TopNavProfile';
import TopNavWithBack from '../components/TopNavWithBack';
import { AuthContext } from '../navigation/AuthProvider';


const data = [
  "Your Favorites",
  "Payment",
  "Tell Your Friends",
  "Support",
  "Settings"
];

const ProfileScreen = ({navigation}) => {

  const {user} = useContext(AuthContext);
  console.log(user.photoURL);
  return (
    <SafeAreaView>
      <TopNavProfile navigation={navigation} screenTitle="Profile"/>
      {/* <TopNavWithBack navigation={navigation} screenTitle="Profile"/> */}
      <Layout>
      <Layout style={styles.userInfoSection}>
        <Layout style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: user.photoURL,
            }}
            size={80}
          />
          <Layout style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{user.displayName}</Title>
            <Caption style={styles.caption}>{user.displayName}</Caption>
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
          <Text style={{color:"#777777", marginLeft: 20}}>{!user.phoneNumber? "+92340000000": user.phoneNumber}</Text>
        </Layout>
        <Layout style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{user.email}</Text>
        </Layout>
      </Layout>

      <Layout style={styles.infoBoxWrapper}>
          <Layout style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₹140.50</Title>
            <Caption>Wallet</Caption>
          </Layout>
          <Layout style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Orders</Caption>
          </Layout>
      </Layout>
      </Layout>
      <Layout style={styles.menuWrapper}>
      {data.map((item, index) => 
        <TouchableRipple key={index}>
          <Layout style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>{item}</Text>
          </Layout>
        </TouchableRipple>
      )}
      
      </Layout>
    </SafeAreaView> 
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 10,
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
