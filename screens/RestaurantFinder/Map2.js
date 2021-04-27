import React, { Component, useEffect, useState } from "react";
import {StyleSheet,View,Text,StatusBar,TouchableOpacity, ActivityIndicator, Alert , Button, Animated , ScrollView , Dimensions, Image, LogBox} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

LogBox.ignoreAllLogs()

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: 500,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

export default () => (
   <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
   </View>
);