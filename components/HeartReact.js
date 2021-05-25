import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon  from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../navigation/AuthProvider';


function HeartReact(props) {
    const{userData} = useContext(AuthContext);

    const[heartFilled, setHeartFilled] = useState(false);

    useEffect(() => {
        if (props.savedRecipes.includes(props.id))
            setHeartFilled(true);
    }, []);

    const handlePress = async() => {

        let bodyData = {
            uid: userData.uid,
            recipeId: props.id
        };

        if (!heartFilled) {
            axios.put(`http://192.168.0.103:5010/recipe/add`, bodyData, {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
            })
            .then(res => console.log(res.data))
            .catch(e => console.error(e.message));
        }
        else {
            axios.put(`http://192.168.0.103:5010/recipe/remove`, bodyData, {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
            })
            .then(res => console.log(res.data))
            .catch(e => console.error(e.message));
        }

        await setHeartFilled(!heartFilled);
    }

    return (
        <TouchableOpacity
        onPress={() => handlePress()}
        style={{height: 40, width: 40, marginTop: 5}}
        >
            {heartFilled? <Icon name="heart" size={36} color="red"/> 
            : <Icon name="heart-outline" size={36} color="black"/>}
        </TouchableOpacity>
    );
}

export default HeartReact;
