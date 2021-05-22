import React, { useEffect, useState } from 'react';
import Gallery from 'react-native-image-gallery';

const FoodGallery = (props) => {

  const[images, setImages] = useState([]);

  useEffect(()=>{
    var images = props.route.params.images;
    console.log(images);
    let tmp = images.map(item => {
      return ({source: {uri: item}})
    })
    console.log(tmp);
    setImages(tmp);
  }, []);
  
    return (
        <Gallery
        style={{ flex: 1, backgroundColor: 'black' }}
        // images={[
        //   { source: require('../assets/banners/food-banner1.jpg'), dimensions: { width: 150, height: 150 } },
        //   { source: require('../assets/banners/food-banner2.jpg'), dimensions: { width: 150, height: 150 } },
        //   { source: require('../assets/banners/food-banner3.jpg'), dimensions: { width: 150, height: 150 } },
        //   { source: require('../assets/banners/food-banner4.jpg'), dimensions: { width: 150, height: 150 } }
        // ]}
        images={images}
        />
    )
}

export default FoodGallery;
