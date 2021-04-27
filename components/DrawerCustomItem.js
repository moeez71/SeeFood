import React from 'react';
import {DrawerItem} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Text } from 'react-native';
import Theme from '../constants/Theme';

function DrawerCustomItem({
    title,
    navigation,
    focused,
    iconName,
    nextScreen,
    ...rest
  }) {
    return (
        <View style={{...styles.container, backgroundColor: focused? "#feece6": Theme.COLORS.PRIMARY}}>
        <DrawerItem 
         style={{}}
         icon={() => (
                 <FontAwesome 
                 name={iconName} 
                 color={focused? Theme.COLORS.PRIMARY: "white"}
                 size={18}
                 />
             )}
             label={()=><Text style={{...styles.text, color: focused? Theme.COLORS.PRIMARY :"white"}}>{title}</Text>}
             onPress={() => {navigation.navigate(`${nextScreen}`)}}
         />
         </View>
    );
}

export default DrawerCustomItem;

const styles = StyleSheet.create({
    container: {
        height: 60,
        justifyContent: "center",
        borderRadius: 50,
        overflow: "hidden",
        padding: 10,
        marginBottom: 5,
    },
    text: {
        fontFamily: "Nexa Bold",
        fontSize: 16
    }
})