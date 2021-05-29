import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, RefreshControl } from 'react-native';
import BurgerLoader from '../../components/loaders/BurgerLoader';
import TopNav from '../../components/TopNav';
import { Layout, ListItem, Divider, List } from '@ui-kitten/components';
import { AuthContext } from '../../navigation/AuthProvider';
import axios from 'axios';

function SearchHistory({navigation}) {
    const[loading, setLoading] = React.useState(false);
    const{userData} = React.useContext(AuthContext);
    const[searches, setSearches] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      axios.get(`http://192.168.0.102:5010/search/find/${userData.uid}`)
      .then(async res => {
              console.log(res.data.searches);
              setSearches(res.data.searches);
              setRefreshing(false);
          })
          
      .catch(e => console.error(e.message));
      setRefreshing(false);
      }, [refreshing]);
    

    const getSavedRecipesFromDb = async() => {
        setLoading(true);
        axios.get(`http://192.168.0.102:5010/search/find/${userData.uid}`)
        .then(async res => {
                console.log(res.data.searches);
                setSearches(res.data.searches);
                setLoading(false);
            })
            
        .catch(e => console.error(e.message));
        setLoading(false);
      }

      useEffect(() => {
        getSavedRecipesFromDb();
      }, []);

      const renderItem = ({ item, index }) => (
        <ListItem
            style={{backgroundColor: "#feece6", borderRadius: 50, margin: 2}}
            title={`${index + 1} - ${item.searchQuery}`}
    />
      );


    if (loading)
        return (<BurgerLoader />)
    return (
        <SafeAreaView style={{flex: 1}}>
            <TopNav navigation={navigation} screenTitle="History"/>
            <Layout style={styles.container}>
                <List
                style={styles.tab}
                data={searches}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
                refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                />
        </Layout>
        </SafeAreaView>
    )
}

export default SearchHistory;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   alignItems: 'center',

    },
    tab: {
        height: 192,
        backgroundColor: "white",
        marginRight: 10
      },
});