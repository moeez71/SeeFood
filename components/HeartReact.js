import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon  from 'react-native-vector-icons/Ionicons';


function HeartReact(props) {

    const[heartFilled, setHeartFilled] = useState(false);

    return (
        <TouchableOpacity
        onPress={() => setHeartFilled(!heartFilled)}
        style={{height: 50, width: 50}}
        >
            {heartFilled? <Icon name="heart" size={40} color="red"/> 
            : <Icon name="heart-outline" size={40} color="black"/>}
        </TouchableOpacity>
    );
}

export default HeartReact;
