import React, {useContext} from 'react';
import { Layout, Text, TopNavigation} from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Theme from '../constants/Theme';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { Avatar } from 'react-native-paper';

const ProfileIcon = (props) =>{
  const {userData} = useContext(AuthContext);

  return (
  <TouchableOpacity
        style={styles.categoryBtn}
        onPress={() => props.navigation.navigate('Profile')}>
        <View style={styles.categoryIcon}>
        <Avatar.Image 
            source={{
              uri: userData.photoURL,
            }}
            size={40}
          />
        </View>
      </TouchableOpacity>
  );
}
function TopNavHome(props) {

    

    return (
        <Layout style={{minHeight:60}}>
        <TopNavigation
            title={()=><Text style={{fontFamily: "Nexa Bold", fontSize: 32}}>{props.screenTitle}</Text>}
            accessoryLeft={()=><Ionicons 
                name='md-menu' 
                size={25}
                onPress={() => props.navigation.toggleDrawer()}
                />}
            accessoryRight={() => <ProfileIcon navigation={props.navigation}/>}
            alignment="center"
          />
        </Layout>
    )
}

export default TopNavHome;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'center',
      // padding: 10,
    },categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        marginRight: 30,
        alignSelf: 'center',
      },
      categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        width: 40,
        height: 40,
        // marginRight: 20,
        // backgroundColor: Theme.COLORS.GRADIENT_START /* 'white' */,
        borderRadius: 50,
      },
    });


