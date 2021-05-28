import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

function BurgerLoader() {
    return (
        <View style={styles.container}>
            <LottieView source={require('../../assets/loaders/foodLoader.json')} autoPlay loop />
        </View>
    );
}

export default BurgerLoader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    },
})
