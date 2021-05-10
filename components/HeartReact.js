import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon  from 'react-native-vector-icons/Ionicons';


function HeartReact(props) {

    const[heartFilled, setHeartFilled] = useState(false);

    return (
        <TouchableOpacity
        onPress={() => setHeartFilled(!heartFilled)}
        style={{height: 40, width: 40, marginTop: 5}}
        >
            {heartFilled? <Icon name="heart" size={36} color="red"/> 
            : <Icon name="heart-outline" size={36} color="black"/>}
        </TouchableOpacity>
    );
}

export default HeartReact;
