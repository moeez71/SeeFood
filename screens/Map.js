import React, { Component, useEffect, useState } from "react";
import {StyleSheet,View,Text,StatusBar,TouchableOpacity, ActivityIndicator, Alert , Button, Animated , ScrollView , Dimensions, Image} from 'react-native';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import Ionicons from 'react-native-vector-icons/Ionicons';

import StarRating from "../components/stars";
import { OpenMapDirections } from 'react-native-navigation-directions';
//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import TopNav from "../components/TopNav";
const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const Map = ({navigation}) => {

    const[currentPosition, setCurrentPosition] = useState(initialState);
    const[places, setPlaces]= useState([{}])
    const[marker, setMarkers]=  useState(false)

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentPosition.latitude},${currentPosition.longitude}&radius=3000&type=restaurant&keyword=food&key=AIzaSyAPygMIBKVDTFCt6_f0oLxdvJe7gr7CKfU`


    const fetchAPI = async ()=> {
      return await fetch(url)
      .then((response) => response.json())
      .then((result) =>{
       //console.log(result)
         setPlaces(result.results);
        // console.log(places)
       // console.log(result.results[0].geometry.location)
        setMarkers(true)
        //console.log(marker)
        //console.log(places)
      }
      )
      .catch((error) => {
        console.error(error);
      });}

    useEffect(() => {
      Geolocation.getCurrentPosition(position => {
           const { longitude , latitude} = position.coords;
            setCurrentPosition({
              ...currentPosition,
              latitude,
              longitude,
            })
          
           
       },
       error => Alert.alert(error.message),
       { enableHighAccuracy: true, timeout: 20000,  maximumAge: 10000 ,showLocationDialog: true, forceRequestLocation:true,  }
   )
      }, [marker])

    return currentPosition.latitude ? (
         <View style= {styles.container}>
         <TopNav navigation={navigation} screenTitle="Nearby Restaurants"/>
          {marker === true ?
          <View style= {styles.container}>
             <MapView
              provider= {PROVIDER_GOOGLE}
                 style={{flex:1}}
                 showsUserLocation={true}
                 showsMyLocationButton= {true}
                 initialRegion = {currentPosition}
                 
                 >

                
                {places.map((result, id) => 
                <MapView.Marker 
                  key = {id}
                  {...console.log(result)}
                  coordinate={{latitude:  result.geometry.location.lat,
                  longitude: result.geometry.location.lng}}
                  title={result.name}
                  
                 >
                  
                 </MapView.Marker> 
                 
                )}
                
                 </MapView>

                 <Animated.ScrollView
                 horizontal
                 scrollEventThrottle= {1}
                 showsHorizontalScrollIndicator = {false}
                 snapToInterval={CARD_WIDTH + 20}
                  snapToAlignment="center"
                  contentContainerStyle={{
                      paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                  }}
                 style = {styles3.scrollView}>
                 

                {places.map((result, id) => 
                <View style = {styles3.card} key= {id}>
                  <Image 
                    style={styles3.cardImage} 
                    source ={ result.photos != null ? {uri : `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&sensor=false&key=AIzaSyAPygMIBKVDTFCt6_f0oLxdvJe7gr7CKfU`}: require('../image-not-found.jpg')}
                    //source={{result.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos.photo_reference}&sensor=false&key=AIzaSyAPygMIBKVDTFCt6_f0oLxdvJe7gr7CKfU` : require("./knightly.jpg")}}
                    resizeMode ="cover"
                   // {... result.photos ? console.log(result.photos[0].photo_reference): console.log("no photo")}
                  />
                  <View style = {styles3.textContent}>
                    <Text style= {styles3.cardtitle}>{result.name}</Text>
                    <StarRating ratings= {result.rating} reviews = {result.user_ratings_total}/>
                    {/* <Text style= {styles3.cardDescription}> Open Now </Text>  */}
                    <Text style= {styles3.cardDescription} numberOfLines = {1}> {result.vicinity}</Text>
                    <View style={styles.button}>
                      <TouchableOpacity
                         //const endpoint = {{longitude: result.geometry.location.lng ,latitude:  result.geometry.location.lat}}
                        onPress={() => OpenMapDirections(currentPosition,{latitude:  result.geometry.location.lat,
                            longitude: result.geometry.location.lng}, 'd' )}
                        style={[styles3.signIn, {
                          borderColor: '#FF6347',
                          borderWidth: 1
                          
                        }]}
                      >
                        <Text style={styles3.textSign}>View Directions</Text>
                      </TouchableOpacity>
              </View>

                  </View>

                </View>
                )}

                 </Animated.ScrollView>

                 
                
         </View>
         :  
            <View style= {styles.container}>
            <MapView
                provider= {PROVIDER_GOOGLE}
                 style={{flex:1}}
                 showsUserLocation={true}
                 showsMyLocationButton= {true}
                 initialRegion = {currentPosition}></MapView>
                 
                 <Button title= "Find Nearby Places For Me" onPress= {fetchAPI}></Button>
            </View>
                 }

         </View>
    ) : 
    <View style = {styles.container}>
             <TopNav navigation={navigation} screenTitle="Nearby Restaurants"/>

      <ActivityIndicator size="large" color="#0000ff" />
    </View>

}

export default Map

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: "100%",
      flex:1
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });

  const styles2 = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: "100"
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});

const styles3 = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position:'absolute', 
    marginTop: Platform.OS === 'ios' ? 40 : 20, 
    flexDirection:"row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 90 : 80, 
    paddingHorizontal:10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: '100%',
      padding:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  },
  textSign: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#FF6347'
  }
});



