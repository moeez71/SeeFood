import React from 'react';
import LottieView from 'lottie-react-native';

function BurgerLoader() {
    return (
         <LottieView source={require('../../assets/loaders/foodLoader.json')} autoPlay loop />
    );
}

export default BurgerLoader;
