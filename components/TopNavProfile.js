import React from 'react';
import { Layout, Text, TopNavigation} from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function TopNavProfile(props) {
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
            accessoryRight={()=> 
            <MaterialCommunityIcons
                name="account-edit"
                size={25}
                onPress={() => props.navigation.navigate('EditProfile')}
              />}
          />
          
        </Layout>
    )
}

export default TopNavProfile;


