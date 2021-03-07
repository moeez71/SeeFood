import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Text, Layout, Card, Avatar} from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Meals = (props) => {
    return (
        <TouchableOpacity
        style={styles.box}
        >
            <Avatar style={styles.img} shape='square' source={props.image}/>
        </TouchableOpacity>
    );
}

export default Meals;

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        borderRadius: 16,
        marginRight: 12,
        paddingBottom: 8,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor:'rgba(186, 233, 255, 0.1)'
    },
    title: {
        fontSize: 18,
        color: '#1B1B13',
        fontFamily: 'ComicNeue-Bold',
    },
    img: {
        width: 70,
        height: 70
    }
})