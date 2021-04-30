import React from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input } from '@ui-kitten/components';


const FormInput = ({labelValue, placeholderText, iconType,isFieldEmpty, isFieldValid, ...rest}) => {
  
  const handleStatus = () => {
    if (isFieldEmpty) {
      return "basic";
    }
    else if (isFieldValid) {
      return "success";
    }
    else {
      return "danger";
    }
  }
   
  return (
      <Input
        style={styles.inputContainer}
        value={labelValue}
        numberOfLines={1}
        size="large"
        placeholder={placeholderText}
        textStyle={styles.inputText}
        status={handleStatus()}
        accessoryLeft={() => <AntDesign name={iconType} color="#567" size={25}/>}
        {...rest}
      />
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: windowHeight / 15,
    flexDirection: 'row',
    borderRadius: 50,
    margin: 5,
  },  
  inputText : {
    fontFamily: 'Nexa Regular'
  }
});
