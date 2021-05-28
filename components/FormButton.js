import React from 'react';
import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import { Button, Text} from '@ui-kitten/components';

const FormButton = ({buttonTitle, isDisabled, ...rest}) => {
  return (
    <Button 
    style={styles.buttonContainer} {...rest}
    disabled={isDisabled}
    >
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </Button>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    // paddingTop: 10,
    width: '100%',
    height: windowHeight / 15,
    // backgroundColor: '#c53707',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Nexa Bold',
  },
});
