import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon  from 'react-native-vector-icons/Ionicons';


function CloseButton(props) {

    return (
        <TouchableOpacity
        onPress={props.onPressHandle}
        style={{height: 40, width: 40, marginTop: 5}}
        >
            <Icon name="close-circle-outline" size={40} color="white"/>
        </TouchableOpacity>
    );
}

export default CloseButton;
