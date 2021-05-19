import React from 'react';
import { View } from 'react-native';
import FbGrid from "react-native-fb-image-grid";

     

function ImageGrid({navigation}) {
    return (
        <View style={{height: 200, width: '100%'}}>
            <FbGrid
            images={[
              "https://facebook.github.io/react-native/docs/assets/favicon.png",
              "https://facebook.github.io/react-native/docs/assets/favicon.png",
              "https://facebook.github.io/react-native/docs/assets/favicon.png",
              "https://facebook.github.io/react-native/docs/assets/favicon.png",
              "https://facebook.github.io/react-native/docs/assets/favicon.png",
              "https://facebook.github.io/react-native/docs/assets/favicon.png"
            ]}
            onPress={()=>navigation.navigate('FoodGallery')}
          /> 
        </View>
        
    )
}

export default ImageGrid;
