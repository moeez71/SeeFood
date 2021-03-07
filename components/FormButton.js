import React from 'react';
import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import { Button, Text} from '@ui-kitten/components';

const FormButton = ({buttonTitle, isDisabled, ...rest}) => {
  return (
    <Button 
    style={styles.buttonContainer} {...rest}
    disabled={isDisabled}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </Button>
    // <TouchableOpacity style={styles.buttonContainer} {...rest}>
      // <Text style={styles.buttonText}>{buttonTitle}</Text>
    // </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    // backgroundColor: '#2e64e5',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Lato-Regular',
  },
});
