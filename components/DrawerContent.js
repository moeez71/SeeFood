import React, {useContext} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView
} from '@react-navigation/drawer';
import DrawerCustomItem from './DrawerCustomItem';
import { AuthContext } from '../navigation/AuthProvider';

export default function DrawerContent({
    drawerPosition,
    navigation,
    profile,
    focused,
    state,
    ...rest
  }) {

    // const paperTheme = useTheme();
const screens = [
    {
    title:"Home",
    iconName:"home",
    nextScreen:"Home"
    },
    {
    title:"Profile",
    iconName:"user-circle-o",
    nextScreen:"Profile"
    },
];

const {userData} = useContext(AuthContext);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: userData.photoURL
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{userData.firstName} {userData.lastName}</Title>
                                {/* <Caption style={styles.caption}>{userData.firstName} {userData.lastName}</Caption> */}
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                    {screens.map((item, index) => 

                        <DrawerCustomItem 
                            key={index}
                            title={item.title}
                            navigation={navigation}
                            focused={state.index === index? true: false}
                            iconName={item.iconName}
                            nextScreen={item.nextScreen}
                        />
                    )}
                    </Drawer.Section>
                    <Drawer.Section title={()=><Text style={styles.caption}>Preferences</Text>}>
                        <TouchableRipple 
                        // onPress={() => {toggleTheme()}}
                        >
                            <View style={styles.preference}>
                                <Text style={styles.caption}>Dark Theme</Text>
                                {/* <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View> */}
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerCustomItem 
                            title="logout"
                            navigation={navigation}
                            focused={false}
                            iconName="sign-out"
                            nextScreen="LogoutScreen"
                        />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 18,
      fontFamily: "Nexa Bold",
      marginTop: 3,
      color: "white",
    },
    caption: {
      color: "white",
      fontSize: 16,
      lineHeight: 16,
      fontFamily: "Nexa Bold",
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      marginRight: 3,
      fontFamily: "Nexa Bold",
      color: "white",
      fontSize: 16
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontFamily: "Nexa Bold",
      color: "white",
      fontSize: 16
    },
  });