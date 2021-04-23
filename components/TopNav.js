import React from 'react';
import { Text, TopNavigation} from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';


function TopNav(props) {
    return (
        <TopNavigation
            title={()=><Text style={{fontFamily: "Nexa Bold", fontSize: 34}}>{props.screenTitle}</Text>}
            accessoryLeft={()=><Ionicons 
                name='md-menu' 
                size={25}
                onPress={() => props.navigation.toggleDrawer()}
                />}
              alignment="center"
          />
    )
}

export default TopNav


