import React from 'react';
import Gallery from 'react-native-image-gallery';

const CustomGallery = (props) => {
    return (
        <Gallery
        style={{ flex: 1, backgroundColor: 'transparent' }}
        images={[
          { source: require('../assets/banners/food-banner1.jpg'), dimensions: { width: 150, height: 150 } },
          { source: require('../assets/banners/food-banner2.jpg'), dimensions: { width: 150, height: 150 } },
          { source: require('../assets/banners/food-banner3.jpg'), dimensions: { width: 150, height: 150 } },
          { source: require('../assets/banners/food-banner4.jpg'), dimensions: { width: 150, height: 150 } }
        ]}
        />
    )
}

export default CustomGallery;
