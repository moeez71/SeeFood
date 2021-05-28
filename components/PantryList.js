import { Avatar, List, ListItem, Divider, Layout } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

const data = new Array(5).fill({
    title: 'Item',
  });

function PantryList(props) {

    const handlePress = (item) => {
        props.setValue(item.name)
    }

    const renderItem = ({item}) => (
        <ListItem
        title={`${item.name}`}
        accessoryLeft={() => <Avatar source={require('../assets/images/avatar.png')} size="tiny"/>}
        />
    );

    return (
        <Layout style={styles.container}>
            <List
            data={props.data}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
            />
        </Layout>
    )
}

export default PantryList;

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      width: '80%',
      marginLeft: 30,
      marginRight: 80
    },
});