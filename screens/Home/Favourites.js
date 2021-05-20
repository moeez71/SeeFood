import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import BurgerLoader from '../../components/loaders/BurgerLoader';
import TopNav from '../../components/TopNav';


function Favourites({navigation}) {
    const[loading, setLoading] = React.useState(false);

    if (loading)
        return (<BurgerLoader />)
    return (
        <SafeAreaView style={{flex: 1}}>
            <TopNav navigation={navigation} screenTitle="Favourites"/>
            <Layout style={styles.container}>
            <Text>hollla</Text>
        </Layout>
        </SafeAreaView>
    )
}

export default Favourites;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
});
