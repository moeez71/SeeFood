import React, {useContext, useState} from 'react';
import { TouchableOpacity, Platform, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import { Layout, Text, Spinner } from '@ui-kitten/components';


const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const[isValid, setIsValid] = React.useState({
    isValidEmail: true,
    isValidPassword: true,
    isValidConfrimPassword: true,
    isEmailFieldEmpty: true,
    isPasswordFieldEmpty: true,
    isConfirmPasswordFieldEmpty: true,
  });
  const {register} = useContext(AuthContext);
  const[isLoading, setIsLoading] = useState(false);


  const handleEmailChange = (val) => {

    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    setEmail(val);
    if(val.trim().length < 1)
      setIsValid({
        ...isValid,
        isValidEmail: true,
        isEmailFieldEmpty: true,
      });
    else 
      setIsValid({
        ...isValid,
        isValidEmail: re.test(val),
        isEmailFieldEmpty: false,
      });


  }

  const handlePasswordChange = (val) => {
    if (val.trim().length < 1) {
      setIsValid({
        ...isValid,
        isPasswordFieldEmpty: true,
      })
    }
    else if (val.trim().length >= 8) {
      setIsValid({
        ...isValid,
        isValidPassword: true,
        isPasswordFieldEmpty: false,
      })
    }
    else {
      setIsValid({
        ...isValid,
        isValidPassword: false,
        isPasswordFieldEmpty: false,
      })
    }
    setPassword(val);
  }

  const handleConfirmPasswordChange = (val) => {
    if (val.trim().length < 1) {
      setIsValid({
        ...isValid,
        isConfirmPasswordFieldEmpty: true,
      })
    }
    else if (val.trim().length >= 8) {
      setIsValid({
        ...isValid,
        isValidConfirmPassword: true,
        isConfirmPasswordFieldEmpty: false,
      })
    }
    else {
      setIsValid({
        ...isValid,
        isValidConfirmPassword: false,
        isConfirmPasswordFieldEmpty: false,
      })
    }
    setConfirmPassword(val);
    if(password !== confirmPassword) {
      setIsValid({
        ...isValid,
        isValidConfirmPassword: false,
        isConfirmPasswordFieldEmpty: false,
      })
    }
  }

  const handleSignup = async() => {
    await setIsLoading(true);
    await register(email, password);
    await setIsLoading(false)
  }
  
  return (
    <Layout style={styles.container}>
      <Text style={styles.text}>Create an account</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => handleEmailChange(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        isFieldEmpty={isValid.isEmailFieldEmpty}
        isFieldValid={isValid.isValidEmail}
        onEndEditing={e => handleEmailChange(e.nativeEvent.text)}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => handlePasswordChange(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
        isFieldEmpty={isValid.isPasswordFieldEmpty}
        isFieldValid={isValid.isValidPassword}
        onEndEditing={e => handlePasswordChange(e.nativeEvent.text)}
      />

      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => handleConfirmPasswordChange(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
        isFieldEmpty={isValid.isConfirmPasswordFieldEmpty}
        isFieldValid={isValid.isValidConfirmPassword}
        onEndEditing={e => handleConfirmPasswordChange(e.nativeEvent.text)}
      />

      <FormButton
        buttonTitle="Sign Up"
        isDisabled={isValid.isEmailFieldEmpty || isValid.isPasswordFieldEmpty 
        || !isValid.isValidEmail || !isValid.isValidPassword 
        || isValid.isConfirmPasswordFieldEmpty || !isValid.isValidConfrimPassword}
        onPress={() => handleSignup()}
      />
        {isLoading? <Layout level="2" style={{flexDirection: "row", paddingHorizontal: 10}}><Spinner/>
        <Text category="p1" status="primary"> creating account</Text>
        </Layout> : null }
      <Layout style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Privacy Policy
        </Text>
      </Layout>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </Layout>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});
