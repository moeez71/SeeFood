import React, {useContext, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Modal } from '@ui-kitten/components';
import {AuthContext} from '../navigation/AuthProvider';
import Theme from '../constants/Theme';


export default function LogoutModal(props) {
    const [visible, setVisible] = React.useState(true);
    
    const {user, logout} = useContext(AuthContext);

    const onCancel = () => {
        setVisible(false);
    }
    return (
        
      <Modal
        style={styles.container}
        visible={props.makeVisible}
        onBackdropPress={props.onCancel}>
        <Card disabled={true} style={styles.cardStyle}
        header={()=><Text style={styles.headerText}>Are you sure?</Text>}>
          <View style={{flexDirection: "row", alignItems: 'center'}}>
          <Button 
          style={{...styles.buttonStyle, backgroundColor: "white"}} 
          onPress={props.onCancel} 
          appearance="outline"
          size="large"
          >
           <Text style={{color: Theme.COLORS.PRIMARY, fontFamily: "Nexa Regular",}}>Cancel</Text> 
          </Button>
          <Button 
          style={{...styles.buttonStyle, backgroundColor: Theme.COLORS.PRIMARY}} 
          onPress={() => logout()}
          size="large"
          >
            <Text style={{color: "white", fontFamily: "Nexa Regular"}}>Logout</Text>
          </Button>
          </View>
          
        </Card>
      </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '60%',
        justifyContent: 'center',
    },

    cardStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    backdrop: {
      backgroundColor: 'red',
    },
    buttonStyle: {
        margin: 2,
        borderRadius: 50,
        borderColor: Theme.COLORS.PRIMARY,
    },
    headerText: {
        fontFamily: "Nexa Regular",
        fontSize: 18,
        color: Theme.COLORS.PRIMARY
    }
  });

