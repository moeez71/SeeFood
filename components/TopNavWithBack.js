import React from 'react';
import { Layout, Text, TopNavigation} from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';


function TopNavWithBack(props) {
    return (
        <Layout style={{minHeight:60}}>
        <TopNavigation
            title={()=><Text style={{fontFamily: "Nexa Bold", fontSize: 32}}>{props.screenTitle}</Text>}
            accessoryLeft={()=><Ionicons 
                name='arrow-back' 
                size={25}
                onPress={() => props.navigation.goBack()}
                />}
              alignment="center"
          />
          </Layout>
    )
}

export default TopNavWithBack;


