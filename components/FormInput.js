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
        value={labelValue}
        numberOfLines={1}
        size="large"
        placeholder={placeholderText}
        // status={!isFieldEmpty? "basic" : "danger"}
        // status={isFieldValid? "success" : "danger"}
        status={handleStatus()}
        accessoryLeft={() => <AntDesign name={iconType} color="#567" size={25}/>}
        {...rest}
      />
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
