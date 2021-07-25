import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import FbGrid from "react-native-fb-image-grid";
import { AuthContext } from '../navigation/AuthProvider';


import config_ip from "../config_ip"


function ImageGrid({navigation}) {

  const[images, setImages] = useState([]);
  const{userData} = useContext(AuthContext);
  

  useEffect(()=> {
    axios.get(`http://192.168.190.98:3000/gallery/find/${userData.uid}`)
    .then(async res => {
      // console.log(res.data.gallery);
      let tmp = res.data.gallery.map(item => item.img);
      console.log(tmp);
      await setImages(tmp);
    })
    .catch(e =>  console.error(e.message));
  }, []);
    return (
        <View style={{height: 200, width: '100%'}}>
            <FbGrid
            // images={[
            //   "https://facebook.github.io/react-native/docs/assets/favicon.png",
            //   "https://facebook.github.io/react-native/docs/assets/favicon.png",
            //   "https://facebook.github.io/react-native/docs/assets/favicon.png",
            //   "https://facebook.github.io/react-native/docs/assets/favicon.png",
            //   "https://facebook.github.io/react-native/docs/assets/favicon.png",
            //   "https://facebook.github.io/react-native/docs/assets/favicon.png"
            // ]}
            images={images}
            onPress={()=>navigation.navigate('FoodGallery', {images: images})}
          /> 
        </View>
        
    )
}

export default ImageGrid;
