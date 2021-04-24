import React from 'react';
import { Layout, Text, TopNavigation} from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';


function TopNav(props) {
    return (
        <Layout style={{minHeight:60}}>
        <TopNavigation
            title={()=><Text style={{fontFamily: "Nexa Bold", fontSize: 32}}>{props.screenTitle}</Text>}
            accessoryLeft={()=><Ionicons 
                name='md-menu' 
                size={25}
                onPress={() => props.navigation.toggleDrawer()}
                />}
              alignment="center"
          />
        </Layout>
    )
}

export default TopNav


