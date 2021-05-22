import React, {useContext, useState} from 'react';
import { TouchableOpacity, Platform, StyleSheet, LogBox, Dimensions, ImageBackground, View} from 'react-native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import {AuthContext} from '../../navigation/AuthProvider';
import { Layout, Text, Spinner } from '@ui-kitten/components';
import Theme from '../../constants/Theme';

// LogBox.ignoreAllLogs()

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
      <ImageBackground source={require('../../assets/images/bg.png')} style={styles.bgImage}>
      <Text style={styles.titleText}>Register</Text>

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
      <View style={styles.textPrivate}>
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
      </View>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
      </ImageBackground>
    </Layout>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Nexa Bold',
    fontSize: 70,
    color: Theme.COLORS.PRIMARY,
    margin: 10
  },
  bgImage: {
    // flex: 1,
    padding: 20,
    resizeMode: "cover",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: 'Nexa Bold',
    fontSize: 36,
    marginBottom: 10,
    color: Theme.COLORS.PRIMARY,
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Nexa Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
    // backgroundColor: 
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Nexa Regular',
    color: 'grey',
  },
});
