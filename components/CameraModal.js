import React, {useContext, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Modal } from '@ui-kitten/components';
import Theme from '../constants/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function CameraModal(props) {
    
    return (
        
      <Modal
        style={styles.container}
        visible={props.makeVisible}
        onBackdropPress={props.onCancel}
        backdropStyle={styles.backdrop}
        >
        <Card disabled={true} style={styles.cardStyle}
        header={()=><Text style={styles.headerText}>Select one:</Text>}>
          <View style={{flexDirection: "row",}}>
          <TouchableOpacity
              style={styles.categoryBtn}
              onPress={props.openCamera}
              >
              <View style={styles.categoryIcon}>
              <AntDesign name='camerao' color="black" size={34}/>
              </View>
              <Text style={styles.categoryBtnTxt}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={props.openCameraRoll}
              >
              <View style={styles.categoryIcon}>
              <AntDesign name='picture' color="black" size={34}/>
              </View>
              <Text style={styles.categoryBtnTxt}>Gallery</Text>
            </TouchableOpacity>
          </View>
          
        </Card>
      </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    cardStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: "#ffd6cc"
    },
    backdrop: {
      opacity: 0.5
    },
    buttonStyle: {
        margin: 2,
        borderRadius: 50,
        borderColor: Theme.COLORS.PRIMARY,
    },
    headerText: {
        marginTop: 10,
        fontFamily: "Nexa Bold",
        fontSize: 18,
        // color: Theme.COLORS.PRIMARY
    },
    categoryBtn: {
        marginHorizontal: 30,
        alignSelf: 'center',
      },
      categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 50,
        height: 50,
      },
      categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 2,
        fontFamily: "Nexa Bold",
      },
  });

