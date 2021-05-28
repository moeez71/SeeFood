import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';

const PopUp = (props) => {

  
  return (
    <View style={styles.container}>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={props.makeVisible}>
        <Card disabled={true}>
          <Text>Welcome to UI Kitten 😻</Text>
          <Button onPress={props.changeVisibility}>
            DISMISS
          </Button>
        </Card>
      </Modal>

    </View>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});