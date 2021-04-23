import React from 'react'
import {
    View,
    Image,
    StyleSheet,
  } from 'react-native';

import Swiper from 'react-native-swiper';

const images = [
    {
        id: 1,
        image: require('../assets/banners/food-banner1.jpg')
    },
    {
        id: 2,
        image: require('../assets/banners/food-banner2.jpg')
    },
    {
        id: 3,
        image: require('../assets/banners/food-banner3.jpg')
    },
    {
        id: 4,
        image: require('../assets/banners/food-banner4.jpg')
    },
    {
        id: 5,
        image: require('../assets/banners/food-banner5.jpg')
    },
]
function ImageSwiper() {
    return (
        <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          horizontal
          height={200}
          activeDotColor="#FF6347">
          {images.map(item => 
          <View style={styles.slide} key={item.id}>
            <Image
              source={item.image}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>)
          }
        </Swiper>
      </View>
    )
}

export default ImageSwiper;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    sliderContainer: {
      height: 200,
      width: '90%',
      marginTop: 10,
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 8,
    },
  
    slide: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderRadius: 8,
    },
    sliderImage: {
      height: '100%',
      width: '100%',
      alignSelf: 'center',
      borderRadius: 8,
    },
});