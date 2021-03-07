import React, {useContext, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Card, Modal } from '@ui-kitten/components';
import {AuthContext} from '../navigation/AuthProvider';


export default function LogoutScreen({navigation}) {
    const [visible, setVisible] = React.useState(true);
    const alwaysTrue = true;

    const {user, logout} = useContext(AuthContext);

    useEffect(()=>{
        //first render
        setVisible(true);
    }, []);

    const onCancel = () => {
        setVisible(false);
        navigation.navigate('HomeScreen');
    }
    return (
        <View style={styles.container}>
        <Button onPress={() => setVisible(true)}>
        Logout
      </Button>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <Text>Are you sure?</Text>
          <View style={{flexDirection: "row"}}>
          <Button style={styles.buttonStyle} onPress={() => onCancel()} appearance="outline">
            Cancel
          </Button>
          <Button style={styles.buttonStyle} onPress={() => logout()}>
            Logout
          </Button>
          </View>
          
        </Card>
      </Modal>

    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      minHeight: 192,
      justifyContent: "center",
    //   alignItems: 'center's
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    buttonStyle: {
        margin: 2
    }
  });

